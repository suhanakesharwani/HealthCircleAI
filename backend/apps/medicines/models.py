from django.db import models
from apps.accounts.models import User
import uuid
from apps.members.models import FamilyMember
class Medicine(models.Model):

    class Frequency(models.TextChoices):
        ONCE = "ONCE_DAILY"
        TWICE = "TWICE_DAILY"
        THRICE = "THRICE_DAILY"
        WEEKLY = "WEEKLY"
        AS_NEEDED = "AS_NEEDED"


    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )


    family_member = models.ForeignKey(
        FamilyMember,
        on_delete=models.CASCADE,
        related_name="medicines"
    )


    name = models.CharField(
        max_length=100
    )


    dosage = models.CharField(
        max_length=100
    )


    frequency = models.CharField(
        max_length=30,
        choices=Frequency.choices
    )


    times = models.JSONField(
        default=list
    )


    start_date = models.DateField()


    end_date = models.DateField(
        null=True,
        blank=True
    )


    instructions = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )


    is_active = models.BooleanField(
        default=True
    )


    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )
# Create your models here.
class MedicineLog(models.Model):

    class Status(models.TextChoices):
        PENDING="PENDING"
        TAKEN="TAKEN"
        MISSED="MISSED"


    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )


    medicine = models.ForeignKey(
        Medicine,
        on_delete=models.CASCADE
    )


    scheduled_date = models.DateField()


    scheduled_time = models.TimeField()


    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default="PENDING"
    )


    marked_at = models.DateTimeField(
        null=True,
        blank=True
    )


    marked_by = models.ForeignKey(
        User,
        null=True,
        blank=True,
        on_delete=models.SET_NULL
    )


    class Meta:
        unique_together = (
            "medicine",
            "scheduled_date",
            "scheduled_time"
        )