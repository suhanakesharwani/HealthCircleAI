from django.db import models

# Create your models here.
import uuid
from django.db import models
from apps.accounts.models import User


class Family(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    name = models.CharField(
        max_length=100
    )

    invite_code = models.CharField(
        max_length=8,
        unique=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="families_created"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )


    def __str__(self):
        return self.name




class FamilyMembership(models.Model):

    class Role(models.TextChoices):
        OWNER = "OWNER"
        CAREGIVER = "CAREGIVER"
        MEMBER = "MEMBER"


    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )


    family = models.ForeignKey(
        Family,
        on_delete=models.CASCADE,
        related_name="memberships"
    )


    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )


    role = models.CharField(
        max_length=20,
        choices=Role.choices
    )


    joined_at = models.DateTimeField(
        auto_now_add=True
    )


    class Meta:
        unique_together = (
            "family",
            "user"
        )