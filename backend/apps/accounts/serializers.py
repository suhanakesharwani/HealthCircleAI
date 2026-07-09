
from rest_framework import serializers
from apps.accounts.models import User
from django.contrib.auth import authenticate

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

    class Meta:
        model = User

        fields = (
            "id",
            "email",
            "full_name",
            "phone",
            "created_at",
        )