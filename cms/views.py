from django.shortcuts import render, redirect
from forms.cms import ChangeLogoForm, HomeCarouselForm
from .models import SchoolLogo, HomeCarousel

#rest framework imports
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, renderer_classes
from rest_framework import generics
from rest_framework.renderers import BrowsableAPIRenderer,TemplateHTMLRenderer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

#serializer imports
from serializers.cms import SchoolLogoSerializer

# Create your views here.


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

# def changelogo(request):
#     if request.method == "POST":
#         image = request.FILES.get('image')
#         new_logo = SchoolLogo(image=image)
#         new_logo.save()
#     else:
#         form = ChangeLogoForm()
#     return redirect('cms')
