# # from .validators import validate_structured_report
# # import time
# # from .validators import (
# #     validate_structured_report,
# #     normalize_status,
# #     parse_number,
# # )
# # from .utils import normalize_test_name
# # from celery import shared_task

# # from .models import (
# #     MedicalReport,
# #     OCRResult,
# #     AISummary,
# #     ReportTest,
# # )
# # from .ocr import OCRService
# # from .storage import download_report
# # from .ai import AIReportService

# # from .utils import normalize_report_type,chunk_text
# # @shared_task
# # def process_report_ocr(report_id):
# #     print("🔥 NEW TASK CODE RUNNING 🔥")

# #     task_start = time.perf_counter()

# #     print("OCR Task started")

# #     report = MedicalReport.objects.get(id=report_id)

# #     try:

# #         report.ocr_status = MedicalReport.Status.PROCESSING
# #         report.save(update_fields=["ocr_status"])


# #         # -------------------------
# #         # Download file
# #         # -------------------------

# #         t = time.perf_counter()

# #         file_bytes = download_report(
# #             report.file_path
# #         )

# #         print(
# #             f"Download: {time.perf_counter()-t:.2f}s"
# #         )


# #         # -------------------------
# #         # OCR / Text extraction
# #         # -------------------------

# #         t = time.perf_counter()

# #         ocr_service = OCRService()

# #         text = ocr_service.extract_text(
# #             file_bytes=file_bytes,
# #             file_type=report.file_type,
# #         )

# #         print(
# #             f"Text extraction: {time.perf_counter()-t:.2f}s"
# #         )


# #         # -------------------------
# #         # Save OCR Result
# #         # -------------------------

# #         OCRResult.objects.update_or_create(
# #             report=report,
# #             defaults={
# #                 "extracted_text": text,
# #                 "engine": "EasyOCR",
# #             }
# #         )


# #         report.ocr_status = MedicalReport.Status.DONE
# #         report.save(update_fields=["ocr_status"])



# #     except Exception as e:

# #         print("OCR ERROR:", e)

# #         report.ocr_status = MedicalReport.Status.FAILED
# #         report.save(update_fields=["ocr_status"])

# #         raise



# #     # =============================
# #     # AI ANALYSIS
# #     # =============================
   
# #     try:

# #         t = time.perf_counter()

# #         # report.ai_status = MedicalReport.Status.PROCESSING
# #         report.ai_status = MedicalReport.Status.PROCESSING
# #         report.save(update_fields=["ai_status"])

# #         ai_service = AIReportService()

# #         text = text.strip()
# #         text = "\n".join(
# #             line.strip() for line in text.splitlines() if line.strip()
# #         )

# #         chunks = chunk_text(
# #             text,
# #             chunk_size=3500,
# #             overlap=200,
# #         )

# #         print(f"Total chunks: {len(chunks)}")

# #         chunk_results = []

# #         for i, chunk in enumerate(chunks, start=1):
# #             print(f"Processing chunk {i}/{len(chunks)}: {len(chunk)} characters")

# #             result = ai_service.analyze_report(chunk)
# #             result = validate_structured_report(result)

# #             chunk_results.append(result)

# #         if len(chunk_results) == 1:
# #             analysis = chunk_results[0]
# #         else:
# #             analysis = ai_service.summarize_chunks(chunk_results)
# #             analysis = validate_structured_report(analysis)

# #         print("AI RESPONSE:")
# #         print(analysis)

# #         print(f"AI generation: {time.perf_counter()-t:.2f}s")

# #         t = time.perf_counter()

# #         summary, created = AISummary.objects.get_or_create(
# #             report=report
# #         )

# #         summary.summary_text = analysis.get(
# #             "summary",
# #             ""
# #         )

# #         summary.key_findings = analysis.get(
# #             "key_findings",
# #             []
# #         )

# #         # -------------------------
# #         # Normalize abnormal values
# #         # -------------------------

# #         abnormal_values = []

# #         for item in analysis.get("abnormal_values", []):

# #             if isinstance(item, str):

# #                 abnormal_values.append({
# #                     "test": item,
# #                     "value": None,
# #                     "unit": "",
# #                     "reference_range": "",
# #                     "status": "",
# #                     "reason": ""
# #                 })

# #             else:

# #                 abnormal_values.append({
# #                     "test": item.get("test"),
# #                     "value": item.get("value"),
# #                     "unit": item.get("unit"),
# #                     "reference_range": item.get("reference_range"),
# #                     "status": item.get("status"),
# #                     "reason": item.get("reason"),
# #                 })

# #         summary.abnormal_values = abnormal_values

# #         summary.recommendations = analysis.get(
# #             "recommendations",
# #             []
# #         )
# #         summary.structured_report = analysis.get(
# #             "structured_report",
# #             {}
# #         )



# #         structured = summary.structured_report

# #         report.report_type = normalize_report_type(
# #             structured.get("report_type")
# #         )

# #         summary.model_version = "llama-3.3-70b-versatile"

# #         summary.save()


# #         ReportTest.objects.filter(
# #             report=report
# #         ).delete()

# #         tests = summary.structured_report.get(
# #             "tests",
# #             []
# #         )

# #         for test in tests:

# #             ReportTest.objects.create(

# #                 report=report,

# #                 name=test.get(
# #                     "name",
# #                     ""
# #                 ),

# #                 normalized_name=normalize_test_name(
# #                     test.get(
# #                         "name",
# #                         ""
# #                     )
# #                 ),

# #                 value=parse_number(
# #                     test.get("value")
# #                 ),

# #                 unit=test.get(
# #                     "unit",
                    
# #                 ) or "",

# #                 reference_range=test.get(
# #                     "reference_range",
# #                 ) or "",

# #                 status=normalize_status(
# #                     test.get(
# #                         "status",
# #                         ""
# #                     )
# #                 )

# #             )

# #         report.ai_status = MedicalReport.Status.DONE

# #         report.save(
# #             update_fields=[
# #                 "ai_status",
# #                 "report_type",
# #             ]
# #         )

# #         print(
# #             f"AI DB save: {time.perf_counter()-t:.2f}s"
# #         )

# #     except Exception as e:

# #         print("AI ERROR:", e)

# #         report.ai_status = MedicalReport.Status.FAILED

# #         report.save(
# #             update_fields=["ai_status"]
# #         )

# #         raise



# #     print(
# #         f"TOTAL TASK TIME: {time.perf_counter()-task_start:.2f}s"
# #     )

# from .validators import validate_structured_report
# import time
# from .validators import (
#     validate_structured_report,
#     normalize_status,
#     parse_number,
# )
# from .utils import normalize_test_name
# from celery import shared_task

# from .models import (
#     MedicalReport,
#     OCRResult,
#     AISummary,
#     ReportTest,
# )
# from .ocr import OCRService
# from .storage import download_report
# from .ai import AIReportService

# from .utils import normalize_report_type, chunk_text


# @shared_task
# def process_report_ocr(report_id):
#     print("🔥 NEW TASK CODE RUNNING 🔥")

#     task_start = time.perf_counter()

#     print("OCR Task started")

#     report = MedicalReport.objects.get(id=report_id)

#     try:
#         report.ocr_status = MedicalReport.Status.PROCESSING
#         report.save(update_fields=["ocr_status"])

#         # -------------------------
#         # Download file
#         # -------------------------

#         t = time.perf_counter()

#         file_bytes = download_report(report.file_path)

#         print(f"Download: {time.perf_counter()-t:.2f}s")

#         # -------------------------
#         # OCR / Text extraction
#         # -------------------------

#         t = time.perf_counter()

#         ocr_service = OCRService()

#         text = ocr_service.extract_text(
#             file_bytes=file_bytes,
#             file_type=report.file_type,
#         )

#         print(f"Text extraction: {time.perf_counter()-t:.2f}s")

#         # -------------------------
#         # Save OCR Result
#         # -------------------------

#         OCRResult.objects.update_or_create(
#             report=report,
#             defaults={
#                 "extracted_text": text,
#                 "engine": "EasyOCR",
#             }
#         )

#         report.ocr_status = MedicalReport.Status.DONE
#         report.save(update_fields=["ocr_status"])

#     except Exception as e:
#         print("OCR ERROR:", e)

#         report.ocr_status = MedicalReport.Status.FAILED
#         report.save(update_fields=["ocr_status"])

#         raise

#     # =============================
#     # AI ANALYSIS
#     # =============================

#     try:
#         t = time.perf_counter()

#         report.ai_status = MedicalReport.Status.PROCESSING
#         report.save(update_fields=["ai_status"])

#         ai_service = AIReportService()

#         text = text.strip()
#         text = "\n".join(
#             line.strip() for line in text.splitlines() if line.strip()
#         )

#         # chunk_size tuned so each request (input + max_completion_tokens)
#         # stays well within the 12K TPM budget for llama-3.3-70b-versatile,
#         # while keeping chunk count low enough that the whole report
#         # finishes within one or two rolling 60s windows.
#         chunks = chunk_text(
#             text,
#             chunk_size=6000,
#             overlap=300,
#         )

#         print(f"Total chunks: {len(chunks)}")

#         chunk_results = []

#         for i, chunk in enumerate(chunks, start=1):
#             print(f"Processing chunk {i}/{len(chunks)}: {len(chunk)} characters")

#             try:
#                 result = ai_service.analyze_report(chunk)
#                 result = validate_structured_report(result)
#                 chunk_results.append(result)
#             except Exception as e:
#                 # Don't let one bad/truncated chunk kill the whole report.
#                 print(f"⚠️ Chunk {i} failed, skipping: {e}")

#         if not chunk_results:
#             raise RuntimeError("All chunks failed AI analysis")

#         if len(chunk_results) == 1:
#             analysis = chunk_results[0]
#         else:
#             analysis = ai_service.summarize_chunks(chunk_results)
#             analysis = validate_structured_report(analysis)

#         print("AI RESPONSE:")
#         print(analysis)

#         print(f"AI generation: {time.perf_counter()-t:.2f}s")

#         t = time.perf_counter()

#         summary, created = AISummary.objects.get_or_create(report=report)

#         summary.summary_text = analysis.get("summary", "")

#         summary.key_findings = analysis.get("key_findings", [])

#         # -------------------------
#         # Normalize abnormal values
#         # -------------------------

#         abnormal_values = []

#         for item in analysis.get("abnormal_values", []):
#             if isinstance(item, str):
#                 abnormal_values.append({
#                     "test": item,
#                     "value": None,
#                     "unit": "",
#                     "reference_range": "",
#                     "status": "",
#                     "reason": ""
#                 })
#             else:
#                 abnormal_values.append({
#                     "test": item.get("test"),
#                     "value": item.get("value"),
#                     "unit": item.get("unit"),
#                     "reference_range": item.get("reference_range"),
#                     "status": item.get("status"),
#                     "reason": item.get("reason"),
#                 })

#         summary.abnormal_values = abnormal_values

#         summary.recommendations = analysis.get("recommendations", [])
#         summary.structured_report = analysis.get("structured_report", {})

#         structured = summary.structured_report

#         report.report_type = normalize_report_type(structured.get("report_type"))

#         summary.model_version = "llama-3.3-70b-versatile"

#         summary.save()

#         ReportTest.objects.filter(report=report).delete()

#         tests = summary.structured_report.get("tests", [])

#         for test in tests:
#             ReportTest.objects.create(
#                 report=report,
#                 name=test.get("name", ""),
#                 normalized_name=normalize_test_name(test.get("name", "")),
#                 value=parse_number(test.get("value")),
#                 unit=test.get("unit") or "",
#                 reference_range=test.get("reference_range") or "",
#                 status=normalize_status(test.get("status", "")),
#             )

#         report.ai_status = MedicalReport.Status.DONE

#         report.save(
#             update_fields=[
#                 "ai_status",
#                 "report_type",
#             ]
#         )

#         print(f"AI DB save: {time.perf_counter()-t:.2f}s")

#     except Exception as e:
#         print("AI ERROR:", e)

#         report.ai_status = MedicalReport.Status.FAILED

#         report.save(update_fields=["ai_status"])

#         raise

#     print(f"TOTAL TASK TIME: {time.perf_counter()-task_start:.2f}s")
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

from .utils import normalize_report_type, chunk_text


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

        file_bytes = download_report(report.file_path)

        print(f"Download: {time.perf_counter()-t:.2f}s")

        # -------------------------
        # OCR / Text extraction
        # -------------------------

        t = time.perf_counter()

        ocr_service = OCRService()

        text = ocr_service.extract_text(
            file_bytes=file_bytes,
            file_type=report.file_type,
        )

        print(f"Text extraction: {time.perf_counter()-t:.2f}s")

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

        report.ai_status = MedicalReport.Status.PROCESSING
        report.save(update_fields=["ai_status"])

        ai_service = AIReportService()

        text = text.strip()
        text = "\n".join(
            line.strip() for line in text.splitlines() if line.strip()
        )

        # chunk_size tuned so each request (input + max_completion_tokens)
        # stays well within the 12K TPM budget for llama-3.3-70b-versatile,
        # while keeping chunk count low enough that the whole report
        # finishes within one or two rolling 60s windows.
        chunks = chunk_text(
            text,
            chunk_size=6000,
            overlap=300,
        )

        print(f"Total chunks: {len(chunks)}")

        chunk_results = []

        for i, chunk in enumerate(chunks, start=1):
            print(f"Processing chunk {i}/{len(chunks)}: {len(chunk)} characters")

            try:
                result = ai_service.analyze_report(chunk)
                result = validate_structured_report(result)
                chunk_results.append(result)
            except Exception as e:
                # Don't let one bad/truncated chunk kill the whole report.
                print(f"⚠️ Chunk {i} failed, skipping: {e}")

        if not chunk_results:
            raise RuntimeError("All chunks failed AI analysis")

        if len(chunk_results) == 1:
            analysis = chunk_results[0]
        else:
            analysis = ai_service.summarize_chunks(chunk_results)
            analysis = validate_structured_report(analysis)

        print("AI RESPONSE:")
        print(analysis)

        print(f"AI generation: {time.perf_counter()-t:.2f}s")

        t = time.perf_counter()

        summary, created = AISummary.objects.get_or_create(report=report)

        summary.summary_text = analysis.get("summary", "")

        summary.key_findings = analysis.get("key_findings", [])

        summary.recommendations = analysis.get("recommendations", [])
        summary.structured_report = analysis.get("structured_report", {})

        structured = summary.structured_report

        report.report_type = normalize_report_type(structured.get("report_type"))

        # -------------------------
        # Derive abnormal_values from the tests list itself, instead of
        # trusting the LLM's separately-generated abnormal_values field.
        # This guarantees test name / value / status are always consistent,
        # since they all come from the same object rather than two parallel
        # arrays the model has to keep in sync across merged chunks.
        # -------------------------
        abnormal_values = []

        for test in structured.get("tests", []):
            status = (test.get("status") or "").strip().upper()

            if status in ("HIGH", "LOW", "BORDERLINE"):
                abnormal_values.append({
                    "test": test.get("name") or "",
                    "value": test.get("value"),
                    "unit": test.get("unit") or "",
                    "reference_range": test.get("reference_range") or "",
                    "status": status,
                    "reason": "",
                })

        summary.abnormal_values = abnormal_values

        summary.model_version = "llama-3.3-70b-versatile"

        summary.save()

        ReportTest.objects.filter(report=report).delete()

        tests = summary.structured_report.get("tests", [])

        for test in tests:
            ReportTest.objects.create(
                report=report,
                name=test.get("name", ""),
                normalized_name=normalize_test_name(test.get("name", "")),
                value=parse_number(test.get("value")),
                unit=test.get("unit") or "",
                reference_range=test.get("reference_range") or "",
                status=normalize_status(test.get("status", "")),
            )

        report.ai_status = MedicalReport.Status.DONE

        report.save(
            update_fields=[
                "ai_status",
                "report_type",
            ]
        )

        print(f"AI DB save: {time.perf_counter()-t:.2f}s")

    except Exception as e:
        print("AI ERROR:", e)

        report.ai_status = MedicalReport.Status.FAILED

        report.save(update_fields=["ai_status"])

        raise

    print(f"TOTAL TASK TIME: {time.perf_counter()-task_start:.2f}s")