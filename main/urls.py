from django.urls import path, include
from main import views as main

urlpatterns = [
    path('', main.index, name='index'),
]
