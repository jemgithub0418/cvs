from django.db import models
from django.conf import settings
from django.db.models import Q
from main.models import Subject, SchoolPeriod, Section, YearLevel

class StudentProfile(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),

    ]
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, 
        limit_choices_to=Q(is_student= True), 
        on_delete=models.CASCADE, 
        related_name= "studentprofile"
        )
    first_name = models.CharField(max_length= 55)
    last_name = models.CharField(max_length= 55)
    middle_name = models.CharField(max_length= 55, null=True, blank= True)
    LRN_or_student_number = models.CharField(max_length= 55)
    date_of_birth = models.DateField()
    contact_number = models.CharField(max_length=15, null=True, blank= True)
    gender = models.CharField(
        max_length= 6,
        choices=GENDER_CHOICES,
        default='Male',
        )
    address = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Student(models.Model):
    student = models.OneToOneField(settings.AUTH_USER_MODEL, limit_choices_to= Q(is_student= True), on_delete= models.CASCADE)
    enrolled_subjects = models.ManyToManyField(Subject, null= True, blank= True)
    profile = models.OneToOneField(StudentProfile, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete = models.CASCADE, blank=True, null=True)

    def __str__(self):
        return f"{self.profile.first_name} {self.profile.last_name}"


class StudentGrade(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, limit_choices_to=Q(is_student=True), on_delete= models.CASCADE)
    period = models.ForeignKey(SchoolPeriod, on_delete= models.SET_NULL, null=True, blank= True)
    subject = models.ForeignKey(Subject, on_delete= models.SET_NULL,null= True, blank= True)
    grade = models.DecimalField(max_digits=4, decimal_places= 2)


    def __str__(self):
        return f"{self.student}, {self.period}, {self.subject}, {self.grade}."
