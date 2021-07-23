from django.contrib import admin
from .models import (
    SchoolLogo, HomeCarousel, Mission, Vision, ImageBesideMissionVision, 
    SiteBackground, SiteHeaderImage
    )

class SchoolLogoAdmin(admin.ModelAdmin):
    actions = ['change']
    def get_actions(self, request):
        actions = super().get_actions(request)
        actions.pop('delete_selected')
        return actions


class MissionAdmin(admin.ModelAdmin):

    def has_add_permission(self, request, obj= None):
        return False

    def has_delete_permission(self, request, obj= None ):
        return False

    # def get_actions(self, request):
    #     actions = super().get_actions(request)
    #     actions.pop('delete_selected')
    #     return actions


class VisionAdmin(admin.ModelAdmin):

    def has_add_permission(self, request, obj= None):
        return False

    def has_delete_permission(self, request, obj= None ):
        return False

    # def get_actions(self, request):
    #     actions = super().get_actions(request)
    #     actions.pop('delete_selected')
    #     return actions




# Register your models here.
admin.site.register(SchoolLogo, SchoolLogoAdmin)
admin.site.register(HomeCarousel)
admin.site.register(Mission, MissionAdmin)
admin.site.register(Vision, VisionAdmin)
admin.site.register(ImageBesideMissionVision)
admin.site.register(SiteBackground)
admin.site.register(SiteHeaderImage)