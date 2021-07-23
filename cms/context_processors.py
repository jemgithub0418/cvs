from .models import SchoolLogo, SiteBackground

def add_data_to_base_template(request):
    logo = SchoolLogo.objects.first()
    sitebackground = SiteBackground.objects.first()

    context = {
        'logo':logo,
        'background': sitebackground,
    }

    return context