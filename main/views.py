from django.shortcuts import render
import sys
from django.db.models import Q
import datetime
from cms.models import (
        SchoolLogo, HomeCarousel, 
        Mission, Vision, 
        ImageBesideMissionVision, SiteHeaderImage,
    )
from .models import  UpcomingEvents, VerseOfTheDay, Announcements, AdmissionRequirements, TuitionFees, SchoolPeriod

from serializers.main import SchoolPeriodSerializer

#rest
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.renderers import BrowsableAPIRenderer,TemplateHTMLRenderer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

# Create your views here.
def index(request):
    day = datetime.datetime.today()
    logo = SchoolLogo.objects.first()
    carousel_pics = HomeCarousel.objects.all()
    mission = Mission.objects.first()
    vision = Vision.objects.first()
    mnvimage = ImageBesideMissionVision.objects.first()
    header_image = SiteHeaderImage.objects.first()
    events = UpcomingEvents.objects.filter(Q(date_of_event__gte= datetime.date.today())).order_by('date_of_event')
    announcements = Announcements.objects.all().order_by('-date_posted')

    # this is how you print on dev server
    # print(sys.stderr, announcements)

    verse = VerseOfTheDay.objects.filter(display_during = day.weekday()+1)
    context= {
        'carousel_pics': carousel_pics,
        'mission': mission,
        'vision': vision,
        'mnvimage': mnvimage,
        'site_header_image': header_image,
        'events' : events,
        'verse' : verse,
        'announcements': announcements,
    }
    return render(request, 'index.html', context)


def admission(request):
    requirements = AdmissionRequirements.objects.first()
    context = {
        'requirements' : requirements,
    }
    return render(request,'main/admission.html', context)


def tuition(request):
    tuition_fee_objects = TuitionFees.objects.first()
    context = {
        'tuition_fee_objects' : tuition_fee_objects,
    }
    return render(request, 'main/tuition.html', context)


class SchoolPeriodList(generics.ListAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = SchoolPeriodSerializer
    queryset = SchoolPeriod.objects.all()
