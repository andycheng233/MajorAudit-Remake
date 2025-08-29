from django.contrib import admin
from .models import UserWorksheet, UserWorksheetClass, UserWorksheetSemester

# Register your models here.
admin.site.register(UserWorksheet)
admin.site.register(UserWorksheetClass)
admin.site.register(UserWorksheetSemester)
