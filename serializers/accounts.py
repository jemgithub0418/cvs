from rest_framework import serializers
import sys
from accounts.models import User, StaffProfile, Blog
import datetime
from forms.accounts import generate_password, generate_username
from django.db import transaction
from django.contrib.auth.hashers import make_password
from django.utils.dateparse import parse_date

class CreateStaffUserSerializer(serializers.ModelSerializer):
    generated_password = generate_password()
    user_level_choices = [
        ('Teacher' , 'Teacher'),
        ('Registrar', 'Registrar'),
        ('Administrator' , 'Administrator'),
    ]
    userlevel = serializers.ChoiceField(
            choices=user_level_choices,
            label = "User Role",
            default = "Teacher",
            initial = "Teacher",
            write_only= True,
        )

    username    = serializers.CharField(
            read_only= True,
            default= ''
            )
    password = serializers.HiddenField(default = '')
    email = serializers.EmailField(required= True, allow_null= False)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email','userlevel', 'is_active', 'is_staff', 'is_student', 'is_teacher', 'is_registrar', 'is_superuser','last_login', 'date_joined',]
        read_only_fields = ('date_joined', 'last_login', 'is_active', 'is_staff', 'is_student', 'is_teacher', 'is_registrar', 'is_superuser')


class CreateProfileSerializer(serializers.ModelSerializer):
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

    user = CreateStaffUserSerializer(many= False)
    date_of_birth = serializers.DateField(
            read_only = True,
            default=today
        )
    middle_name = serializers.CharField(max_length= 70,allow_blank= True,)


    class Meta:
        model = StaffProfile
        fields = ['user','first_name', 'middle_name', 'last_name', 'gender', 'employee_number', 'date_of_birth', 'mobile_number','dob_month','dob_day','dob_year','address',]



    def set_dob(self, day, month, year):
        #adding value of date_of_birth in form
        day = day
        month = month
        year = year
        dob = f'{year}-{month}-{day}'
        return dob

    @transaction.atomic
    def create(self, validated_data):
        #for user
        user_data = validated_data.pop('user')
        user_data['is_staff'] = True

        if user_data['userlevel'] == 'Teacher':
            user_data['is_teacher'] = True

        if user_data['userlevel'] == 'Registrar':
            user_data['is_registrar'] = True

        if user_data['userlevel'] == 'Administrator':
            user_data['is_superuser'] = True

        removerole = user_data.pop('userlevel')
        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        username = generate_username(first_name, last_name)
        password = generate_password()
        user_data['username'] = username
        user_data['password'] = make_password(password)
        user = User.objects.create(**user_data)


        #for profile
        day = validated_data.get('dob_day')
        month = validated_data.get('dob_month')
        year = validated_data.get('dob_year')
        date_of_birth = self.set_dob(day, month, year)
        validated_data['date_of_birth'] = date_of_birth
        #remove data not in model
        day = validated_data.pop('dob_day')
        month = validated_data.pop('dob_month')
        year = validated_data.pop('dob_year')

        staff = StaffProfile.objects.create(user=user, **validated_data)
        print(sys.stderr, 'Username: ', username, 'Password', password)
        return staff


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username','email', 'last_login', 'date_joined','is_active', 'is_student', 'is_staff', 'is_teacher', 'is_registrar', 'is_superuser']


class UserListForProfileSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=True,allow_null= False, validators=[],)
    class Meta:
        model = User
        fields = ['id', 'username','email','last_login', 'date_joined','is_active', 'is_student', 'is_staff', 'is_teacher', 'is_registrar', 'is_superuser']
        read_only_fields = ('username','date_joined', 'last_login','is_active', 'is_student', 'is_staff', 'is_teacher', 'is_registrar', 'is_superuser')

class StaffProfileDetailSerializer(CreateProfileSerializer):
    user = UserListForProfileSerializer(many= False)
    date_of_birth = serializers.DateField(read_only= False)
    class Meta:
        model = StaffProfile
        fields = ['user','first_name', 'middle_name', 'last_name', 'gender', 'employee_number', 'date_of_birth', 'mobile_number','address',]
        read_only_fields = ('date_joined', 'last_login',)

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.get(id = instance.user.id)
        user.email = user_data.get('email', user.email)
        if User.objects.exclude(pk = instance.pk).filter(email__iexact=user.email):
            raise serializers.ValidationError("Email already taken.")
        if user.email == None or user.email == "":
            raise serializers.ValidationError("Please provide an email for the user.")
        user.save()

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.middle_name = validated_data.get('middle_name', instance.middle_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.employee_number = validated_data.get('employee_number', instance.employee_number)
        instance.mobile_number = validated_data.get('mobile_number', instance.mobile_number)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.address = validated_data.get('address', instance.address)
        instance.save()

        return instance


class UpdateStaffUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required= True, allow_null= False)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'is_staff', 'is_student', 'is_teacher', 'is_registrar', 'is_superuser','last_login', 'date_joined',]
        read_only_fields = ('date_joined', 'last_login', 'is_active', 'is_staff', 'is_student', 'is_teacher', 'is_registrar', 'is_superuser')


class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = '__all__'
