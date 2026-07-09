from django.db import models
from apps.members.models import FamilyMember
import uuid
from apps.accounts.models import User
# Create your models here.
class MedicalReport(models.Model):

    class FileType(models.TextChoices):
        PDF="PDF"
        IMAGE="IMAGE"


    class Status(models.TextChoices):
        PENDING="PENDING"
        PROCESSING="PROCESSING"
        DONE="DONE"
        FAILED="FAILED"


    id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )


    family_member=models.ForeignKey(
        FamilyMember,
        on_delete=models.CASCADE
    )


    uploaded_by=models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )


    file_url=models.URLField()


    file_type=models.CharField(
        max_length=10,
        choices=FileType.choices
    )


    original_filename=models.CharField(
        max_length=255
    )


    report_date=models.DateField(
        null=True,
        blank=True
    )


    ocr_text=models.TextField(
        null=True,
        blank=True
    )


    ocr_status=models.CharField(
        max_length=20,
        choices=Status.choices,
        default="PENDING"
    )


    ai_status=models.CharField(
        max_length=20,
        choices=Status.choices,
        default="PENDING"
    )


    uploaded_at=models.DateTimeField(
        auto_now_add=True
    )


class AISummary(models.Model):

    report=models.OneToOneField(
        MedicalReport,
        on_delete=models.CASCADE
    )


    summary_text=models.TextField()


    key_findings=models.JSONField(
        default=list
    )


    abnormal_values=models.JSONField(
        default=list
    )


    model_version=models.CharField(
        max_length=100
    )


    generated_at=models.DateTimeField(
        auto_now_add=True
    )