from django.shortcuts import render, get_object_or_404, get_list_or_404

from .models import (StudentGrade, Student, StudentProfile)
from serializers.students import CreateStudentProfileSerializer, CreateStudentInfoSerializer


#rest
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.renderers import BrowsableAPIRenderer,TemplateHTMLRenderer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


# Create your views here.
def mygrades(request, pk):
    student_grades = get_list_or_404(StudentGrade, student_id=pk)
    print(student_grades)
    context = {
        'student_grades' : student_grades,
    }
    return render(request,'students/mygrade.html',context)


class AddNewStudent(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CreateStudentProfileSerializer
    queryset = StudentProfile.objects.all()

class AddStudentInfo(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CreateStudentInfoSerializer
    queryset = Student.objects.all()