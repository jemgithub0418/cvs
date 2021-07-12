from django.contrib import admin
from .models import SchoolLogo

class SchoolLogoAdmin(admin.ModelAdmin):
    actions = ['change']
    def get_actions(self, request):
        actions = super().get_actions(request)
        actions.pop('delete_selected')
        return actions

# Register your models here.
admin.site.register(SchoolLogo, SchoolLogoAdmin)
