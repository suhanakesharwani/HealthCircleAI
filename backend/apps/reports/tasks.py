from apps.reports.models import MedicalReport
from celery import shared_task
# @shared_task
# def hello():
#     print("hey, celery is working")

#     return ("done")
from celery import shared_task

from .models import (
    MedicalReport,
    OCRResult,
)

from .ocr import OCRService

from .storage import download_report


@shared_task
def process_report_ocr(report_id):

    print("task started")

    report = MedicalReport.objects.get(id=report_id)

    print(report.file_path)

    report.ocr_status = MedicalReport.Status.PROCESSING
    report.save(update_fields=["ocr_status"])


    try:

        file_bytes = download_report(
            report.file_path
        )
        print(len(file_bytes))

        ocr = OCRService()

        text = ocr.extract_text(
            file_bytes=file_bytes,
            file_type=report.file_type,
        )

        OCRResult.objects.update_or_create(

            report=report,

            defaults={
                "extracted_text": text,
                "engine": "EasyOCR",
            }

        )

        report.ocr_status = MedicalReport.Status.DONE
        report.save(update_fields=["ocr_status"])

        # Next task
        # generate_ai_summary.delay(str(report.id))

    except Exception:

        report.ocr_status = MedicalReport.Status.FAILED
        report.save(update_fields=["ocr_status"])

        raise