from rest_framework import serializers
from main.models import Subject, SchoolPeriod

class SubjectListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = [
            'id','subject_name', 'subject_code', 'year_level', 'unit',
        ]


class SchoolPeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = SchoolPeriod
        fields = ['id','period']
    #         subject_name = models.CharField(max_length=255)
    # subject_code = models.CharField(max_length= 55)
    # year_level = models.ForeignKey(YearLevel, on_delete=models.CASCADE, null= True, blank= True)
    # unit = models.PositiveSmallIntegerField()