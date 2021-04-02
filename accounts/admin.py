from django.contrib import admin
from .models import User, StaffProfile
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin
from forms import accounts


class UserAdmin(UserAdmin):
    add_form = accounts.UserCreationForm
    add_fieldsets = (
        ('Personal Info', {
            'description': '',
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', ),
        }),
        ('User Type', {'fields': ('is_active', 'is_registrar',
                                  'is_teacher', 'is_superuser', 'is_student',)}),
    )
    fieldsets = (
        ('Personal Info', {
            'description': '',
            'classes': ('wide',),
            'fields': ('email', 'username', 'password',),
        }),
        ('User Role', {'fields': ('is_active', 'is_registrar',
                                  'is_teacher', 'is_superuser', 'is_student',)}),
    )

    list_display = ('username', 'email', 'is_active',)
    list_display_links = ('username', 'email',)
    list_filter = ('is_active',)  # removed is_student here


admin.site.register(User, UserAdmin)
admin.site.register(StaffProfile)
admin.site.unregister(Group)
