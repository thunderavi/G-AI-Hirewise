# backend/accounts/views.py
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, LoginSerializer
from django.utils.translation import gettext_lazy as _
from .models import User  # Import User model here

# Home view
def home(request):
    return HttpResponse("<h1>Welcome to the HireWise API</h1>")

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": serializer.data,
            "message": "User registered successfully."
        })

class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            return Response({
                "message": "User logged in successfully.",
                "username": user.username,
            })
        return Response({
            "error": _("Invalid Credentials")
        }, status=status.HTTP_400_BAD_REQUEST)
