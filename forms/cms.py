from django import forms
from cms.models import SchoolLogo


class ChangeLogoForm(forms.ModelForm):
    class Meta:
        model = SchoolLogo
        fields = ["image"]
