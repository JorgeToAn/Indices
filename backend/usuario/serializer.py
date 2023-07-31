from .models import Usuario
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['second_last_name'] = user.second_last_name
        token['email'] = user.email
        token['sexo'] = user.sexo
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser
        token['groups'] = list(user.groups.values_list('name', flat = True))
        token['perms'] = list(user.get_all_permissions())

        return token

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'}, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Usuario
        fields = [
            'username',
            'first_name',
            'last_name',
            'second_last_name',
            'email',
            'sexo',
            'password',
            'password2'
        ]

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password': 'Los campos de contraseñas no son iguales'}
            )
        return attrs

    def create(self, validated_data):
        usuario = Usuario.objects.create(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            second_last_name=validated_data['second_last_name'],
            email=validated_data['email'],
            sexo=validated_data['sexo']
        )

        usuario.set_password(validated_data['password'])
        usuario.save()

        return usuario