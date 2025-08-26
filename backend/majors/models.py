from django.db import models
from courses.models import Course

# Create your models here.


class Major(models.Model):
    name = models.CharField(max_length=50)
    abbreviation = models.CharField(max_length=10)
    description = models.TextField()
    dus = models.CharField(max_length=100)
    catalog_link = models.CharField(max_length=100)
    website_link = models.CharField(max_length=100)


class MajorVersion(models.Model):
    major = models.ForeignKey(Major, on_delete=models.CASCADE)
    degree_kind = models.CharField(max_length=100)
    concentration1 = models.CharField(max_length=100)
    concentration2 = models.CharField(max_length=100)
    concentration3 = models.CharField(max_length=100)


class MajorVersionRequirements(models.Model):
    class RequirementTypes(models.TextChoices):
        SINGLE = "SINGLE", "Single"
        CATEGORY = "CATEGORY", "Category"
        ELECTIVE = "ELECTIVE", "Elective"
        SENIOR = "SENIOR", "Senior"

    major_version = models.ForeignKey(MajorVersion, on_delete=models.CASCADE)
    requirement_type = models.CharField(
        choices=RequirementTypes.choices, max_length=100)
    title = models.CharField(max_length=100)
    description = models.TextField()
    credits = models.PositiveIntegerField()


class MajorVersionRequirementsClass(models.Model):
    description = models.CharField(max_length=100)
    major_version_reqs = models.ForeignKey(
        MajorVersionRequirements, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
