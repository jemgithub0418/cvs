from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from accounts.models import User, StaffProfile
from students.models import StudentProfile
from main.models import Subject, Section

import datetime

class StudentCreationForm(UserCreationForm):
    email = forms.EmailField(max_length= 255,)

    class Meta:
        model = User
        fields = ['email']


class StudentProfileCreationForm(forms.ModelForm):
    contanct_number = forms.CharField(label="puking ina mo",widget=forms.TextInput(attrs={'placeholder': "917 123 1234",}), max_length=15)
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
        model = StudentProfile
        fields = ['first_name', 'middle_name', 'last_name', 'gender', 'LRN_or_student_number','contact_number', 'date_of_birth','dob_day','dob_month','dob_year','address', ]


class StudentInfoForm(forms.Form):
    section = forms.ModelChoiceField(
        required= True,
        widget= forms.Select,
        queryset = Section.objects.select_related('year_level').all(),
        # empty_label = None,
        )
    enrolled_subjects = forms.ModelMultipleChoiceField(
        required= True,
        widget= forms.CheckboxSelectMultiple,
        queryset= Subject.objects.prefetch_related('year_level').all(),
        # empty_label= None,
        )