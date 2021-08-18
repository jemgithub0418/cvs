from django.urls import path, include
from main import views as main

urlpatterns = [
    path('', main.index, name='index'),
    path('admission/requirements/', main.admission, name='admission'),
    path('admission/tuition/', main.tuition, name='tuition'),
]
