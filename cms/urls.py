from django.urls import path, include
from cms import views as cms
urlpatterns = [
    path('', cms.contentmanagement, name ='cms' ),

    #logo api
    path('api/changelogo/', cms.ChangeLogo.as_view(), name='changelogo'), 
]
