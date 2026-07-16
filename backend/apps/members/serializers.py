from datetime import date

from rest_framework import serializers

from .models import FamilyMember
from apps.families.models import FamilyMembership


class FamilyMemberSerializer(serializers.ModelSerializer):
    linked_user = serializers.SerializerMethodField()
    permissions = serializers.SerializerMethodField()

    name = serializers.CharField(
        min_length=2,
        max_length=100,
        trim_whitespace=True,
    )

    relation = serializers.CharField(
        min_length=2,
        max_length=30,
        trim_whitespace=True,
    )

    notes = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=5000,
        trim_whitespace=True,
    )

    medical_conditions = serializers.ListField(
        child=serializers.CharField(
            max_length=100,
            trim_whitespace=True,
        ),
        required=False,
    )

    allergies = serializers.ListField(
        child=serializers.CharField(
            max_length=100,
            trim_whitespace=True,
        ),
        required=False,
    )

    class Meta:
        model = FamilyMember

        fields = (
            "id",
            "family",
            "linked_user",
            "name",
            "relation",
            "date_of_birth",
            "gender",
            "medical_conditions",
            "allergies",
            "blood_group",
            "notes",
            "created_by",
            "created_at",
            "updated_at",
            "permissions",
        )

        read_only_fields = (
            "id",
            "family",
            "linked_user",
            "created_by",
            "created_at",
            "updated_at",
            "permissions",
        )

    def validate_name(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Name cannot be empty."
            )

        return value

    def validate_relation(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Relation cannot be empty."
            )

        return value

    def validate_date_of_birth(self, value):
        if value and value > date.today():
            raise serializers.ValidationError(
                "Date of birth cannot be in the future."
            )

        return value

    def validate_medical_conditions(self, value):
        if len(value) > 50:
            raise serializers.ValidationError(
                "Too many medical conditions."
            )

        return value

    def validate_allergies(self, value):
        if len(value) > 50:
            raise serializers.ValidationError(
                "Too many allergies."
            )

        return value

    def get_linked_user(self, obj):
        if obj.linked_user is None:
            return None

        # Don't expose email unless you really need it.
        return {
            "id": obj.linked_user.id,
            "full_name": obj.linked_user.full_name,
        }

    def get_permissions(self, obj):
        request = self.context.get("request")

        if request is None or request.user.is_anonymous:
            return {}

        membership = (
            FamilyMembership.objects.filter(
                family=obj.family,
                user=request.user,
            ).first()
        )

        if membership is None:
            return {}

        permissions = {
            "can_view": True,
            "can_edit": False,
            "can_delete": False,
            "can_upload_reports": False,
            "can_view_reports": False,
            "can_manage_medicines": False,
            "can_manage_habits": False,
        }

        if membership.role == FamilyMembership.Role.OWNER:
            permissions.update({
                "can_edit": True,
                "can_delete": True,
                "can_upload_reports": True,
                "can_view_reports": True,
                "can_manage_medicines": True,
                "can_manage_habits": True,
            })
            return permissions

        if membership.role == FamilyMembership.Role.CAREGIVER:
            permissions.update({
                "can_edit": True,
                "can_upload_reports": True,
                "can_view_reports": True,
                "can_manage_medicines": True,
                "can_manage_habits": True,
            })
            return permissions

        permissions["can_view_reports"] = True

        if obj.linked_user == request.user:
            permissions.update({
                "can_edit": True,
                "can_upload_reports": True,
                "can_manage_medicines": True,
                "can_manage_habits": True,
            })

        return permissions