from django.contrib import admin
from .models import Major, MajorVersion, MajorVersionRequirements, MajorVersionRequirementsClass

# Register your models here.
admin.site.register(Major)
admin.site.register(MajorVersion)
admin.site.register(MajorVersionRequirements)
admin.site.register(MajorVersionRequirementsClass)