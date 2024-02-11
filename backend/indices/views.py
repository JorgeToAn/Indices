from django.http import JsonResponse
# Create your views here.
from django.db.models import Count, F, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from registros.models import Ingreso, Egreso, Titulacion
from registros.periodos import calcularPeriodos

class IndicesPermanencia(APIView):
    """
    Vista para listar la cantidad de alumnos por carrera.

    * Requiere autenticación por token.

    ** nuevo-ingreso: Alumnos ingresando en 1er por examen o convalidacion
    ** traslado-equivalencia: Alumnos ingresando de otro TEC u otra escuela
    ** cohorte: El periodo donde empezara el calculo
    ** semestres: Cuantos semestres seran calculados desde el cohorte
    ** carrera: El programa educativo que se esta midiendo
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        nuevo_ingreso = request.GET.get('nuevo-ingreso')
        traslado_equivalencia = request.GET.get('traslado-equivalencia')
        cohorte = request.GET.get('cohorte') if request.GET.get('cohorte') else '20241'
        semestres = request.GET.get('semestres') if request.GET.get('semestres') else '9'
        carrera = request.GET.get('carrera')

        tipos = []
        if nuevo_ingreso:
            tipos.extend(['EX', 'CO'])
        if traslado_equivalencia:
            tipos.extend(['TR', 'EQ'])

        response_data = {}
        periodos = calcularPeriodos(cohorte, int(semestres))
        poblacion_nuevo_ingreso = 0
        alumnos = Ingreso.objects.filter(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera).annotate(clave=F("alumno_id")
            ).values("clave")
        alumnos_corte_anterior = 0
        for periodo in periodos:
            if periodo == cohorte:
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera, alumno_id__in=alumnos))
                poblacion_act = Ingreso.objects.aggregate(poblacion=activos)
                poblacion_nuevo_ingreso = poblacion_act['poblacion']
                alumnos_corte_anterior = poblacion_act['poblacion']
            else:
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno_id__in=alumnos))
                poblacion_act = Ingreso.objects.aggregate(poblacion=activos)
            inactivos = Count("alumno__plan__carrera__pk", filter=Q(alumno__plan__carrera__pk=carrera, alumno_id__in=alumnos))
            poblacion_egr = Egreso.objects.aggregate(egresados=inactivos)
            poblacion_titulo = Titulacion.objects.aggregate(titulados=inactivos)
            tasa_permanencia = (poblacion_act['poblacion']*100)/poblacion_nuevo_ingreso
            desercion = alumnos_corte_anterior - poblacion_act['poblacion'] - poblacion_egr['egresados']
            if desercion < 0:
                desercion = 0
            alumnos_corte_anterior = poblacion_act['poblacion']
            response_data[periodo] = dict(poblacion=poblacion_act['poblacion'], egresados=poblacion_egr['egresados'], titulados=poblacion_titulo['titulados'], desercion=desercion, tasa_permanencia=tasa_permanencia)
            # filter(tipo__in=tipos, periodo=periodo, alumno__plan__carrera__pk=carrera).annotate(
            #     clave=F("alumno__plan__carrera__pk")
            #     ).values("clave").

        return Response(response_data)

class IndicesEgreso(APIView):
    """
    Vista para listar la cantidad de alumnos por carrera.

    * Requiere autenticación por token.

    ** nuevo-ingreso: Alumnos ingresando en 1er por examen o convalidacion
    ** traslado-equivalencia: Alumnos ingresando de otro TEC u otra escuela
    ** cohorte: El periodo donde empezara el calculo
    ** semestres: Cuantos semestres seran calculados desde el cohorte
    ** carrera: El programa educativo que se esta midiendo
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        nuevo_ingreso = request.GET.get('nuevo-ingreso')
        traslado_equivalencia = request.GET.get('traslado-equivalencia')
        cohorte = request.GET.get('cohorte') if request.GET.get('cohorte') else '20241'
        semestres = request.GET.get('semestres') if request.GET.get('semestres') else '9'
        carrera = request.GET.get('carrera')

        tipos = []
        if nuevo_ingreso:
            tipos.extend(['EX', 'CO'])
        if traslado_equivalencia:
            tipos.extend(['TR', 'EQ'])

        response_data = {}
        periodos = calcularPeriodos(cohorte, int(semestres))
        poblacion_nuevo_ingreso = 0
        for periodo in periodos:
            # SELECT "planes_plan"."carrera_id" AS "clave", "carreras_carrera"."nombre" AS "nombre", COUNT("planes_plan"."carrera_id") AS "poblacion"
            # FROM "registros_ingreso"
            # INNER JOIN "alumnos_alumno" ON ("registros_ingreso"."alumno_id" = "alumnos_alumno"."no_control")
            # INNER JOIN "planes_plan" ON ("alumnos_alumno"."plan_id" = "planes_plan"."clave")
            # INNER JOIN "carreras_carrera" ON ("planes_plan"."carrera_id" = "carreras_carrera"."clave")
            # WHERE ("registros_ingreso"."periodo" = cohorte AND "registros_ingreso"."tipo" IN tipos)
            # GROUP BY "planes_plan"."carrera_id"
            activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=periodo, alumno__plan__carrera__pk=carrera))
            inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodo, alumno__plan__carrera__pk=carrera))
            poblacion_act = Ingreso.objects.aggregate(poblacion=activos)
            poblacion_egr = Egreso.objects.aggregate(egresados=inactivos)
            if periodo == cohorte:
                print(activos)
                poblacion_nuevo_ingreso = poblacion_act['poblacion']
                print(poblacion_nuevo_ingreso)
            tasa_egreso = (poblacion_egr['egresados']*100)/poblacion_nuevo_ingreso
            response_data[periodo] = dict(poblacion=poblacion_act['poblacion'], egresados=poblacion_egr['egresados'], tasa_egreso=tasa_egreso)
            # response_data[periodo] poblacion_egr
            # response_data[periodo] = poblacion_titulo
            # filter(tipo__in=tipos, periodo=periodo, alumno__plan__carrera__pk=carrera).annotate(
            #     clave=F("alumno__plan__carrera__pk")
            #     ).values("clave").

        return Response(response_data)

class IndicesTitulacion(APIView):
    """
    Vista para listar la cantidad de alumnos por carrera.

    * Requiere autenticación por token.

    ** nuevo-ingreso: Alumnos ingresando en 1er por examen o convalidacion
    ** traslado-equivalencia: Alumnos ingresando de otro TEC u otra escuela
    ** cohorte: El periodo donde empezara el calculo
    ** semestres: Cuantos semestres seran calculados desde el cohorte
    ** carrera: El programa educativo que se esta midiendo
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        nuevo_ingreso = request.GET.get('nuevo-ingreso')
        traslado_equivalencia = request.GET.get('traslado-equivalencia')
        cohorte = request.GET.get('cohorte') if request.GET.get('cohorte') else '20241'
        semestres = request.GET.get('semestres') if request.GET.get('semestres') else '9'
        carrera = request.GET.get('carrera')

        tipos = []
        if nuevo_ingreso:
            tipos.extend(['EX', 'CO'])
        if traslado_equivalencia:
            tipos.extend(['TR', 'EQ'])

        response_data = {}
        periodos = calcularPeriodos(cohorte, int(semestres))
        poblacion_nuevo_ingreso = 0
        for periodo in periodos:
            # SELECT "planes_plan"."carrera_id" AS "clave", "carreras_carrera"."nombre" AS "nombre", COUNT("planes_plan"."carrera_id") AS "poblacion"
            # FROM "registros_ingreso"
            # INNER JOIN "alumnos_alumno" ON ("registros_ingreso"."alumno_id" = "alumnos_alumno"."no_control")
            # INNER JOIN "planes_plan" ON ("alumnos_alumno"."plan_id" = "planes_plan"."clave")
            # INNER JOIN "carreras_carrera" ON ("planes_plan"."carrera_id" = "carreras_carrera"."clave")
            # WHERE ("registros_ingreso"."periodo" = cohorte AND "registros_ingreso"."tipo" IN tipos)
            # GROUP BY "planes_plan"."carrera_id"
            activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=periodo, alumno__plan__carrera__pk=carrera))
            inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodo, alumno__plan__carrera__pk=carrera))
            poblacion_act = Ingreso.objects.aggregate(poblacion=activos)
            poblacion_egr = Egreso.objects.aggregate(egresados=inactivos)
            poblacion_titulo = Titulacion.objects.aggregate(titulados=inactivos)
            if periodo == cohorte:
                print(activos)
                poblacion_nuevo_ingreso = poblacion_act['poblacion']
                print(poblacion_nuevo_ingreso)
            tasa_titulacion = (poblacion_titulo['titulados']*100)/poblacion_nuevo_ingreso
            response_data[periodo] = dict(poblacion=poblacion_act['poblacion'], egresados=poblacion_egr['egresados'], titulados=poblacion_titulo['titulados'], tasa_titulacion=tasa_titulacion)
            # response_data[periodo] poblacion_egr
            # response_data[periodo] = poblacion_titulo
            # filter(tipo__in=tipos, periodo=periodo, alumno__plan__carrera__pk=carrera).annotate(
            #     clave=F("alumno__plan__carrera__pk")
            #     ).values("clave").

        return Response(response_data)