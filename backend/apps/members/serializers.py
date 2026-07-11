
# # create, retr
# from .models import FamilyMember
# from rest_framework import serializers
# class FamilyMemberSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=FamilyMember

#         fields = (
#         "id",
#         "family",
#         "name",
#         "relation",
#         "date_of_birth",
#         "gender",
#         "medical_conditions",
#         "allergies",
#         "blood_group",
#         "linked_user",
#         "notes",
#         "created_by",
#         "created_at",
#         "updated_at",
#         )

#         read_only_fields=(
#             "id",
#             "family",
#             "linked_user",
#             "created_by",
#             "created_at",
#             "updated_at",
#         )
        
from rest_framework import serializers
from .models import FamilyMember
from apps.families.models import FamilyMembership

class FamilyMemberSerializer(serializers.ModelSerializer):
    linked_user = serializers.SerializerMethodField()
    permissions = serializers.SerializerMethodField()


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


    def get_linked_user(self, obj):

        if obj.linked_user is None:
            return None

        return {
            "id": obj.linked_user.id,
            "full_name": obj.linked_user.full_name,
            "email": obj.linked_user.email,
        }

    def get_permissions(self, obj):

        request = self.context.get("request")

        if request is None:
            return {}

        if request.user.is_anonymous:
            return {}

        membership = (
            FamilyMembership.objects
            .filter(
                family=obj.family,
                user=request.user,
            )
            .first()
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

        # OWNER
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

        # CAREGIVER
        if membership.role == FamilyMembership.Role.CAREGIVER:

            permissions.update({

                "can_edit": True,
                "can_upload_reports": True,
                "can_view_reports": True,
                "can_manage_medicines": True,
                "can_manage_habits": True,

            })

            return permissions

        # MEMBER

        permissions["can_view_reports"] = True

        if obj.linked_user == request.user:

            permissions.update({

                "can_edit": True,
                "can_upload_reports": True,
                "can_manage_medicines": True,
                "can_manage_habits": True,

            })

        return permissions

