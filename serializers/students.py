from rest_framework import serializers
import sys
from accounts.models import User
from students.models import StudentProfile, Student, StudentGrade
from main.models import Subject, SchoolPeriod
import datetime
from forms.accounts import generate_password, generate_username
from django.db import transaction
from django.contrib.auth.hashers import make_password
from django.utils.dateparse import parse_date

class CreateStudentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
            read_only= True,
            default= "",
        )
    password = serializers.HiddenField(
            default= "",
        )
    email = serializers.EmailField(required= False, allow_blank= True)

    class Meta:
        model = User
        fields = [
            'id', 'username', 'password', 'email', 'is_active', 'is_student', 'last_login', 'date_joined',
        ]
        read_only_fields = ('date_joined', 'last_login','is_student', 'is_active', )


class CreateStudentInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields= [
            'id','student','enrolled_subjects', 'profile', 'section'
        ]


class CreateStudentProfileSerializer(serializers.ModelSerializer):
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

    dob_day = serializers.ChoiceField(
            write_only= True,
            choices=day_choices,
            label = 'Day',
            help_text= 'Day when you are born.',
            default= 1,
            initial= 1,
        )

    dob_month = serializers.ChoiceField(
            write_only= True,
            choices= month_choices,
            label= "Month",
            help_text= 'Month when you are born.',
            default= 1,
            initial= 1,
        )

    dob_year = serializers.ChoiceField(
            write_only= True,
            choices= year_choices,
            label="Year",
            default= year,
            help_text= 'Year when you are born.',
            initial= year,
        )

    user = CreateStudentSerializer(many= False)
    # student_info = CreateStudentInfoSerializer(many= False)
    middle_name = serializers.CharField(max_length= 55, allow_blank= True)
    contact_number = serializers.CharField(max_length= 15, allow_blank= True)
    date_of_birth = serializers.DateField(
            read_only= True,
            default= today,
        )
    # student_info = CreateStudentInfoSerializer(many= False, write_only= True)

    class Meta:
        model = StudentProfile
        fields = ['id',
            'user', 'first_name', 'middle_name', 'last_name', 'gender', 'LRN_or_student_number',
            'date_of_birth', 'dob_day', 'dob_month', 'dob_year', 'contact_number', 'address',
        ]

    def set_dob(self, day, month, year):
        #adding value of date_of_birth in form
        day = day
        month = month
        year = year
        dob = f'{year}-{month}-{day}'
        return dob

    @transaction.atomic
    def create(self, validated_data):
        #for student user creation with student user level
        user_data = validated_data.pop('user')
        user_data['is_student'] = True
        #removing userlevel data because it is not on the db its just there for validation of userlevel
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        middle_name = validated_data.get('middle_name')
        username = generate_username(first_name, last_name)
        password = generate_password()
        user_data['username'] = username
        user_data['password'] = make_password(password)
        #saving user
        user = User.objects.create(**user_data)


        #for profile date of birth
        day = validated_data.get('dob_day')
        month = validated_data.get('dob_month')
        year = validated_data.get('dob_year')
        date_of_birth = self.set_dob(day, month, year)
        validated_data['date_of_birth'] = date_of_birth
        #remove data not in model but in post data
        day = validated_data.pop('dob_day')
        month = validated_data.pop('dob_month')
        year = validated_data.pop('dob_year')

        #saving user
        student = StudentProfile.objects.create(user=user, **validated_data)
        #print password and username on serverlog
        print(sys.stderr,"Username: ", username, "Password: ", password)
        return student


class SchoolPeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model= SchoolPeriod
        fields= ['id', 'period']


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = [
            'id', 'subject_name', 'subject_code', 'year_level', 'unit',
        ]


class StudentGradesSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(many= False)
    period = SchoolPeriodSerializer(many=False)

    class Meta:
        model = StudentGrade
        fields = ['id', 'student', 'period', 'subject', 'grade']