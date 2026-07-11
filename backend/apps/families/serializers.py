

import random
import string
from rest_framework import serializers
from .models import Family, FamilyMembership
from django.shortcuts import get_object_or_404
from apps.accounts.models import User
class FamilySerializer(serializers.ModelSerializer):

    class Meta:
        model = Family
        fields = (
            "id",
            "name",
            "invite_code",
        )


class CreateFamilySerializer(serializers.Serializer):

    name = serializers.CharField(max_length=100)

    def create(self, validated_data):

        

        user = self.context["request"].user
        if FamilyMembership.objects.filter(user=user).exists():
            raise serializers.ValidationError(
                "You are already part of a family."
            )


        invite_code = "".join(
            random.choices(
                string.ascii_uppercase + string.digits,
                k=8
            )
        )
        
        while Family.objects.filter(invite_code=invite_code).exists():
            invite_code = "".join(
                random.choices(
                    string.ascii_uppercase + string.digits,
                    k=8
                )
            )

        family = Family.objects.create(
            name=validated_data["name"],
            invite_code=invite_code,
            created_by=user
        )

        FamilyMembership.objects.create(
            family=family,
            user=user,
            role=FamilyMembership.Role.OWNER
        )

        return family


class JoinFamilySerializer(serializers.Serializer):

    invite_code = serializers.CharField(max_length=8)

    

    def validate_invite_code(self, value):

        try:
            family = Family.objects.get(invite_code=value.upper())

        except Family.DoesNotExist:
            raise serializers.ValidationError("Invalid invite code.")

        self.family = family

        return value

    def save(self):

        user = self.context["request"].user
        if FamilyMembership.objects.filter(user=user).exists():
            raise serializers.ValidationError(
                "You are already part of a family."
            )

        FamilyMembership.objects.create(
            family=self.family,
            user=user,
            role=FamilyMembership.Role.MEMBER
        )

        return self.family
    
class MembershipRoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = FamilyMembership
        fields = ("role",)


class MembershipUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = (
            "id",
            "full_name",
            "email",
        )


class MembershipSerializer(serializers.ModelSerializer):

    user = MembershipUserSerializer(
        read_only=True
    )

    class Meta:
        model = FamilyMembership

        fields = (
            "id",
            "role",
            "user",
        )