from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.conf import settings
from .models import (StudentGrade, Student, StudentProfile)
from serializers.students import (
    CreateStudentProfileSerializer, CreateStudentInfoSerializer,StudentGradesSerializer,

)
from serializers.main import SubjectListCreateSerializer
from main.models import Subject, Section, GradeCSVFile, SchoolPeriod
from students.models import StudentGrade, StudentProfile
from accounts.models import User
from forms.students import UploadCSVFileForm

import csv
from django.http import HttpResponse
#rest
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.renderers import BrowsableAPIRenderer,TemplateHTMLRenderer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from forms.students import StudentGradeForm, UploadCSVFileForm, SubjectForm


# Create your views here.
def mygrades(request, pk):
    period_form = UploadCSVFileForm()
    student_grades = get_list_or_404(StudentGrade, student_id=pk)

    context = {
        'student_grades' : student_grades,
        'period_form' : period_form,
    }
    return render(request,'students/mygrade.html',context)

def mystudents(request, pk):
    csv_form = UploadCSVFileForm()
    subject_for_template = SubjectForm(user= request.user)
    if request.method == "POST":
        csv_form = UploadCSVFileForm(request.POST or None, request.FILES or None)
        if csv_form.is_valid():
            period = csv_form.cleaned_data.get('period') #"First Grading"

            period = SchoolPeriod.objects.get(period = period)
            # save csv file
            uploaded_file = csv_form.cleaned_data.get('file_name')
            save_csv = GradeCSVFile.objects.create(file_name= uploaded_file)

            csv_file = GradeCSVFile.objects.get(grades_uploaded= False)
            csv_file.grades_uploaded = True
            csv_file.save()
            grade_list = []
            #read csv file
            with open(csv_file.file_name.path, 'r') as file:
                reader = csv.reader(file)

                for i, row in enumerate(reader):
                    if i == 0:
                        pass
                    else:
                        subject = Subject.objects.get(subject_name = row[3])
                        profile = get_object_or_404(StudentProfile, LRN_or_student_number = row[0])
                        # print(profile)

                        new_grade = StudentGrade(
                            student=  profile.student.student,#user instace
                            period = period,
                            subject = subject,
                            grade = row[4],
                            )

                        grade_list.append(new_grade)

                        # this is slow
                        # new_grade = StudentGrade.objects.create(
                        #     student=profile.student.student,
                        #     period = period,
                        #     subject = subject,
                        #     grade = row[4],
                        #     )
                new_grades = StudentGrade.objects.bulk_create(grade_list)



    teacher_section = Section.objects.get(adviser_id=pk)
    my_students = Student.objects.filter(section=teacher_section).prefetch_related("enrolled_subjects").select_related(
        "section", "profile", "student",
        )

    # my_student = Student.objects.filter(section__section=)
    # my_students = Student.objects.filter(section__adviser_id=pk).select_related("section").prefetch_related("enrolled_subject")
    student_grade_form = StudentGradeForm()

    context = {
        "my_students" : my_students,
        "grade_form": student_grade_form,
        "csv_form": csv_form,
        'subject_for_template': subject_for_template,
    }
    return render(request, 'students/mystudents.html', context)

def generatecsvfile(request, pk):
    if request.method == "POST":
        subject_form = SubjectForm(user= request.user, data=request.POST or None)
        if subject_form.is_valid():
            subject = subject_form.cleaned_data.get('subject')
            print(subject)

    response = HttpResponse(content_type = 'text/csv')
    section = Section.objects.get(adviser_id= pk)
    response['Content-Disposition'] = 'attachment; filename=myclass-'+ section.section_name +'.csv'

    students = Student.objects.filter(section__adviser_id= pk).prefetch_related("enrolled_subjects")
    section = Section.objects.get(adviser_id= pk)
    subjects = Subject.objects.filter(year_level = section.year_level)

    # this will be the template of the csv file
    # for student in students:
    #     for subject in student.enrolled_subjects.all():
    #         print(student.profile.LRN_or_student_number,student.profile.first_name, student.profile.last_name, subject.subject_name)

    # create csv writer
    writer = csv.writer(response)

    # add column heading to csv file
    heading_list =['LRN', 'First Name', 'Last Name','Subject', 'Grade']

    # add subjects of this section to the heading of the csv file
    # print(heading_list)

    writer.writerow(heading_list)

    for student in students:
        subject_list = student.enrolled_subjects.filter(student= student)
        for sub in subject_list:
            if sub.subject_name == subject.subject_name:
                writer.writerow([student.profile.LRN_or_student_number,student.profile.first_name, student.profile.last_name, sub.subject_name])

    return response


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


class StudentGradesDetail(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = StudentGrade.objects.all()
    serializer_class = StudentGradesSerializer

    def get_queryset(self):
        student_id = self.kwargs['pk']
        return StudentGrade.objects.filter(student_id= student_id)
