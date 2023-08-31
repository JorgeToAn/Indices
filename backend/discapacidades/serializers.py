from rest_framework import serializers
from .models import Discapacidad

class DiscapacidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discapacidad
        fields = '__all__'

    def validate_nombre(self, value):
        if Discapacidad.objects.filter(nombre=value.upper()).exists():
            raise serializers.ValidationError('Ya existe una discapacidad con este nombre')
        return value
