from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.contrib.auth import get_user_model
from django.db.models import Q


# User = get_user_model()

class User(AbstractUser):
    is_student = models.BooleanField(default = False, verbose_name = 'Student')
    is_staff = models.BooleanField(default = False, verbose_name= 'Staff')
    is_teacher = models.BooleanField(default = False, verbose_name='Teacher')
    is_superuser = models.BooleanField(default = False, verbose_name= 'Administrator')
    is_registrar = models.BooleanField (default = False, verbose_name= 'Registrar')

    email = models.EmailField(
    max_length=254,
    unique=True,
    verbose_name='Email Address',
    blank=True,
    null=True,
    )

    def __str__(self):
        return self.username


class StaffProfile(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),

    ]
    user = models.OneToOneField(
            User,
            on_delete=models.CASCADE,
            primary_key= True,
            limit_choices_to= Q(is_staff= True),
            related_name= 'staffprofile',
        )
    first_name = models.CharField(max_length= 70,)
    middle_name = models.CharField(max_length=70,)
    last_name = models.CharField(max_length=70,)
    gender = models.CharField(
        max_length= 6,
        choices=GENDER_CHOICES,
        default='Male',
        )
    employee_number= models.CharField(max_length= 15)
    date_of_birth = models.DateField()
    mobile_number = models.CharField(max_length= 15)
    address= models.TextField()

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def __str__(self):
        full_name = self.get_full_name()
        return full_name.strip()
