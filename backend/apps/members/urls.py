from django.urls import path

from .views import (
    FamilyMemberListCreateView,
    FamilyMemberDetailView,
    MyProfileView,
)

urlpatterns = [

    path(
        "families/<uuid:family_id>/family-members/",
        FamilyMemberListCreateView.as_view(),
    ),

    path(
        "family-members/<uuid:pk>/",
        FamilyMemberDetailView.as_view(),
    ),
    path(
        "family-members/me/",
        MyProfileView.as_view(),
    ),

]