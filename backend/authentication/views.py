from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import status
from .models import CustomUser

# Create your views here.


class ProfileView(APIView):
    def get(self, request):
        u = request.user
        return Response({
            "id": u.username,
            "email": u.email,
            "first_name": u.first_name,
            "last_name": u.last_name,
        })
