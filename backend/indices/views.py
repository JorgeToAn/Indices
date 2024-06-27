from django.http import JsonResponse
# Create your views here.
from django.db.models import Count, F, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from registros.models import Ingreso, Egreso, Titulacion
from registros.periodos import calcularPeriodos

from decimal import Decimal

def calcularTasaPermanencia(poblacion_activa, poblacion_nuevo_ingreso):
    if poblacion_nuevo_ingreso > 0:
        tasa_permanencia = Decimal((poblacion_activa*100)/poblacion_nuevo_ingreso)
        tasa_permanencia = round(tasa_permanencia, 2)
    else:
        tasa_permanencia = 0
    return tasa_permanencia

def calcularDesercion(alumnos_cohorte_anterior, poblacion_activa, egresados):
    desercion = alumnos_cohorte_anterior - poblacion_activa - egresados
    if desercion < 0:
        desercion = 0
    return desercion

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
                hombres = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte, alumno__plan__carrera__pk=carrera, alumno__curp__genero='H'))
                mujeres = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte, alumno__plan__carrera__pk=carrera, alumno__curp__genero='M'))
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera))
                poblacion_act = Ingreso.objects.aggregate(poblacion=activos, hombres=hombres, mujeres=mujeres)
                poblacion_nuevo_ingreso = poblacion_act['poblacion']
                alumnos_corte_anterior = poblacion_act['poblacion']
            else:
                hombres = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno__plan__carrera__pk=carrera, alumno__curp__genero='H'))
                mujeres = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno__plan__carrera__pk=carrera, alumno__curp__genero='M'))
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno_id__in=alumnos, alumno__plan__carrera__pk=carrera))
                poblacion_act = Ingreso.objects.aggregate(poblacion=activos, hombres=hombres, mujeres=mujeres)
            inactivos = Count("alumno__plan__carrera__pk", filter=Q(alumno_id__in=alumnos, periodo=periodo))
            hombres = Count("alumno__plan__carrera__pk", filter=Q(alumno_id__in=alumnos, periodo=periodo, alumno__curp__genero='H'))
            mujeres = Count("alumno__plan__carrera__pk", filter=Q(alumno_id__in=alumnos, periodo=periodo, alumno__curp__genero='M'))
            poblacion_egr = Egreso.objects.aggregate(egresados=inactivos, hombres=hombres, mujeres=mujeres)
            poblacion_titulo = Titulacion.objects.aggregate(titulados=inactivos, hombres=hombres, mujeres=mujeres)

            tasa_permanencia = calcularTasaPermanencia(poblacion_act['poblacion'], poblacion_nuevo_ingreso)
            desercion = calcularDesercion(alumnos_corte_anterior, poblacion_act['poblacion'], poblacion_egr['egresados'])
            alumnos_corte_anterior = poblacion_act['poblacion']
            response_data[periodo] = dict(hombres=poblacion_act['hombres'], mujeres=poblacion_act['mujeres'], hombres_egresados=poblacion_egr['hombres'], mujeres_egresadas=poblacion_egr['mujeres'], hombres_titulados=poblacion_titulo['hombres'], mujeres_tituladas=poblacion_titulo['mujeres'], desercion=desercion, tasa_permanencia=tasa_permanencia)
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
        tasa_egreso = 0
        alumnos = Ingreso.objects.filter(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera).annotate(clave=F("alumno_id")
            ).values("clave")
        for periodo in periodos:
            if periodo == cohorte:
                hombres = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte, alumno__plan__carrera__pk=carrera, alumno__curp__genero='H'))
                mujeres = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte, alumno__plan__carrera__pk=carrera, alumno__curp__genero='M'))
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera))
                poblacion_act = Ingreso.objects.aggregate(poblacion=activos, hombres=hombres, mujeres=mujeres)
                poblacion_nuevo_ingreso = poblacion_act['poblacion']
            else:
                hombres = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno__plan__carrera__pk=carrera, alumno__curp__genero='H'))
                mujeres = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno__plan__carrera__pk=carrera, alumno__curp__genero='M'))
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno_id__in=alumnos, alumno__plan__carrera__pk=carrera))
                poblacion_act = Ingreso.objects.aggregate(poblacion=activos, hombres=hombres, mujeres=mujeres)
            inactivos = Count("alumno__plan__carrera__pk", filter=Q(alumno_id__in=alumnos, alumno__plan__carrera__pk=carrera, periodo=periodo))
            hombres = Count("alumno__plan__carrera__pk", filter=Q(alumno_id__in=alumnos, periodo=periodo, alumno__curp__genero='H'))
            mujeres = Count("alumno__plan__carrera__pk", filter=Q(alumno_id__in=alumnos, periodo=periodo, alumno__curp__genero='M'))
            poblacion_egr = Egreso.objects.aggregate(egresados=inactivos, hombres=hombres, mujeres=mujeres)
            if poblacion_nuevo_ingreso > 0:
                tasa_egreso += Decimal((poblacion_egr['egresados']*100)/poblacion_nuevo_ingreso)
                tasa_egreso = round(tasa_egreso, 2)
            else:
                tasa_egreso = 0
            response_data[periodo] = dict(hombres=poblacion_act['hombres'], mujeres=poblacion_act['mujeres'], hombres_egresados=poblacion_egr['hombres'], mujeres_egresadas=poblacion_egr['mujeres'], tasa_egreso=tasa_egreso)
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
        tasa_titulacion = 0
        alumnos = Ingreso.objects.filter(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera).annotate(clave=F("alumno_id")
            ).values("clave")
        for periodo in periodos:
            if periodo == cohorte:
                hombres = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte, alumno__plan__carrera__pk=carrera, alumno__curp__genero='H'))
                mujeres = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte, alumno__plan__carrera__pk=carrera, alumno__curp__genero='M'))
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte, alumno__plan__carrera__pk=carrera))
                poblacion_act = Ingreso.objects.aggregate(poblacion=activos, hombres=hombres, mujeres=mujeres)
                poblacion_nuevo_ingreso = poblacion_act['poblacion']
            else:
                hombres = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno_id__in=alumnos, alumno__plan__carrera__pk=carrera, alumno__curp__genero='H'))
                mujeres = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno_id__in=alumnos, alumno__plan__carrera__pk=carrera, alumno__curp__genero='M'))
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno_id__in=alumnos, alumno__plan__carrera__pk=carrera))
                poblacion_act = Ingreso.objects.aggregate(poblacion=activos, hombres=hombres, mujeres=mujeres)
            inactivos = Count("alumno__plan__carrera__pk", filter=Q(alumno_id__in=alumnos, periodo=periodo))
            hombres = Count("alumno__plan__carrera__pk", filter=Q(alumno_id__in=alumnos, periodo=periodo, alumno__curp__genero='H'))
            mujeres = Count("alumno__plan__carrera__pk", filter=Q(alumno_id__in=alumnos, periodo=periodo, alumno__curp__genero='M'))
            poblacion_egr = Egreso.objects.aggregate(egresados=inactivos, hombres=hombres, mujeres=mujeres)
            poblacion_titulo = Titulacion.objects.aggregate(titulados=inactivos, hombres=hombres, mujeres=mujeres)
            if poblacion_nuevo_ingreso > 0:
                tasa_titulacion += Decimal((poblacion_titulo['titulados']*100)/poblacion_nuevo_ingreso)
                tasa_titulacion = round(tasa_titulacion, 2)
            else:
                tasa_titulacion = 0
            response_data[periodo] = dict(hombres=poblacion_act['hombres'], mujeres=poblacion_act['mujeres'], hombres_egresados=poblacion_egr['hombres'], mujeres_egresadas=poblacion_egr['mujeres'], hombres_titulados=poblacion_titulo['hombres'], mujeres_tituladas=poblacion_titulo['mujeres'], tasa_titulacion=tasa_titulacion)

        return Response(response_data)

class IndicesDesercion(APIView):
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
        desercion_total = 0
        alumnos = Ingreso.objects.filter(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera).annotate(clave=F("alumno_id")
            ).values("clave")
        alumnos_corte_anterior = 0
        egreso_anterior = 0
        for periodo in periodos:
            if periodo == cohorte:
                hombres = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, alumno_id__in=alumnos, periodo=cohorte,alumno__plan__carrera__pk=carrera, alumno__curp__genero='H'))
                mujeres = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, alumno_id__in=alumnos, periodo=cohorte,alumno__plan__carrera__pk=carrera, alumno__curp__genero='M'))
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, alumno_id__in=alumnos, periodo=cohorte,alumno__plan__carrera__pk=carrera))
                poblacion_act = Ingreso.objects.aggregate(poblacion=activos, hombres=hombres, mujeres=mujeres)

                poblacion_nuevo_ingreso = poblacion_act['poblacion']
                alumnos_corte_anterior = poblacion_act['poblacion']
            else:
                hombres = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', alumno_id__in=alumnos, periodo=periodo,alumno__plan__carrera__pk=carrera, alumno__curp__genero='H'))
                mujeres = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', alumno_id__in=alumnos, periodo=periodo,alumno__plan__carrera__pk=carrera, alumno__curp__genero='M'))
                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo='RE', periodo=periodo, alumno_id__in=alumnos, alumno__plan__carrera__pk=carrera))
                poblacion_act = Ingreso.objects.aggregate(poblacion=activos, hombres=hombres, mujeres=mujeres)

            inactivos = Count("alumno__plan__carrera__pk", filter=Q(alumno_id__in=alumnos, periodo=periodo, alumno__plan__carrera__pk=carrera))
            poblacion_egr = Egreso.objects.aggregate(egresados=inactivos)
            desercion = alumnos_corte_anterior - poblacion_act['poblacion'] - egreso_anterior
            if desercion < 0:
                desercion = 0
            desercion_total += desercion
            if poblacion_nuevo_ingreso > 0:
                tasa_desercion = Decimal((desercion_total*100)/poblacion_nuevo_ingreso)
                tasa_desercion = round(tasa_desercion, 2)
            else:
                tasa_desercion = 0
            alumnos_corte_anterior = poblacion_act['poblacion']
            egreso_anterior = poblacion_egr['egresados']
            response_data[periodo] = dict(hombres=poblacion_act['hombres'], mujeres=poblacion_act['mujeres'], egresados=poblacion_egr['egresados'], desercion=desercion, tasa_desercion=tasa_desercion)

        return Response(response_data)