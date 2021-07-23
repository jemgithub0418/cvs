from django.urls import path, include
from cms import views as cms
urlpatterns = [
    path('', cms.contentmanagement, name ='cms' ),

    #logo api
    path('api/changelogo/', cms.ChangeLogo.as_view(), name='changelogo'), 

    #home carousel
    path('api/home-carousel/', cms.HomeCarouselList.as_view(), name='carosel-list'),

    #mission vision api
    path('api/update-mission/<int:pk>/', cms.UpdateMission.as_view(), name='update-mission'),
    path('api/update-vision/<int:pk>/', cms.UpdateVision.as_view(), name='update-vision'),

    #siteheaderimage
    path('api/site-header-image/<int:pk>/', cms.SiteHeaderImage.as_view(), name='site-header-image'),
]

