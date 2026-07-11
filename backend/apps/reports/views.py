from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.members.models import FamilyMember

from .models import MedicalReport, AISummary
from .serializers import (
    MedicalReportSerializer,
    MedicalReportDetailSerializer,
    AISummarySerializer,
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
                status=403,
            )

        serializer = MedicalReportSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        serializer.save(
            family_member=member,
            uploaded_by=request.user,
        )

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