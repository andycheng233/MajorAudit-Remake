# authentication/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.CustomCASLoginView.as_view(), name='cas_ng_login'),
    path('logout/', views.CustomCASLogoutView.as_view(), name='cas_ng_logout'),
    path("profile/", views.ProfileView.as_view(), name="profile"),
    path("token/refresh/", views.CustomRefreshView.as_view(), name="token_refresh"),
]
