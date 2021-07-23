from django.shortcuts import render, redirect
from forms.cms import ChangeLogoForm, HomeCarouselForm
from .models import (
        SchoolLogo, HomeCarousel,
        Mission, Vision,
        SiteHeaderImage,
    )

#rest framework imports
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import generics
from rest_framework.renderers import BrowsableAPIRenderer,TemplateHTMLRenderer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

#serializer imports
from serializers.cms import (
        SchoolLogoSerializer, MissionSerializer,
        VisionSerializer, HomeCarouselSerializer,
        SiteHeaderImageSerializer,
    )

# Create your views here.


class SiteHeaderImage(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = SiteHeaderImageSerializer
    queryset = SiteHeaderImage.objects.all()




class HomeCarouselList(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = HomeCarouselSerializer
    queryset = HomeCarousel.objects.all()

class UpdateVision(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = VisionSerializer
    queryset = Vision.objects.all()


class UpdateMission(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = MissionSerializer
    queryset = Mission.objects.all()


class ChangeLogo(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = SchoolLogoSerializer
    queryset = SchoolLogo.objects.all()

def contentmanagement(request):
    # forms
    logoform = ChangeLogoForm()
    homecarouselform = HomeCarouselForm()

    # data
    carouselpics = HomeCarousel.objects.all()

    context = {
        'logoform': logoform,
        'homecarouselform': homecarouselform, 
        'carouselpics': carouselpics,
    }
    return render(request, 'cms/content-management.html', context)