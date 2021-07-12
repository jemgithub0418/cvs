from django.shortcuts import render, redirect
from forms.cms import ChangeLogoForm
from .models import SchoolLogo
# Create your views here.



def contentmanagement(request):
    logoform = ChangeLogoForm()
    context = {
        'logoform': logoform,
    }
    return render(request, 'cms/content-management.html', context)

def changelogo(request):
    if request.method == "POST":
        image = request.FILES.get('image')
        new_logo = SchoolLogo(image=image)
        new_logo.save()
    else:
        form = ChangeLogoForm()
    return redirect('cms')
