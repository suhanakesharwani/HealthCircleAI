from django.db import models
import uuid
from apps.accounts.models import User
from apps.members.models import FamilyMember
# Create your models here.
class HabitLog(models.Model):

    class HabitType(models.TextChoices):

        WALKING="WALKING"
        WATER="WATER_INTAKE"
        EXERCISE="EXERCISE"
        SLEEP="SLEEP"


    id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )


    family_member=models.ForeignKey(
        FamilyMember,
        on_delete=models.CASCADE
    )


    habit_type=models.CharField(
        max_length=30,
        choices=HabitType.choices
    )


    log_date=models.DateField()


    value=models.DecimalField(
        max_digits=8,
        decimal_places=2
    )


    unit=models.CharField(
        max_length=50
    )


    notes=models.CharField(
        max_length=255,
        null=True,
        blank=True
    )


    logged_by=models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )


    created_at=models.DateTimeField(
        auto_now_add=True
    )


    class Meta:
        unique_together=(
            "family_member",
            "habit_type",
            "log_date"
        )