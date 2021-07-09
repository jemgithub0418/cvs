from django.shortcuts import render
from cms.models import SchoolLogo


# Create your views here.
def index(request):
    logo = SchoolLogo.objects.first()
    context= {}
    return render(request, 'index.html', context)


