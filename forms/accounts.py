from django import forms
from accounts.models import User, StaffProfile
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.db import transaction
import datetime
import random, string

def generate_password():
    password = ''.join(random.choices(string.ascii_letters + string.digits , k=8))
    return password


def generate_username(first_name, last_name):
    username = f'{first_name.replace(" ", ".")}.{last_name.replace(" ", ".")}'
    username.lower()
    if User.objects.filter(username__iexact = username).count() == 0:
        return username.lower()
    else:
        while True:
            additional_digits = random.choices(string.digits, k=2)
            print(additional_digits)
            for digits in additional_digits:
                username += str(digits)
            new_unique_username = username
            if User.objects.filter(username__iexact = new_unique_username ).count() == 0:
                username = new_unique_username
                break

        return username.lower()


class StaffCreationForm(UserCreationForm):
    user_level_choices = [
        ('Teacher' , 'Teacher'),
        ('Registrar', 'Registrar'),
        ('Administrator' , 'Administrator'),
    ]
    email = forms.EmailField(
        max_length=254, help_text='Required. Please provide a valid email address.')
    user_level = forms.ChoiceField(
        label='User Role', widget=forms.Select, choices=user_level_choices, initial='Teacher')



    class Meta(UserCreationForm.Meta):
        model = User
        fields = ['email', 'user_level',]


    # @transaction.atomic
    # def save(self, commit = True):
    #     level = self.cleaned_data['user_level']
    #     user = super().save(commit= False)
    #     user.is_staff = True

    #     if level == 'Registrar':
    #         user.is_registrar = True
    #     if level == 'Teacher':
    #         user.is_teacher= True
    #     if level == 'Administrator':
    #         user.is_superuser= True
    #     if commit:
    #         user.save()
    #     return user


class StaffProfileCreationForm(forms.ModelForm):
    mobile_number = forms.CharField(widget=forms.TextInput(attrs={'placeholder': "917 123 1234"}),label="", max_length=15)
    address = forms.CharField(widget=forms.Textarea(attrs={'rows': 3}),)

    today = datetime.date.today()
    year = today.year
    end = year - 120
    days = 32
    months = 13


    day_choices = []
    while days != 1:
        day = days - 1
        day_choices.append((day,day))
        days = days - 1

    month_choices = []
    while months != 1:
        month = months - 1
        month_choices.append((month,month))
        months = months - 1

    year_choices = []
    while year != end:
        year_choices.append((year,year))
        year -= 1


    dob_day = forms.ChoiceField(
            label='Day',
            widget= forms.Select(attrs={'placeholder': 'Day'}),
            choices=day_choices,
            initial=1,

        )

    dob_month = forms.ChoiceField(
            label='Month',
            widget= forms.Select,
            choices=month_choices,
            initial= 1,
        )

    dob_year = forms.ChoiceField(
            label = 'Year',
            widget = forms.Select,
            choices= year_choices,
            initial = year,
        )

    date_of_birth = forms.CharField(
            widget = forms.HiddenInput(),
        )


    class Meta:
        model = StaffProfile
        fields = ['first_name', 'middle_name', 'last_name', 'gender', 'employee_number', 'date_of_birth', 'mobile_number','dob_day','dob_month','dob_year','address', ]


class StaffUpdateForm(forms.ModelForm):
    pass

