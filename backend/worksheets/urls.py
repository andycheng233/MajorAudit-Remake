from django.urls import path
from .views import (
    UserWorksheetListCreateView,
    UserWorksheetDetailView,
    UserWorksheetSemesterListCreateView,
    UserWorksheetSemesterDetailView,
    UserWorksheetClassListCreateView,
    UserWorksheetClassDetailView,
)

urlpatterns = [
    path('', UserWorksheetListCreateView.as_view(), name='worksheet-list'),
    path('<int:pk>/', UserWorksheetDetailView.as_view(), name='worksheet-detail'),

    path('<int:worksheet_pk>/semesters/',
         UserWorksheetSemesterListCreateView.as_view(), name='semester-list'),
    path('<int:worksheet_pk>/semesters/<int:pk>/',
         UserWorksheetSemesterDetailView.as_view(), name='semester-detail'),

    path('<int:worksheet_pk>/semesters/<int:semester_pk>/classes/',
         UserWorksheetClassListCreateView.as_view(), name='semester-class-list'),
    path('<int:worksheet_pk>/semesters/<int:semester_pk>/classes/<int:pk>/',
         UserWorksheetClassDetailView.as_view(), name='semester-class-detail'),
]
