from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django_cas_ng.views import LoginView
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework import status
from .models import CustomUser

# Create your views here.


class CustomCASLoginView(LoginView):
    def successful_login(self, request, next_page):
        response = super().successful_login(request, next_page)
        refresh = RefreshToken.for_user(request.user)
        response.set_cookie(
            "access_token", str(refresh.access_token),
            max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds(
            ),
            httponly=True, secure=True, samesite="Lax"
        )
        response.set_cookie(
            "refresh_token", str(refresh),
            max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds(
            ),
            httponly=True, secure=True, samesite="Lax"
        )

        return response


class CustomCASLogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = HttpResponseRedirect(settings.FRONTEND_URL)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response


class ProfileView(APIView):
    def get(self, request):
        u = request.user
        return Response({
            "id": u.username,
            "email": u.email,
            "first_name": u.first_name,
            "last_name": u.last_name,
        })


class CustomRefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        if 'refresh_token' in request.COOKIES:
            refresh_token_str = request.COOKIES.get('refresh_token')

            if not refresh_token_str:
                return Response(
                    {'detail': 'Refresh token not found'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            try:
                refresh_token = RefreshToken(refresh_token_str)

                user_id = refresh_token['user_id']
                user = CustomUser.objects.get(id=user_id)

                new_refresh_token = RefreshToken.for_user(user)
                new_access_token = new_refresh_token.access_token

                new_access_token['role'] = user.role
                new_access_token['email'] = user.email
                new_access_token['first_name'] = user.first_name
                new_access_token['last_name'] = user.last_name

                response = Response(
                    {'detail': 'Token refreshed successfully'},
                    status=status.HTTP_200_OK
                )

                response.set_cookie(
                    'access_token',
                    str(new_access_token),
                    max_age=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"].total_seconds(
                    ),
                    httponly=True,
                    secure=True,
                    samesite='None'
                )

                response.set_cookie(
                    'refresh_token',
                    str(new_refresh_token),
                    max_age=settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds(
                    ),
                    httponly=True,
                    secure=True,
                    samesite='None'
                )

                return response

            except TokenError:
                return Response(
                    {'detail': 'Invalid or expired refresh token'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            except CustomUser.DoesNotExist:
                return Response(
                    {'detail': 'User not found'},
                    status=status.HTTP_401_UNAUTHORIZED
                )
            except Exception:
                return Response(
                    {'detail': 'Token refresh failed'},
                    status=status.HTTP_400_BAD_REQUEST
                )
