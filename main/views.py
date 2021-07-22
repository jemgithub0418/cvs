from django.shortcuts import render
from cms.models import SchoolLogo, HomeCarousel

# Create your views here.
def index(request):
    logo = SchoolLogo.objects.first()
    carousel_pics = HomeCarousel.objects.all()
    context= {
        'carousel_pics': carousel_pics,
    }
    return render(request, 'index.html', context)


