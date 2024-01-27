from carreras.models import Carrera
from registros.models import Ingreso
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

class TablasPoblacion(APIView):
    """
    Vista para listar la cantidad de alumnos por carrera.

    * Requiere autenticación por token.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        tipo = request.GET.get('tipo')
        semestres = request.GET.get('semestres')
        inicio = request.GET.get('inicio')
        final = request.GET.get('final')

        if tipo == 'nuevo-ingreso':
            return Response({ 'message': 'Nuevo ingreso'})
