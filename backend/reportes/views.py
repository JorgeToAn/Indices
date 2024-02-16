from django.http import JsonResponse
# Create your views here.
from django.db.models import Count, F, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from registros.models import Ingreso, Egreso, Titulacion
from planes.models import Plan
from registros.periodos import calcularPeriodos

from decimal import Decimal

class ReportesNuevoIngreso(APIView):
    """
    Vista para listar la cantidad de alumnos de nuevo ingreso por carrera.

    * Requiere autenticación por token.

    ** nuevo-ingreso: Alumnos ingresando en 1er por examen o convalidacion
    ** traslado-equivalencia: Alumnos ingresando de otro TEC u otra escuela
    ** cohorte: El periodo donde empezara el calculo
    ** semestres: Cuantos semestres seran calculados desde el cohorte
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        nuevo_ingreso = request.GET.get('nuevo-ingreso')
        traslado_equivalencia = request.GET.get('traslado-equivalencia')
        cohorte = request.GET.get('cohorte') if request.GET.get('cohorte') else '20241'
        semestres = request.GET.get('semestres') if request.GET.get('semestres') else '9'

        tipos = []
        if nuevo_ingreso:
            tipos.extend(['EX', 'CO'])
        if traslado_equivalencia:
            tipos.extend(['TR', 'EQ'])

        response_data = {}
        periodos = calcularPeriodos(cohorte, int(semestres))
        planes = Plan.objects.values_list('clave', 'carrera')
        for plan in planes:
            for periodo in periodos:
                # nuevo_ing = Ingreso.objects.filter(tipo__in=tipos, periodo=periodo,alumno__plan__carrera__pk=plan).annotate(clave=F("alumno_id")
                #     ).values("clave")
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=periodo,alumno__plan__carrera__pk=plan[0]))
                nuevo_ingreso = Ingreso.objects.aggregate(poblacion=activos)
                response_data[plan[1]] = dict(poblacion=nuevo_ingreso['poblacion'], periodo=periodo)
        # for periodo in periodos:
        #     poblacion_qs = Ingreso.objects.filter(tipo__in=tipos, periodo=periodo).annotate(
        #         clave=F("alumno__plan__carrera__pk"), nombre=F("alumno__plan__carrera__nombre")
        #         ).values("clave", "nombre").annotate(poblacion=Count("alumno__plan__carrera"))
        #     poblacion_list = [entry for entry in poblacion_qs]
        #     response_data[periodo] = poblacion_list
        #     # filter(tipo__in=tipos, periodo=periodo, alumno__plan__carrera__pk=carrera).annotate(
        #     #     clave=F("alumno__plan__carrera__pk")
        #     #     ).values("clave").

        return Response(response_data)

