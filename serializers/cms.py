from rest_framework import serializers
from cms.models import SchoolLogo

class SchoolLogoSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length= None, use_url= True)

    class Meta:
        model = SchoolLogo
        fields = ['id','image']

