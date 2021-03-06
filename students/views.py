from django.shortcuts import render, get_object_or_404, get_list_or_404

from .models import (StudentGrade, Student, StudentProfile)
from serializers.students import CreateStudentProfileSerializer, CreateStudentInfoSerializer
from serializers.main import SubjectListCreateSerializer
from main.models import Subject, Section

#rest
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.renderers import BrowsableAPIRenderer,TemplateHTMLRenderer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from forms.students import StudentGradeForm


# Create your views here.
def mygrades(request, pk):
    student_grades = get_list_or_404(StudentGrade, student_id=pk)
    print(student_grades)
    context = {
        'student_grades' : student_grades,
    }
    return render(request,'students/mygrade.html',context)

def mystudents(request, pk):
    teacher_section = Section.objects.get(adviser_id=pk)

    my_students = Student.objects.filter(section=teacher_section).prefetch_related("enrolled_subjects").select_related(
        "section", "profile",
        )
    print(my_students[1].enrolled_subjects.all())
    # my_student = Student.objects.filter(section__section=)
    # my_students = Student.objects.filter(section__adviser_id=pk).select_related("section").prefetch_related("enrolled_subject")
    student_grade_form = StudentGradeForm()

    context = {
        "my_students" : my_students,
        "grade_form": student_grade_form,
    }
    return render(request, 'students/mystudents.html', context)


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

# wrong naming this should be StudentProfileDetails
class StudentProfileInfoDetail(generics.RetrieveUpdateAPIView):
    authentication_classes= [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CreateStudentProfileSerializer
    queryset = StudentProfile.objects.all()
    lookup_field = 'pk'

#for teachers access needs to have isTeacher permission
class StudentInfoDetails(generics.RetrieveUpdateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CreateStudentInfoSerializer
    queryset = Student.objects.all()
    lookup_field = 'pk'


class SubjectListCreate(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SubjectListCreateSerializer
    queryset = Subject.objects.all()
 

class SubjectGetUpdate(generics.RetrieveUpdateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SubjectListCreateSerializer
    queryset = Subject.objects.all()
    lookup_field = 'pk'