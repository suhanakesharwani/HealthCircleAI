
from rest_framework import serializers
from apps.accounts.models import User
from django.contrib.auth import authenticate
from apps.families.models import FamilyMembership
class RegisterSerializer(serializers.ModelSerializer):
    password=serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type":"password"}
    )
    class Meta:
        model=User
        fields=(
            "email",
            "password",
            "full_name"
        )

    def create(self,validated_data):
        return User.objects.create_user(**validated_data)
    


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        style={"input_type": "password"}
    )

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(
            email=email,
            password=password
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "User account is inactive."
            )

        attrs["user"] = user
        return attrs
    

class UserSerializer(serializers.ModelSerializer):

    has_family = serializers.SerializerMethodField()
    family = serializers.SerializerMethodField()

    class Meta:
        model = User

        fields = (
            "id",
            "email",
            "full_name",
            "phone",
            "created_at",
            "has_family",
            "family",
        )
    def get_has_family(self, obj):
        return FamilyMembership.objects.filter(user=obj).exists()

    def get_family(self, obj):

        # membership = (
        #     FamilyMembership.objects
        #     .select_related("family")
        #     .filter(user=obj)
        #     .first()
        # )

        # if membership is None:
        #     return None

        # return {
        #     "id": membership.family.id,
        #     "name": membership.family.name,
        #     "role": membership.role,
        # }
        membership = (
            FamilyMembership.objects
            .select_related("family")
            .filter(user=obj)
            .first()
        )

        if membership is None:
            return None

        data = {
            "id": membership.family.id,
            "name": membership.family.name,
            "role": membership.role,
        }

        if membership.role == FamilyMembership.Role.OWNER:
            data["invite_code"] = membership.family.invite_code

        return data