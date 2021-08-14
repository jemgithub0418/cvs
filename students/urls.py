from django.urls import path, include
from .views import mygrades

urlpatterns = [
    path('mygrade/<int:pk>/', mygrades, name='my-grades'),
]
