
# import secrets

# import random
# import string
# from rest_framework import serializers
# from .models import Family, FamilyMembership
# from django.shortcuts import get_object_or_404
# from apps.accounts.models import User
# class FamilySerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Family
#         fields = (
#             "id",
#             "name",
#             "invite_code",
#         )


# class CreateFamilySerializer(serializers.Serializer):

#     name = serializers.CharField(max_length=100)

#     def create(self, validated_data):

        

#         user = self.context["request"].user
#         if FamilyMembership.objects.filter(user=user).exists():
#             raise serializers.ValidationError(
#                 "You are already part of a family."
#             )
        

#         invite_code = "".join(
#             random.choices(
#                 string.ascii_uppercase + string.digits,
#                 k=8
#             )
#         )
        
#         while Family.objects.filter(invite_code=invite_code).exists():
#             invite_code = "".join(
#                 random.choices(
#                     string.ascii_uppercase + string.digits,
#                     k=8
#                 )
#             )

#         family = Family.objects.create(
#             name=validated_data["name"],
#             invite_code=invite_code,
#             created_by=user
#         )

#         FamilyMembership.objects.create(
#             family=family,
#             user=user,
#             role=FamilyMembership.Role.OWNER
#         )

#         return family


# class JoinFamilySerializer(serializers.Serializer):

#     invite_code = serializers.CharField(max_length=8)

    

#     def validate_invite_code(self, value):

#         try:
#             family = Family.objects.get(invite_code=value.upper())

#         except Family.DoesNotExist:
#             raise serializers.ValidationError("Invalid invite code.")

#         self.family = family

#         return value

#     def save(self):

#         user = self.context["request"].user
#         if FamilyMembership.objects.filter(user=user).exists():
#             raise serializers.ValidationError(
#                 "You are already part of a family."
#             )

#         FamilyMembership.objects.create(
#             family=self.family,
#             user=user,
#             role=FamilyMembership.Role.MEMBER
#         )

#         return self.family
    
# class MembershipRoleSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = FamilyMembership
#         fields = ("role",)


# class MembershipUserSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = User

#         fields = (
#             "id",
#             "full_name",
#             "email",
#         )


# class MembershipSerializer(serializers.ModelSerializer):

#     user = MembershipUserSerializer(
#         read_only=True
#     )

#     class Meta:
#         model = FamilyMembership

#         fields = (
#             "id",
#             "role",
#             "user",
#         )

import secrets
import string

from django.db import transaction
from rest_framework import serializers

from apps.accounts.models import User
from .models import Family, FamilyMembership


class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = (
            "id",
            "name",
            "invite_code",
        )
        read_only_fields = fields


class CreateFamilySerializer(serializers.Serializer):
    name = serializers.CharField(
        min_length=2,
        max_length=100,
        trim_whitespace=True,
    )

    ALPHABET = string.ascii_uppercase + string.digits

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Family name cannot be empty."
            )

        return value

    def _generate_invite_code(self):
        while True:
            code = "".join(
                secrets.choice(self.ALPHABET)
                for _ in range(8)
            )

            if not Family.objects.filter(
                invite_code=code
            ).exists():
                return code

    @transaction.atomic
    def create(self, validated_data):
        user = self.context["request"].user

        if FamilyMembership.objects.select_for_update().filter(
            user=user
        ).exists():
            raise serializers.ValidationError(
                "You are already part of a family."
            )

        family = Family.objects.create(
            name=validated_data["name"],
            invite_code=self._generate_invite_code(),
            created_by=user,
        )

        FamilyMembership.objects.create(
            family=family,
            user=user,
            role=FamilyMembership.Role.OWNER,
        )

        return family


class JoinFamilySerializer(serializers.Serializer):
    invite_code = serializers.RegexField(
        regex=r"^[A-Za-z0-9]{8}$",
        max_length=8,
    )

    def validate_invite_code(self, value):
        value = value.strip().upper()

        try:
            family = Family.objects.get(
                invite_code=value
            )
        except Family.DoesNotExist:
            raise serializers.ValidationError(
                "Invalid invite code."
            )

        self.family = family

        return value

    @transaction.atomic
    def save(self):
        user = self.context["request"].user

        if FamilyMembership.objects.select_for_update().filter(
            user=user
        ).exists():
            raise serializers.ValidationError(
                "You are already part of a family."
            )

        FamilyMembership.objects.create(
            family=self.family,
            user=user,
            role=FamilyMembership.Role.MEMBER,
        )

        return self.family


class MembershipRoleSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(
        choices=FamilyMembership.Role.choices
    )

    class Meta:
        model = FamilyMembership
        fields = (
            "role",
        )

    def validate_role(self, value):
        if value == FamilyMembership.Role.OWNER:
            raise serializers.ValidationError(
                "Owner role cannot be assigned."
            )

        return value


class MembershipUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = (
            "id",
            "full_name",
        )

        read_only_fields = fields


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

        read_only_fields = fields