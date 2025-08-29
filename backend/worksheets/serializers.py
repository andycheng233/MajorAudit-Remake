from rest_framework import serializers
from .models import UserWorksheet, UserWorksheetSemester, UserWorksheetClass


class UserWorksheetClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWorksheetClass
        fields = ['id', 'course', 'course_instance', 'creditdf']


class UserWorksheetSemesterSerializer(serializers.ModelSerializer):
    classes = UserWorksheetClassSerializer(
        many=True, read_only=True, source='userworksheetclass_set')

    class Meta:
        model = UserWorksheetSemester
        fields = ['id', 'year', 'season', 'classes']


class UserWorksheetSerializer(serializers.ModelSerializer):
    semesters = UserWorksheetSemesterSerializer(
        many=True, read_only=True, source='userworksheetsemester_set')

    class Meta:
        model = UserWorksheet
        fields = ['id', 'name', 'semesters']
        read_only_fields = ['user']
