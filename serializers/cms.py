from rest_framework import serializers
from cms.models import (SchoolLogo, Mission, Vision, HomeCarousel, SiteHeaderImage)

class SchoolLogoSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length= None, use_url= True)

    class Meta:
        model = SchoolLogo
        fields = ['id','image']


class MissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mission
        fields = ['id', 'mission']


class VisionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vision
        fields = ['id', 'vision']


class HomeCarouselSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length=None, use_url= True)

    class Meta:
        model = HomeCarousel
        fields = ['id','image', 'label', 'content']


class SiteHeaderImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(max_length= 255, use_url= True)

    class Meta:
        model = SiteHeaderImage
        fields = ['id', 'image', 'caption']