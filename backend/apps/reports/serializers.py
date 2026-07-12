from rest_framework import serializers

from .models import MedicalReport, AISummary


class MedicalReportSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicalReport

        fields = (
            "id",
            "family_member",
            "uploaded_by",
            "file_path",
            "file_type",
            "original_filename",
            "report_date",
            "ocr_status",
            "ai_status",
            "uploaded_at",
        )

        read_only_fields = (
            "id",
            "uploaded_by",
            "ocr_status",
            "ai_status",
            "uploaded_at",
        )


class MedicalReportDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = MedicalReport
        

        fields = "__all__"
        ordering=["-uploaded_at"]


class AISummarySerializer(serializers.ModelSerializer):

    class Meta:
        model = AISummary

        fields = "__all__"

    
class ReportUploadSerializer(serializers.Serializer):

    file = serializers.FileField()

    report_date = serializers.DateField(
        required=False,
        allow_null=True,
    )