from django.urls import path, include
from cms import views as cms

urlpatterns = [
    path('', cms.contentmanagement, name ='cms' ),

    #logo api
    path('api/changelogo/', cms.ChangeLogo.as_view(), name='changelogo'), 

    #home carousel
    path('api/home-carousel/', cms.HomeCarouselList.as_view(), name='carousel-list'),
    path('api/home-carousel/detail/<int:pk>/', cms.HomeCarouselDetail.as_view(), name = 'carousel-detail'),
    path('api/home-carousel/delete/<int:pk>/', cms.HomeCarouselDetail.as_view(), name = 'carousel-delete'),
    path('api/home-carousel/add/', cms.HomeCarouselList.as_view(), name= 'carousel-add'),

    #mission vision api
    path('api/update-mission/<int:pk>/', cms.UpdateMission.as_view(), name='update-mission'),
    path('api/update-vision/<int:pk>/', cms.UpdateVision.as_view(), name='update-vision'),

    #siteheaderimage
    path('api/site-header-image/<int:pk>/', cms.SiteHeaderImage.as_view(), name='site-header-image'),

    #contactus
    path('api/office-hours/update/<int:pk>/', cms.UpdateSchoolOfficeHours.as_view(), name='update-school-office-hours'),
    path('api/school-address/update/<int:pk>/', cms.UpdateSchoolAddress.as_view(), name='update-school-address'),
    path('api/school-contact-number/list/', cms.SchoolContactNumberList.as_view(), name='school-contact-number-list'),
    path('api/school-contact-number/update/<int:pk>/', cms.UpdateSchoolContactNumber.as_view(), name='update-school-contact-number'),

]

