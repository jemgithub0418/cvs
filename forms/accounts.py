from django import forms
from accounts.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.db import transaction

class StaffCreationForm(UserCreationForm):
    user_level_choices = [('registrar', 'Registrar'),
                      ('teacher' , 'Teacher'), ('admin' , 'Administrator'), ]
    email = forms.EmailField(
        max_length=254, help_text='Required. Please provide a valid email address.')
    user_level = forms.ChoiceField(
        label='User Role', widget=forms.RadioSelect, choices=user_level_choices)

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ['username', 'password1', 'password2', 'email', 'user_level',]


    @transaction.atomic
    def save(self, commit = True):
        level = self.cleaned_data['user_level']
        user = super().save(commit= False)
        user.is_staff = True

        if level == 'registrar':
            user.is_registrar = True
        if level == 'teacher':
            user.is_teacher= True
        if level == 'admin':
            user.is_superuser= True
        if commit:
            user.save()
        return user



class StaffUpdateForm(forms.ModelForm):
    class Meta(StaffCreationForm.Meta):
        model = User
        fields = ['username', 'password', 'email', 'is_student',
                    'is_teacher', 'is_staff', 'is_registrar', 'is_superuser',]
        labels = {
            'is_student' : 'Student', 'is_teacher' : 'Teacher', 'is_staff': 'Staff', 'is_registrar' : 'Registrar', 'is_superuser' : 'Administrator',
        }
