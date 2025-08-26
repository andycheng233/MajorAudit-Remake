from django.db import models
from authentication.models import CustomUser

# Create your models here.


class Distributionals(models.TextChoices):
    HU = "HU", "Humanities & Arts"
    SO = "SO", "Social Sciences"
    SC = "SC", "Sciences"
    QR = "QR", "Quantitative Reasoning"
    WR = "WR", "Writing"
    L1 = "L1", "Language Level 1"
    L2 = "L2", "Language Level 2"
    L3 = "L3", "Language Level 3"
    L4 = "L4", "Language Level 4"
    L5 = "L5", "Language Level 5"


class CourseDistribution(models.Model):
    code = models.CharField(
        max_length=2,
        choices=Distributionals.choices,
        primary_key=True
    )


class Seasons(models.TextChoices):
    SP = "SP", "Spring"
    SU = "SU", "Summer"
    FA = "FA", "Fall"


class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    credits = models.DecimalField(decimal_places=1, max_digits=2)
    distributionals = models.ManyToManyField(CourseDistribution, blank=True)


class CourseInstance(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    course_dept = models.CharField(max_length=10)
    course_num = models.CharField(max_length=4)
    course_year = models.PositiveIntegerField()
    course_season = models.CharField(choices=Seasons.choices, max_length=10)
    professor = models.CharField(max_length=50)
    section_num = models.PositiveIntegerField()


class CustomCourse(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    credits = models.DecimalField(decimal_places=1, max_digits=2)
    distributionals = models.ManyToManyField(CourseDistribution, blank=True)
    course_dept = models.CharField(max_length=10)
    course_num = models.CharField(max_length=4)
    course_year = models.PositiveIntegerField()
    course_season = models.CharField(choices=Seasons.choices, max_length=10)
    professor = models.CharField(max_length=50)
