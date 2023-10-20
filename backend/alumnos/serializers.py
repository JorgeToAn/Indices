from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Alumno

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset = Alumno.objects.all(),
                fields = ['no_control', 'curp']
            )
        ]
