from django.urls import path
from accounts import views as accounts_views

app_name = 'accounts'

urlpatterns = [
    path('register/', accounts_views.register, name='register'),
]
