from .models import SchoolLogo

def add_data_to_base_template(request):
    logo = SchoolLogo.objects.first()

    context = {
        'logo':logo,
    }

    return context