from django.contrib import admin
from .models import UpcomingEvents, VerseOfTheDay, Announcements, AdmissionRequirements, TuitionFees

# Register your models here.

class UpcomingEventsAdmin(admin.ModelAdmin):
    pass

class VerseOfTheDayAdmin(admin.ModelAdmin):
    fieldsets= (
            ("", {'fields':('display_during', 'book', 'chapter', 'starting_verse', 'last_verse','content',)}),
        )
    readonly_fields = ['display_during',]

    def has_add_permission(self, request, obj= None):
        return False

    def has_delete_permission(self, request, obj= None ):
        return False

class AdmissionRequirementsAdmin(admin.ModelAdmin):

    def has_add_permission(self, request, obj= None):
        return False

    def has_delete_permission(self, request, obj= None ):
        return False



admin.site.register(UpcomingEvents, UpcomingEventsAdmin)
admin.site.register(Announcements)
admin.site.register(VerseOfTheDay, VerseOfTheDayAdmin)
admin.site.register(AdmissionRequirements, AdmissionRequirementsAdmin)
admin.site.register(TuitionFees)



