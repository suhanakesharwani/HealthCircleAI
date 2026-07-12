from django.shortcuts import get_object_or_404

from apps.reports.tasks import process_report_ocr
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from apps.members.models import FamilyMember
from .storage import upload_report
from .models import MedicalReport, AISummary
from .serializers import (
    MedicalReportSerializer,
    MedicalReportDetailSerializer,
    AISummarySerializer,
    ReportUploadSerializer
)
from .storage import (
    upload_report,
    get_signed_url,
    delete_report,
)

from .permissions import (
    can_access_member,
    can_upload_report,
)


class ReportListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, member_id):

        member = get_object_or_404(
            FamilyMember,
            pk=member_id,
        )

        if not can_access_member(request.user, member):

            return Response(
                {"detail": "Permission denied"},
                status=403,
            )

        reports = MedicalReport.objects.filter(
            family_member=member
        ).order_by("-uploaded_at")

        serializer = MedicalReportSerializer(
            reports,
            many=True,
        )

        return Response(serializer.data)

    def post(self, request, member_id):

        
        
        # print(file_path)

        member = get_object_or_404(
            FamilyMember,
            pk=member_id,
        )

        if not can_upload_report(
            request.user,
            member,
        ):

            return Response(
                {
                    "detail": "You cannot upload reports for this member."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        upload_serializer = ReportUploadSerializer(
            data=request.data
        )

        upload_serializer.is_valid(
            raise_exception=True
        )

        uploaded_file = upload_serializer.validated_data["file"]

        report_date = upload_serializer.validated_data.get(
            "report_date"
        )

        # return Response(
        #     {
        #         "message": "Upload received successfully.",
        #         "filename": uploaded_file.name,
        #         "size": uploaded_file.size,
        #         "content_type": uploaded_file.content_type,
        #         "report_date": report_date,
        #     }
        # )
        file_path = upload_report(uploaded_file)

        extension = uploaded_file.name.split(".")[-1].lower()

        if extension == "pdf":
            file_type = MedicalReport.FileType.PDF
        else:
            file_type = MedicalReport.FileType.IMAGE

        report = MedicalReport.objects.create(

            family_member=member,

            uploaded_by=request.user,

            file_path=file_path,

            file_type=file_type,

            original_filename=uploaded_file.name,

            report_date=report_date,

        )
        process_report_ocr(str(report.id))
        serializer = MedicalReportSerializer(report)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )
class ReportDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):

        report = get_object_or_404(
            MedicalReport,
            pk=pk,
        )

        if not can_access_member(
            request.user,
            report.family_member,
        ):

            return Response(
                {"detail": "Permission denied"},
                status=403,
            )

        serializer = MedicalReportDetailSerializer(
            report
        )

        return Response(serializer.data)

    def delete(self, request, pk):

        report = get_object_or_404(
            MedicalReport,
            pk=pk,
        )

        if not can_upload_report(
            request.user,
            report.family_member,
        ):

            return Response(
                {"detail": "Permission denied"},
                status=403,
            )

        # delete file from Supabase
        delete_report(
            report.file_path
        )

        # delete database record
        report.delete()

        return Response(status=204)


class ReportSummaryView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, report_id):

        report = get_object_or_404(
            MedicalReport,
            pk=report_id,
        )

        if not can_access_member(
            request.user,
            report.family_member,
        ):

            return Response(
                {"detail": "Permission denied"},
                status=403,
            )

        summary = get_object_or_404(
            AISummary,
            report=report,
        )

        serializer = AISummarySerializer(
            summary
        )

        return Response(serializer.data)

class ReportPreviewView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, report_id):

        report = get_object_or_404(
            MedicalReport,
            pk=report_id,
        )

        if not can_access_member(
            request.user,
            report.family_member,
        ):

            return Response(
                {
                    "detail": "Permission denied"
                },
                status=403,
            )

        signed_url = get_signed_url(
            report.file_path
        )

        return Response({
            "url": signed_url,
        })