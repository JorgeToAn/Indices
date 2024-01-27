from django.db.models import Count, F
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from registros.models import Ingreso
from registros.periodos import calcularPeriodos

class TablasPoblacion(APIView):
    """
    Vista para listar la cantidad de alumnos por carrera.

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
        for periodo in periodos:
            # SELECT "planes_plan"."carrera_id" AS "clave", "carreras_carrera"."nombre" AS "nombre", COUNT("planes_plan"."carrera_id") AS "poblacion"
            # FROM "registros_ingreso"
            # INNER JOIN "alumnos_alumno" ON ("registros_ingreso"."alumno_id" = "alumnos_alumno"."no_control")
            # INNER JOIN "planes_plan" ON ("alumnos_alumno"."plan_id" = "planes_plan"."clave")
            # INNER JOIN "carreras_carrera" ON ("planes_plan"."carrera_id" = "carreras_carrera"."clave")
            # WHERE ("registros_ingreso"."periodo" = cohorte AND "registros_ingreso"."tipo" IN tipos)
            # GROUP BY "planes_plan"."carrera_id"
            poblacion_qs = Ingreso.objects.filter(tipo__in=tipos, periodo=periodo).annotate(
                clave=F("alumno__plan__carrera__pk"), nombre=F("alumno__plan__carrera__nombre")
                ).values("clave", "nombre").annotate(poblacion=Count("alumno__plan__carrera"))
            poblacion_list = [entry for entry in poblacion_qs]
            response_data[periodo] = poblacion_list

        return Response(response_data)