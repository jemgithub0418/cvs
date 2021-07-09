from django.shortcuts import render
from forms.cms import ChangeLogoForm
from .models import SchoolLogo

# Create your views here.

def contentmanagement(request):
    return render(request, 'cms/content-management.html')

def changelogo(request):
    if request.method == "POST":
        form = ChangeLogoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
    else:
        form = ChangeLogoForm()
    context={
        'form': form,
    }
    return render(request, 'cms/change-logo.html', context)
