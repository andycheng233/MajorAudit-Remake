from django.shortcuts import render
from rest_framework import generics, permissions
from django.shortcuts import get_object_or_404
from .models import UserWorksheet, UserWorksheetSemester, UserWorksheetClass
from .serializers import (
    UserWorksheetSerializer,
    UserWorksheetSemesterSerializer,
    UserWorksheetClassSerializer
)
from .permissions import IsOwnerPermission

# Create your views here.


class UserWorksheetListCreateView(generics.ListCreateAPIView):
    serializer_class = UserWorksheetSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerPermission]

    def get_queryset(self):
        return UserWorksheet.objects.filter(user=self.request.user).prefetch_related(
            'userworksheetsemester_set__userworksheetclass_set'
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserWorksheetDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserWorksheetSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerPermission]

    def get_queryset(self):
        return UserWorksheet.objects.filter(user=self.request.user).prefetch_related(
            'userworksheetsemester_set__userworksheetclass_set'
        )


class UserWorksheetSemesterListCreateView(generics.ListCreateAPIView):
    serializer_class = UserWorksheetSemesterSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerPermission]

    def get_queryset(self):
        worksheet_id = self.kwargs.get('worksheet_pk')
        return UserWorksheetSemester.objects.filter(
            worksheet_id=worksheet_id,
            worksheet__user=self.request.user
        ).prefetch_related('userworksheetclass_set')

    def perform_create(self, serializer):
        worksheet_id = self.kwargs.get('worksheet_pk')
        worksheet = get_object_or_404(
            UserWorksheet,
            id=worksheet_id,
            user=self.request.user
        )
        serializer.save(worksheet=worksheet)


class UserWorksheetSemesterDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserWorksheetSemesterSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerPermission]

    def get_queryset(self):
        worksheet_id = self.kwargs.get('worksheet_pk')
        return UserWorksheetSemester.objects.filter(
            worksheet_id=worksheet_id,
            worksheet__user=self.request.user
        ).prefetch_related('userworksheetclass_set')


class UserWorksheetClassListCreateView(generics.ListCreateAPIView):
    serializer_class = UserWorksheetClassSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerPermission]

    def get_queryset(self):
        semester_id = self.kwargs.get('semester_pk')
        return UserWorksheetClass.objects.filter(
            semester_id=semester_id,
            semester__worksheet__user=self.request.user
        )

    def perform_create(self, serializer):
        semester_id = self.kwargs.get('semester_pk')
        semester = get_object_or_404(
            UserWorksheetSemester,
            id=semester_id,
            worksheet__user=self.request.user
        )
        serializer.save(semester=semester)


class UserWorksheetClassDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserWorksheetClassSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerPermission]

    def get_queryset(self):
        semester_id = self.kwargs.get('semester_pk')
        return UserWorksheetClass.objects.filter(
            semester_id=semester_id,
            semester__worksheet__user=self.request.user
        )
