from django.shortcuts import render, redirect
from django.shortcuts import get_object_or_404

# form imports
from forms.cms import (
        ChangeLogoForm, HomeCarouselForm, MissionForm, VisionForm,
        SchoolOfficeHoursForm, SchoolAddressForm,
    )

from .models import (
        SchoolLogo, HomeCarousel,
        Mission, Vision,
        SiteHeaderImage, SchoolOfficeHours, SchoolAddress,
        SchoolContactNumbers,

    )
from django.http import JsonResponse

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
        SiteHeaderImageSerializer,SchoolOfficeHoursSerializer,
        SchoolAddressSerializer, SchoolContactNumberSerializer,
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


class HomeCarouselDetail(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = HomeCarouselSerializer
    queryset = HomeCarousel.objects.all()

    # def patch(self, request, pk):
    #     carousel = self.get_queryset(pk)
    #     serializer = HomeCarouselSerializer(carousel, data= request.data, partial= True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(code=201, data= serializer.data)
    #     return JsonResponse(code= 400, data="Wrong input.")


class UpdateVision(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = VisionSerializer
    queryset = Vision.objects.all()


class UpdateMission(generics.RetrieveUpdateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = MissionSerializer
    queryset = Mission.objects.all()
    lookup_field = 'pk'


class ChangeLogo(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = SchoolLogoSerializer
    queryset = SchoolLogo.objects.all()


class UpdateSchoolOfficeHours(generics.RetrieveUpdateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = SchoolOfficeHoursSerializer
    queryset = SchoolOfficeHours.objects.all()
    lookup_field = 'pk'


class UpdateSchoolAddress(generics.RetrieveUpdateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = SchoolAddressSerializer
    queryset = SchoolAddress.objects.all()
    lookup_field = 'pk'


class UpdateSchoolContactNumber(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = SchoolContactNumberSerializer
    queryset = SchoolContactNumbers.objects.all()
    lookup_field = 'pk'


class SchoolContactNumberList(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAdminUser, IsAuthenticated]
    serializer_class = SchoolContactNumberSerializer
    queryset = SchoolContactNumbers.objects.all()


def contentmanagement(request):
    # data
    carouselpics = HomeCarousel.objects.all()
    mission = Mission.objects.first()
    vision = Vision.objects.first()
    office_hours = SchoolOfficeHours.objects.first()
    school_address = SchoolAddress.objects.first()
    school_contact_numbers = SchoolContactNumbers.objects.all()

    # forms
    logoform = ChangeLogoForm()
    homecarouselform = HomeCarouselForm()
    missionform = MissionForm({'mission': mission.mission})
    visionform = VisionForm({'vision': vision.vision})
    office_hours_form = SchoolOfficeHoursForm({
            'starting_day': office_hours.starting_day,
            'last_day' : office_hours.last_day,
            'opening' : office_hours.opening,
            'closing' : office_hours.closing,
        })
    school_address_form = SchoolAddressForm({
            'street' : school_address.street,
            'town' : school_address.town,
            'city' : school_address.city,
            'province' : school_address.province,
        })
    context = {
        'logoform': logoform,
        'homecarouselform': homecarouselform, 
        'carouselpics': carouselpics,
        'mission': mission,
        'vision' : vision,
        'missionform': missionform,
        'visionform': visionform,
        'office_hours': office_hours,
        'office_hours_form' : office_hours_form,
        'school_address' : school_address,
        'school_address_form' : school_address_form,
        'school_contact_numbers' : school_contact_numbers,
    }
    return render(request, 'cms/content-management.html', context)
