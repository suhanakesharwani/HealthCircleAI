from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError

# Create your views here.
from .serializers import(
    RegisterSerializer,
    LoginSerializer,
    UserSerializer,
)

class RegisterView(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        serializer=RegisterSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user=serializer.save()

        refresh=RefreshToken.for_user(user)

        access=str(refresh.access_token)

        response=Response({
            "user":UserSerializer(user).data
        })

        response.set_cookie(
            "access_token",
            access,
            httponly=True,
            secure=False,
            samesite="Lax"
        )

        response.set_cookie(
            "refresh_token",
            str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax"
        )

        return response


class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        access = str(refresh.access_token)

        response = Response({
            "user": UserSerializer(user).data
        })

        response.set_cookie(
            "access_token",
            access,
            httponly=True,
            secure=False,
            samesite="Lax"
        )

        response.set_cookie(
            "refresh_token",
            str(refresh),
            httponly=True,
            secure=False,
            samesite="Lax"
        )

        return response
    

class RefreshView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        refresh = request.COOKIES.get("refresh_token")

        token = RefreshToken(refresh)

        access = str(token.access_token)

        response = Response()

        response.set_cookie(
            "access_token",
            access,
            httponly=True,
            secure=False,
            samesite="Lax"
        )

        return response
    

class LogoutView(APIView):

    def post(self, request):

        response = Response()

        response.delete_cookie("access_token")

        response.delete_cookie("refresh_token")

        return response
    

class MeView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)
    

class CurrentUserView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)
    


class RefreshView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        refresh = request.COOKIES.get("refresh_token")

        if refresh is None:
            return Response(
                {"detail": "No refresh token"},
                status=401,
            )

        try:
            token = RefreshToken(refresh)
        except TokenError:
            return Response(
                {"detail": "Invalid refresh token"},
                status=401,
            )

        access = str(token.access_token)

        response = Response()

        response.set_cookie(
            "access_token",
            access,
            httponly=True,
            secure=False,
            samesite="Lax",
        )

        return response