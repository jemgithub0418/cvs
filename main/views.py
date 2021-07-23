from django.shortcuts import render
from cms.models import (
        SchoolLogo, HomeCarousel, 
        Mission, Vision, 
        ImageBesideMissionVision, SiteHeaderImage,
    )

# Create your views here.
def index(request):
    logo = SchoolLogo.objects.first()
    carousel_pics = HomeCarousel.objects.all()
    mission = Mission.objects.first()
    vision = Vision.objects.first()
    mnvimage = ImageBesideMissionVision.objects.first()
    header_image = SiteHeaderImage.objects.first()
    context= {
        'carousel_pics': carousel_pics,
        'mission': mission,
        'vision': vision,
        'mnvimage': mnvimage,
        'site_header_image': header_image,
    }
    return render(request, 'index.html', context)


