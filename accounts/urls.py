from django.urls import path
from accounts.views import (
    register, UserProfileCreate, UserProfileDetail, 
    UserList, UserUpdate, BlogCreate, register_student,
    )
from students.views import (AddNewStudent, AddStudentInfo)

app_name = 'accounts'

urlpatterns = [
    path('register/', register, name='register'),
    path('register/student/', register_student, name='register-student'),

    #student profile api
    path('api/student/profile/create/', AddNewStudent.as_view(), name='add-new-student'),
    path('api/student/info/create',  AddStudentInfo.as_view(), name='add-student-info'),

    #staff profile api
    path('api/user/profile/create/', UserProfileCreate.as_view(), name='userprofile-create'),
    path('api/user/profile/detail/<int:pk>/', UserProfileDetail.as_view(), name='userprofile-detail'),

    #user api
    path('api/user/list/', UserList.as_view(), name='user-list'),
    path('api/user/detail/<int:pk>/', UserUpdate.as_view(), name='user-update'),



    #sample lang
    path('api/blog/create/', BlogCreate.as_view(), name='blog-create'),

]
