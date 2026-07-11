# from django.shortcuts import get_object_or_404

# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from rest_framework.views import APIView

# from apps.families.models import Family, FamilyMembership
# from .models import FamilyMember
# from .serializers import FamilyMemberSerializer


# class FamilyMemberListCreateView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get(self, request, family_id):

#         family = get_object_or_404(
#             Family,
#             id=family_id
#         )

#         if not FamilyMembership.objects.filter(
#             family=family,
#             user=request.user,
#         ).exists():

#             return Response(
#                 {"detail": "Permission denied."},
#                 status=status.HTTP_403_FORBIDDEN,
#             )

#         members = FamilyMember.objects.filter(
#             family=family
#         )

#         serializer = FamilyMemberSerializer(
#             members,
#             many=True,
#             context={"request": request},
#         )

#         return Response(serializer.data)
   
#     def post(self, request, family_id):

#         family = get_object_or_404(
#             Family,
#             id=family_id
#         )

#         membership = FamilyMembership.objects.filter(
#             family=family,
#             user=request.user,
#         ).first()

#         if membership is None:

#             return Response(
#                 {"detail": "Permission denied."},
#                 status=status.HTTP_403_FORBIDDEN,
#             )

#         if FamilyMember.objects.filter(
#             linked_user=request.user
#         ).exists():

#             return Response(
#                 {
#                     "detail": "You have already created your health profile."
#                 },
#                 status=status.HTTP_400_BAD_REQUEST,
#             )

#         serializer = FamilyMemberSerializer(
#             data=request.data,
#             context={"request": request},
#         )

#         serializer.is_valid(
#             raise_exception=True
#         )

#         serializer.save(
#             family=family,
#             linked_user=request.user,
#             created_by=request.user,
#         )

#         return Response(
#             serializer.data,
#             status=status.HTTP_201_CREATED,
#         )


# class FamilyMemberDetailView(APIView):

#     permission_classes = [IsAuthenticated]

#     def get_object(self, pk, user):

#         member = get_object_or_404(
#             FamilyMember,
#             pk=pk,
#         )

#         if not FamilyMembership.objects.filter(
#             family=member.family,
#             user=user,
#         ).exists():

#             return None

#         return member

#     def get(self, request, pk):

#         member = self.get_object(
#             pk,
#             request.user,
#         )

#         if member is None:

#             return Response(
#                 {"detail": "Permission denied."},
#                 status=status.HTTP_403_FORBIDDEN,
#             )

#         serializer = FamilyMemberSerializer(
#             member,
#             context={"request": request},
#         )

#         return Response(serializer.data)

#     def patch(self, request, pk):

#         member = self.get_object(
#             pk,
#             request.user,
#         )

#         if member is None:

#             return Response(
#                 {"detail": "Permission denied."},
#                 status=status.HTTP_403_FORBIDDEN,
#             )

#         membership = FamilyMembership.objects.get(
#             family=member.family,
#             user=request.user,
#         )

#         if (
#             membership.role != FamilyMembership.Role.OWNER
#             and member.linked_user != request.user
#         ):

#             return Response(
#                 {
#                     "detail": "You cannot edit this profile."
#                 },
#                 status=status.HTTP_403_FORBIDDEN,
#             )

#         serializer = FamilyMemberSerializer(
#             member,
#             data=request.data,
#             partial=True,
#             context={"request": request},
#         )

#         serializer.is_valid(
#             raise_exception=True
#         )

#         serializer.save()

#         return Response(serializer.data)

#     def delete(self, request, pk):

#         member = self.get_object(
#             pk,
#             request.user,
#         )

#         if member is None:

#             return Response(
#                 {"detail": "Permission denied."},
#                 status=status.HTTP_403_FORBIDDEN,
#             )

#         membership = FamilyMembership.objects.get(
#             family=member.family,
#             user=request.user,
#         )

#         if membership.role != FamilyMembership.Role.OWNER:

#             return Response(
#                 {
#                     "detail": "Only the owner can delete profiles."
#                 },
#                 status=status.HTTP_403_FORBIDDEN,
#             )

#         member.delete()

#         return Response(
#             status=status.HTTP_204_NO_CONTENT
#         )

from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.families.models import (
    Family,
    FamilyMembership,
)

from .models import FamilyMember
from .serializers import FamilyMemberSerializer


class FamilyMemberListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, family_id):

        family = get_object_or_404(
            Family,
            id=family_id,
        )

        membership = FamilyMembership.objects.filter(
            family=family,
            user=request.user,
        ).first()

        if membership is None:
            return Response(
                {
                    "detail": "Permission denied."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        members = (
            FamilyMember.objects
            .filter(family=family)
            .select_related(
                "linked_user",
                "created_by",
            )
        )

        serializer = FamilyMemberSerializer(
            members,
            many=True,
            context={
                "request": request,
            },
        )

        return Response(serializer.data)

    def post(self, request, family_id):

        family = get_object_or_404(
            Family,
            id=family_id,
        )

        membership = FamilyMembership.objects.filter(
            family=family,
            user=request.user,
        ).first()

        if membership is None:
            return Response(
                {
                    "detail": "Permission denied."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        if FamilyMember.objects.filter(
            linked_user=request.user
        ).exists():

            return Response(
                {
                    "detail":
                    "You already have a health profile."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = FamilyMemberSerializer(
            data=request.data,
            context={
                "request": request,
            },
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save(
            family=family,
            linked_user=request.user,
            created_by=request.user,
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )


class FamilyMemberDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get_member(self, pk, user):

        member = get_object_or_404(
            FamilyMember.objects.select_related(
                "family",
                "linked_user",
            ),
            pk=pk,
        )

        belongs = FamilyMembership.objects.filter(
            family=member.family,
            user=user,
        ).exists()

        if not belongs:
            return None

        return member

    def get(self, request, pk):

        member = self.get_member(
            pk,
            request.user,
        )

        if member is None:

            return Response(
                {
                    "detail":
                    "Permission denied."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = FamilyMemberSerializer(
            member,
            context={
                "request": request,
            },
        )

        return Response(
            serializer.data
        )

    def patch(self, request, pk):

        member = self.get_member(
            pk,
            request.user,
        )

        if member is None:

            return Response(
                {
                    "detail":
                    "Permission denied."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        membership = FamilyMembership.objects.get(
            family=member.family,
            user=request.user,
        )

        can_edit = False

        if membership.role == FamilyMembership.Role.OWNER:
            can_edit = True

        elif membership.role == FamilyMembership.Role.CAREGIVER:
            can_edit = True

        elif member.linked_user == request.user:
            can_edit = True

        if not can_edit:

            return Response(
                {
                    "detail":
                    "You cannot edit this profile."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = FamilyMemberSerializer(
            member,
            data=request.data,
            partial=True,
            context={
                "request": request,
            },
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data
        )

    def delete(self, request, pk):

        member = self.get_member(
            pk,
            request.user,
        )

        if member is None:

            return Response(
                {
                    "detail":
                    "Permission denied."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        membership = FamilyMembership.objects.get(
            family=member.family,
            user=request.user,
        )

        if membership.role != FamilyMembership.Role.OWNER:

            return Response(
                {
                    "detail":
                    "Only owner can delete profiles."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        member.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT,
        )


class MyProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        member = get_object_or_404(
            FamilyMember,
            linked_user=request.user,
        )

        serializer = FamilyMemberSerializer(
            member,
            context={
                "request": request,
            },
        )

        return Response(
            serializer.data
        )

    def patch(self, request):

        member = get_object_or_404(
            FamilyMember,
            linked_user=request.user,
        )

        serializer = FamilyMemberSerializer(
            member,
            data=request.data,
            partial=True,
            context={
                "request": request,
            },
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            serializer.data
        )