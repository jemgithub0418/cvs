from .models import (
    SchoolLogo, SiteBackground,SchoolContactNumbers, SchoolAddress,
    SchoolEmail, SchoolOfficeHours,
    )

def add_data_to_base_template(request):
    logo = SchoolLogo.objects.first()
    sitebackground = SiteBackground.objects.first()
    contact_numbers = SchoolContactNumbers.objects.all()
    school_address = SchoolAddress.objects.all()
    school_email = SchoolEmail.objects.all()
    school_office_hours = SchoolOfficeHours.objects.all()

    context = {
        'logo':logo,
        'background': sitebackground,
        'contact_numbers': contact_numbers,
        'school_address': school_address,
        'school_email': school_email,
        'school_office_hours': school_office_hours,
    }

    return context

