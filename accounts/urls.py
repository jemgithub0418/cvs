from django.urls import path
from accounts.views import (
    register, UserProfileCreate, UserProfileDetail, 
    UserList, UserUpdate, BlogCreate, register_student,
    )
from students.views import (
        AddNewStudent, AddStudentInfo, StudentProfileInfoDetail, StudentInfoDetails,
        SubjectListCreate, SubjectGetUpdate,
    )
from main.views import SchoolPeriodList

app_name = 'accounts'

urlpatterns = [
    path('register/', register, name='register'),
    path('register/student/', register_student, name='register-student'),

    #student profile api
    path('api/student/profile/create/', AddNewStudent.as_view(), name='add-new-student'),
    path('api/student/profile/detail/<int:pk>/', StudentProfileInfoDetail.as_view(),name='student-profile-detail'),
    path('api/student/info/create/',  AddStudentInfo.as_view(), name='add-student-info'),
    path('api/student/info/details/<int:pk>', StudentInfoDetails.as_view(), name='student-info-detail'),

    #staff profile api
    path('api/user/profile/create/', UserProfileCreate.as_view(), name='userprofile-create'),
    path('api/user/profile/detail/<int:pk>/', UserProfileDetail.as_view(), name='userprofile-detail'),

    #subject api
    path('api/subject/list-create/', SubjectListCreate.as_view(), name='subject-list-create'),
    path('api/subject/get-update/<int:pk>/', SubjectGetUpdate.as_view(), name='subject-get-update'),

    #user api
    path('api/user/list/', UserList.as_view(), name='user-list'),
    path('api/user/detail/<int:pk>/', UserUpdate.as_view(), name='user-update'),

    #school period api
    path('api/school-period/list/', SchoolPeriodList.as_view(), name='school-period-list' ),

    #sample lang
    path('api/blog/create/', BlogCreate.as_view(), name='blog-create'),

]
