from django.urls import path, include
from .views import mygrades, mystudents

urlpatterns = [
    path('mygrade/<int:pk>/', mygrades, name='my-grades'),
    path('upload-grade/<int:pk>/', mystudents, name='my-students'),
]
