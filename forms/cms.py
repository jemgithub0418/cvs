from django import forms
from cms.models import SchoolLogo, HomeCarousel


class ChangeLogoForm(forms.ModelForm):
    class Meta:
        model = SchoolLogo
        fields = "__all__"


class HomeCarouselForm(forms.ModelForm):
    class Meta:
        model = HomeCarousel
        fields = "__all__"