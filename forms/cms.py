from django import forms
from cms.models import SchoolLogo, HomeCarousel, Mission, Vision, SchoolOfficeHours, SchoolAddress


class ChangeLogoForm(forms.ModelForm):
    class Meta:
        model = SchoolLogo
        fields = "__all__"


class HomeCarouselForm(forms.ModelForm):
    class Meta:
        model = HomeCarousel
        fields = "__all__"



class MissionForm(forms.ModelForm):
    class Meta:
        model = Mission
        fields = '__all__'



class VisionForm(forms.ModelForm):
    class Meta:
        model = Vision
        fields = "__all__"


class SchoolOfficeHoursForm(forms.ModelForm):
    class Meta:
        model = SchoolOfficeHours
        fields = "__all__"


class SchoolAddressForm(forms.ModelForm):
    class Meta:
        model = SchoolAddress
        fields = "__all__"