from rest_framework import serializers

from .models import MedicalReport, AISummary

from datetime import date
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

        read_only_fields = fields
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

   

    def validate_report_date(self, value):

        if value and value > date.today():
            raise serializers.ValidationError(
                "Report date cannot be in the future."
            )

        return value

    def validate_file(self, value):

        ALLOWED_TYPES = {
            "application/pdf",
            "image/png",
            "image/jpeg",
        }

        if value.content_type not in self.ALLOWED_TYPES:
            raise serializers.ValidationError(
                "Only PDF, PNG and JPEG allowed."
            )

        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError(
                "Maximum file size is 10 MB."
            )
        
        if value.size == 0:
            raise serializers.ValidationError("Empty file.")

        return value