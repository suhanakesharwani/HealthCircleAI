from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from .serializers import FamilySerializer,JoinFamilySerializer,CreateFamilySerializer,MembershipRoleSerializer,MembershipSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Family,FamilyMembership
from django.shortcuts import get_object_or_404
# Create your views here.
from .models import FamilyMembership

class CreateFamilyView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):

        serializer=CreateFamilySerializer(
            data=request.data,
            context={"request":request}
        );

        serializer.is_valid(raise_exception=True)

        family=serializer.save()

        return Response(FamilySerializer(family).data)




class JoinFamilyView(APIView):
    permission_classes=[IsAuthenticated]
    def post(self,request):

        serializer=JoinFamilySerializer(
            data=request.data,
            context={"request":request}

        )

        serializer.is_valid(raise_exception=True)
        family=serializer.save()

        return Response(FamilySerializer(family).data)
    
class MembershipRoleUpdateView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, family_id, membership_id):

        owner = FamilyMembership.objects.filter(
            family_id=family_id,
            user=request.user,
            role=FamilyMembership.Role.OWNER,
        ).first()

        if owner is None:
            return Response(
                {"detail": "Only owner can change roles"},
                status=403,
            )

        membership = get_object_or_404(
            FamilyMembership,
            id=membership_id,
            family_id=family_id,
        )

        serializer = MembershipRoleSerializer(
            membership,
            data=request.data,
            partial=True,
        )

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)
    


class MembershipListView(APIView):

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
                {"detail": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN,
            )

        memberships = (
            FamilyMembership.objects
            .filter(family=family)
            .select_related("user")
        )

        serializer = MembershipSerializer(
            memberships,
            many=True,
        )

        return Response(serializer.data)