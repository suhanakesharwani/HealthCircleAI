from django.urls import path

from .views import (
    ReportListCreateView,
    ReportDetailView,
    ReportSummaryView,
    ReportPreviewView,
)

urlpatterns = [

    path(
        "members/<uuid:member_id>/reports/",
        ReportListCreateView.as_view(),
    ),

    path(
        "reports/<uuid:pk>/",
        ReportDetailView.as_view(),
    ),

    path(
        "reports/<uuid:report_id>/summary/",
        ReportSummaryView.as_view(),
    ),
    path(
        "reports/<uuid:report_id>/preview/",
        ReportPreviewView.as_view(),
    ),

]