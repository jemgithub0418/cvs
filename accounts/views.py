from django.shortcuts import render, redirect
from forms import accounts
from django.contrib import messages
from forms.accounts import generate_password, generate_username
from .models import User, StaffProfile, Blog
from serializers.accounts import (
    StaffProfileDetailSerializer,
    CreateProfileSerializer,
    UserListSerializer,
    CreateStaffUserSerializer,
    UpdateStaffUserSerializer,
    BlogSerializer,
    )

#rest
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.renderers import BrowsableAPIRenderer,TemplateHTMLRenderer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


def register(request):
    # if request.method == 'POST':
    #     usercreationform = accounts.StaffCreationForm(request.POST)
    #     staffprofileform = accounts.StaffProfileCreationForm(request.POST)

    #     #adding value of date_of_birth in form
    #     dob_day = staffprofileform.data['dob_day']
    #     dob_month = staffprofileform.data['dob_month']
    #     dob_year = staffprofileform.data['dob_year']
    #     dob = f'{dob_year}-{dob_month}-{dob_day}'
    #     updated_request = request.POST.copy()
    #     updated_request['date_of_birth'] = dob
    #     staffprofileform = accounts.StaffProfileCreationForm(updated_request)

    #     #for auto generated password and username
    #     password = generate_password()
    #     first = updated_request['first_name']
    #     last = updated_request['last_name']
    #     generated_username = generate_username(first, last)
    #     updated_request['username'] = generated_username
    #     updated_request['password1'] = password
    #     updated_request['password2'] = password
    #     usercreationform = accounts.StaffCreationForm(updated_request)
    #     print(password)
    #     if usercreationform.is_valid() and staffprofileform.is_valid():
    #         user = usercreationform.save(commit = False)
    #         user.username = generated_username
    #         user.save()
    #         userprofile = staffprofileform.save(commit=False)
    #         userprofile.user = user
    #         userprofile.save()
    #         username = user.username
    #         messages.success(request, f'Account created for {username}!')
    #         return redirect('index')
    #     else:
    #         messages.error(request, "Invalid Form.")
    #         return redirect('accounts:register')

    # else:
    #     usercreationform = accounts.StaffCreationForm()
    #     staffprofileform = accounts.StaffProfileCreationForm()
    context = {
        'userform' : accounts.StaffCreationForm(),
        'userstaffprofile' : accounts.StaffProfileCreationForm(),
    }
    return render(request, 'accounts/register.html', context)


########################################################################## api overview ###########################################################################
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Profile List/Create': 'accounts/api/user/profile/create/', #this is for creating users. I need to create user object and profile object at the same time
        'User credentials Detail': 'accounts/api/user/detail/<int:id>/', #list lang to ng user objects (withour profile objects) pwede ka magupdate ng username dito at email
        'Profile Update' : 'accounts/api/user/profile/detail/<int:pk>/', #for updating profile object and user object pero email lang ung mauupdate dito
        'User List' : 'accounts/api/user/list/', #user list lang
        'Home Carousel Detail' : 'api/home-carousel/detail/<int:pk>/',
    }
    return Response(api_urls)


class UserProfileCreate(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = CreateProfileSerializer
    queryset = StaffProfile.objects.all()

class UserProfileDetail(generics.RetrieveUpdateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = StaffProfileDetailSerializer

    def get_queryset(self, *args, **kwargs):
        userid = self.request.user.id
        return StaffProfile.objects.filter(pk= userid)


class UserList(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserListSerializer


class UserUpdate(generics.RetrieveUpdateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = UpdateStaffUserSerializer

    def get_queryset(self, *args, **kwargs):
        userid = self.request.user.id
        return User.objects.filter(pk= userid)


class BlogCreate(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = BlogSerializer
    queryset = Blog.objects.all()
