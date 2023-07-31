from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializer import CustomTokenObtainPairSerializer, RegisterSerializer
from .models import Usuario

import json

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/usuario/token/',
        '/usuario/registrar/',
        '/usuario/token/refrescar/',
        '/usuario/test/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def test(request):
    if request.method == 'GET':
        data = f'Hola {request.user.username}, la API responde a tu petición GET'
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        try:
            body = request.body.decode('utf-8')
            data = json.loads(body)
            if 'text' not in data:
                return Response('Invalid JSON data', status.HTTP_400_BAD_REQUEST)
            text = data.get('text')
            data = f'Tu petición POST con text: {text}'
            return Response({'response': data}, status=status.HTTP_200_OK)
        except json.JSONDecodeError:
            return Response('Datos JSON inválidos', status=status.HTTP_400_BAD_REQUEST)
    return Response('Datos JSON inválidos', status=status.HTTP_400_BAD_REQUEST)