from django.urls import path, include
from .views import mygrades, mystudents, generatecsvfile

urlpatterns = [
    path('mygrade/<int:pk>/', mygrades, name='my-grades'),
    path('upload-grade/<int:pk>/', mystudents, name='my-students'),
    path('generate-csv-file/<int:pk>/', generatecsvfile, name= 'generate-csv-for-my-class'),
]
