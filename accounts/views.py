from django.shortcuts import render, redirect
from forms import accounts
from django.contrib import messages
from forms.accounts import generate_password, generate_username


def register(request):
    if request.method == 'POST':
        usercreationform = accounts.StaffCreationForm(request.POST)
        staffprofileform = accounts.StaffProfileCreationForm(request.POST)

        #adding value of date_of_birth in form
        dob_day = staffprofileform.data['dob_day']
        dob_month = staffprofileform.data['dob_month']
        dob_year = staffprofileform.data['dob_year']
        dob = f'{dob_year}-{dob_month}-{dob_day}'
        updated_request = request.POST.copy()
        updated_request['date_of_birth'] = dob
        staffprofileform = accounts.StaffProfileCreationForm(updated_request)

        #for auto generated password and username
        password = generate_password()
        first = updated_request['first_name']
        last = updated_request['last_name']
        generated_username = generate_username(first, last)
        updated_request['username'] = generated_username
        updated_request['password1'] = password
        updated_request['password2'] = password
        usercreationform = accounts.StaffCreationForm(updated_request)
        print(password)
        if usercreationform.is_valid() and staffprofileform.is_valid():
            user = usercreationform.save(commit = False)
            user.username = generated_username
            user.save()
            userprofile = staffprofileform.save(commit=False)
            userprofile.user = user
            userprofile.save()
            username = user.username
            messages.success(request, f'Account created for {username}!')
            return redirect('index')
        else:
            messages.error(request, "Invalid Form.")
            return redirect('accounts:register')

    else:
        usercreationform = accounts.StaffCreationForm()
        staffprofileform = accounts.StaffProfileCreationForm()
    context = {
        'userform' : usercreationform,
        'userstaffprofile' : staffprofileform
    }
    return render(request, 'accounts/register.html', context)


def index(request):
    return render(request, 'index.html')
