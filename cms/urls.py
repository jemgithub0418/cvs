from django.urls import path, include
from cms import views as cms
urlpatterns = [
    path('', cms.contentmanagement, name ='cms' ),
    path('change-logo/', cms.changelogo, name='change-logo'),
]
