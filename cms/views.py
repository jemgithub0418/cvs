from django.shortcuts import render
from forms.cms import ChangeLogoForm
from .models import SchoolLogo
import os

# Create your views here.

def contentmanagement(request):
    return render(request, 'cms/content-management.html')

def changelogo(request):
    form = ChangeLogoForm()
    if request.method == "POST":
        current_logo = SchoolLogo.objects.all()
        if current_logo.count() > 0 :
            current_logo.delete()
        else:
            pass
        if form.is_valid():
            form = ChangeLogoForm(request.FILES)
            form.save()
    context={
        'form': form,
    }
    return render(request, 'cms/change-logo.html', context)
