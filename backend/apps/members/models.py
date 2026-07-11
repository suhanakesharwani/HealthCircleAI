from django.db import models
from apps.accounts.models import User
from apps.families.models import Family
import uuid
from django.contrib.postgres.fields import ArrayField
# Create your models here.
from django.conf import settings

class FamilyMember(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )


    family = models.ForeignKey(
        Family,
        on_delete=models.CASCADE,
        related_name="family_members"
    )


    name = models.CharField(
        max_length=100
    )


    relation = models.CharField(
        max_length=100
    )


    date_of_birth = models.DateField(
        null=True,
        blank=True
    )


    gender = models.CharField(
        max_length=20,
        null=True,
        blank=True
    )


    medical_conditions = ArrayField(
        models.CharField(max_length=100),
        default=list,
        blank=True
    )


    allergies = ArrayField(
        models.CharField(max_length=100),
        default=list,
        blank=True
    )

    blood_group=models.TextField(
        null=True,
        blank=True
    )

    notes = models.TextField(
        null=True,
        blank=True
    )

    linked_user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="health_profile",
    )


    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )


    created_at = models.DateTimeField(
        auto_now_add=True
    )


    updated_at = models.DateTimeField(
        auto_now=True
    )

