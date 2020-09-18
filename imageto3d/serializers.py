from rest_framework import serializers
from .models import Imageto3d


class Imageto3dSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imageto3d
        fields = '__all__'
