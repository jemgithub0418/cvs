from django.shortcuts import render
from forms import accounts
from django.contrib import messages


def register(request):
    if request.method == 'POST':
        usercreationform = accounts.StaffCreationForm(request.POST)
        if usercreationform.is_valid():
            user = usercreationform.save()

            username = usercreationform.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')
    else:
        usercreationform = accounts.StaffCreationForm()
    context = {
        'userform' : usercreationform
    }
    return render(request, 'accounts/register.html', context)


def index(request):
    return render(request, 'index.html')
