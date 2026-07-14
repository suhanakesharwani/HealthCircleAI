from .validators import validate_structured_report
import time
from .validators import (
    validate_structured_report,
    normalize_status,
    parse_number,
)
from .utils import normalize_test_name
from celery import shared_task

from .models import (
    MedicalReport,
    OCRResult,
    AISummary,
    ReportTest,
)
from .ocr import OCRService
from .storage import download_report
from .ai import AIReportService

from .utils import normalize_report_type
@shared_task
def process_report_ocr(report_id):
    print("🔥 NEW TASK CODE RUNNING 🔥")

    task_start = time.perf_counter()

    print("OCR Task started")

    report = MedicalReport.objects.get(id=report_id)

    try:

        report.ocr_status = MedicalReport.Status.PROCESSING
        report.save(update_fields=["ocr_status"])


        # -------------------------
        # Download file
        # -------------------------

        t = time.perf_counter()

        file_bytes = download_report(
            report.file_path
        )

        print(
            f"Download: {time.perf_counter()-t:.2f}s"
        )


        # -------------------------
        # OCR / Text extraction
        # -------------------------

        t = time.perf_counter()

        ocr_service = OCRService()

        text = ocr_service.extract_text(
            file_bytes=file_bytes,
            file_type=report.file_type,
        )

        print(
            f"Text extraction: {time.perf_counter()-t:.2f}s"
        )


        # -------------------------
        # Save OCR Result
        # -------------------------

        OCRResult.objects.update_or_create(
            report=report,
            defaults={
                "extracted_text": text,
                "engine": "EasyOCR",
            }
        )


        report.ocr_status = MedicalReport.Status.DONE
        report.save(update_fields=["ocr_status"])



    except Exception as e:

        print("OCR ERROR:", e)

        report.ocr_status = MedicalReport.Status.FAILED
        report.save(update_fields=["ocr_status"])

        raise



    # =============================
    # AI ANALYSIS
    # =============================
   
    try:

        t = time.perf_counter()

        # report.ai_status = MedicalReport.Status.PROCESSING
        report.ai_status = MedicalReport.Status.PROCESSING
        report.save(update_fields=["ai_status"])

        ai_service = AIReportService()

        analysis = ai_service.analyze_report(text)

        # Normalize AI response
        analysis = validate_structured_report(analysis)

        print("AI RESPONSE:")
        print(analysis)

        print(
            f"AI generation: {time.perf_counter()-t:.2f}s"
        )

        t = time.perf_counter()

        summary, created = AISummary.objects.get_or_create(
            report=report
        )

        summary.summary_text = analysis.get(
            "summary",
            ""
        )

        summary.key_findings = analysis.get(
            "key_findings",
            []
        )

        # -------------------------
        # Normalize abnormal values
        # -------------------------

        abnormal_values = []

        for item in analysis.get("abnormal_values", []):

            if isinstance(item, str):

                abnormal_values.append({
                    "test": item,
                    "value": None,
                    "unit": "",
                    "reference_range": "",
                    "status": "",
                    "reason": ""
                })

            else:

                abnormal_values.append({
                    "test": item.get("test"),
                    "value": item.get("value"),
                    "unit": item.get("unit"),
                    "reference_range": item.get("reference_range"),
                    "status": item.get("status"),
                    "reason": item.get("reason"),
                })

        summary.abnormal_values = abnormal_values

        summary.recommendations = analysis.get(
            "recommendations",
            []
        )
        summary.structured_report = analysis.get(
            "structured_report",
            {}
        )



        structured = summary.structured_report

        report.report_type = normalize_report_type(
            structured.get("report_type")
        )

        summary.model_version = "gemini-3.5-flash"

        summary.save()


        ReportTest.objects.filter(
            report=report
        ).delete()

        tests = summary.structured_report.get(
            "tests",
            []
        )

        for test in tests:

            ReportTest.objects.create(

                report=report,

                name=test.get(
                    "name",
                    ""
                ),

                normalized_name=normalize_test_name(
                    test.get(
                        "name",
                        ""
                    )
                ),

                value=parse_number(
                    test.get("value")
                ),

                unit=test.get(
                    "unit",
                    ""
                ),

                reference_range=test.get(
                    "reference_range",
                ) or "",

                status=normalize_status(
                    test.get(
                        "status",
                        ""
                    )
                )

            )

        report.ai_status = MedicalReport.Status.DONE

        report.save(
            update_fields=[
                "ai_status",
                "report_type",
            ]
        )

        print(
            f"AI DB save: {time.perf_counter()-t:.2f}s"
        )

    except Exception as e:

        print("AI ERROR:", e)

        report.ai_status = MedicalReport.Status.FAILED

        report.save(
            update_fields=["ai_status"]
        )

        raise



    print(
        f"TOTAL TASK TIME: {time.perf_counter()-task_start:.2f}s"
    )