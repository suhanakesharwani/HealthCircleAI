from django.urls import path

from .views import (
    CreateFamilyView,
    JoinFamilyView,
    MembershipRoleUpdateView,
    MembershipListView,
)

urlpatterns = [

    path(
        "",
        CreateFamilyView.as_view(),
    ),

    path(
        "join/",
        JoinFamilyView.as_view(),
    ),

    path(
        "<uuid:family_id>/memberships/",
        MembershipListView.as_view(),
    ),

    path(
        "<uuid:family_id>/memberships/<uuid:membership_id>/",
        MembershipRoleUpdateView.as_view(),
    ),

]