from django.db import models
import uuid
from apps.families.models import Family
# Create your models here.
class DailyDigest(models.Model):

    id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )


    family=models.ForeignKey(
        Family,
        on_delete=models.CASCADE
    )


    digest_date=models.DateField()


    content=models.JSONField()


    generated_at=models.DateTimeField(
        auto_now_add=True
    )


    class Meta:
        unique_together=(
            "family",
            "digest_date"
        )