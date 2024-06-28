from django.http import JsonResponse
# Create your views here.
from django.db.models import Count, F, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from registros.models import Ingreso, Egreso, Titulacion
from planes.models import Plan
from carreras.models import Carrera
from registros.periodos import calcularPeriodos, getPeriodoActual

from decimal import Decimal
from indices.views import obtenerPoblacionEgreso, obtenerPoblacionActiva, calcularTasa, calcularTipos

def calcularRegistros(tipo, semestre_inicio, semestre_final, lista_alumnos, periodos, poblacion_nuevo_ingreso):
    registros__semestres = {}
    for sem in range(semestre_inicio, semestre_final):
        egreso_periodo = obtenerPoblacionEgreso(lista_alumnos, periodos[sem])
        print(egreso_periodo)
        egreso_total = egreso_total + egreso_periodo['egresados']
        registros__semestres[sem+1] = dict(valor=egreso_periodo['egresados'])
    registros__semestres['total_%d' % 1 if semestre_final <= 12 else 2] = dict(valor=egreso_total)
    tasa_egreso = calcularTasa(egreso_total, poblacion_nuevo_ingreso)
    registros__semestres['tasa_egreso_%d' % 1 if semestre_final <= 12 else 2] = dict(valor="{tasa} %".format(tasa=tasa_egreso))

    return registros__semestres

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
        nuevo_ingreso = request.query_params.get('nuevo-ingreso')
        traslado_equivalencia = request.query_params.get('traslado-equivalencia')
        cohorte = request.query_params.get('cohorte') if request.query_params.get('cohorte') else getPeriodoActual()
        semestres = request.query_params.get('semestres') if request.query_params.get('semestres') else '9'

        tipos = []
        if nuevo_ingreso:
            tipos.extend(['EX', 'CO'])
        if traslado_equivalencia:
            tipos.extend(['TR', 'EQ'])

        response_data = {}
        periodos = calcularPeriodos(cohorte, int(semestres))
        planes = Carrera.objects.select_related('clave__plan').values_list('clave', 'plan', 'nombre')
        for plan in planes:
            plan_regs = {}
            for periodo in periodos:
                plan_regs[periodo] = dict(periodo=periodo)

                activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=periodo,alumno__plan__carrera__pk=plan[0]))
                nuevo_ingreso = Ingreso.objects.aggregate(poblacion=activos)
                plan_regs[periodo] = dict(poblacion=nuevo_ingreso['poblacion'], periodo=periodo)
            response_data[plan[2]] = plan_regs

        return Response(response_data)

class ReportesEgreso(APIView):
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
        nuevo_ingreso = request.query_params.get('nuevo-ingreso')
        traslado_equivalencia = request.query_params.get('traslado-equivalencia')
        cohorte = request.query_params.get('cohorte') if request.query_params.get('cohorte') else getPeriodoActual()
        semestres = request.query_params.get('semestres') if request.query_params.get('semestres') else '9'

        tipos = calcularTipos(nuevo_ingreso, traslado_equivalencia)

        response_data = {}
        periodos = calcularPeriodos(cohorte, int(semestres))
        carreras = Carrera.objects.select_related('clave__plan').values_list('clave', 'plan', 'nombre')
        for carrera in carreras:
            alumnos = Ingreso.objects.filter(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera[0]).annotate(clave=F("alumno_id")
                ).values("clave")
            poblacion_nuevo_ingreso = obtenerPoblacionActiva(tipos, alumnos, cohorte, carrera[0])
            if int(semestres) <= 12:
                egreso_total = 0
                for sem in range(8,int(semestres)):
                    egreso_periodo = obtenerPoblacionEgreso(alumnos, periodos[sem])
                    egreso_total = egreso_total + egreso_periodo['egresados']
                    registros__semestres[sem+1] = dict(hombres=egreso_periodo['hombres'], mujeres=egreso_periodo['mujeres'])
                registros__semestres['total_1'] = dict(valor=egreso_total)
                tasa_egreso = calcularTasa(egreso_total, poblacion_nuevo_ingreso['poblacion'])
                registros__semestres['tasa_egreso_1'] = dict(valor="{tasa} %".format(tasa=tasa_egreso))
            else:
                egreso_total = 0
                registros__semestres = {}

                for i in range(8,12):
                    egreso_periodo = obtenerPoblacionEgreso(alumnos, periodos[i])
                    egreso_total = egreso_total + egreso_periodo['egresados']
                    registros__semestres[i+1] = dict(hombres=egreso_periodo['hombres'], mujeres=egreso_periodo['mujeres'])
                registros__semestres['total_1'] = dict(valor=egreso_total)
                tasa_egreso = calcularTasa(egreso_total, poblacion_nuevo_ingreso['poblacion'])
                registros__semestres['tasa_egreso_1'] = dict(valor="{tasa} %".format(tasa=tasa_egreso))
                for i in range(12,int(semestres)):
                    egreso_periodo = obtenerPoblacionEgreso(alumnos, periodos[i])
                    egreso_total = egreso_total + egreso_periodo['egresados']
                    if i > 12:
                        registros__semestres[13]['hombres'] += egreso_periodo['hombres']
                        registros__semestres[13]['mujeres'] += egreso_periodo['mujeres']
                    else:
                        registros__semestres[13] = dict(hombres=egreso_periodo['hombres'], mujeres=egreso_periodo['mujeres'])
                tasa_egreso = calcularTasa(egreso_total, poblacion_nuevo_ingreso['poblacion'])
                registros__semestres['tasa_egreso_2'] = dict(valor="{tasa} %".format(tasa=tasa_egreso))
            response_data[carrera[2]] = dict(carrera=carrera[2],poblacion_nuevo_ingreso=poblacion_nuevo_ingreso , registros=registros__semestres)

        return Response(response_data)

class ReportesTitulacion(APIView):
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
        nuevo_ingreso = request.query_params.get('nuevo-ingreso')
        traslado_equivalencia = request.query_params.get('traslado-equivalencia')
        cohorte = request.query_params.get('cohorte') if request.query_params.get('cohorte') else getPeriodoActual()
        semestres = request.query_params.get('semestres') if request.query_params.get('semestres') else '9'

        tipos = []
        if nuevo_ingreso:
            tipos.extend(['EX', 'CO'])
        if traslado_equivalencia:
            tipos.extend(['TR', 'EQ'])

        response_data = {}
        periodos = calcularPeriodos(cohorte, int(semestres))
        carreras = Carrera.objects.select_related('clave__plan').values_list('clave', 'plan', 'nombre')
        for carrera in carreras:
            alumnos = Ingreso.objects.filter(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera[0]).annotate(clave=F("alumno_id")
                ).values("clave")
            activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera[0], alumno_id__in=alumnos))
            nuevo_ingreso = Ingreso.objects.aggregate(poblacion=activos)
            poblacion_nuevo_ingreso = nuevo_ingreso['poblacion']
            titulados_total = 0
            if int(semestres) <= 12:
                registros__semestres = {}
                for i in range(8,int(semestres)):
                    inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodos[i], alumno_id__in=alumnos))
                    titulados_periodo = Titulacion.objects.aggregate(titulados=inactivos)
                    titulados_total = titulados_total + titulados_periodo['titulados']
                    registros__semestres[i+1] = dict(valor=titulados_periodo['titulados'])
                registros__semestres['total_1'] = dict(valor=titulados_total)
                if poblacion_nuevo_ingreso > 0:
                    tasa_titulados = Decimal(titulados_total/poblacion_nuevo_ingreso)
                    tasa_titulados = round(tasa_titulados, 2)
                else:
                    tasa_titulados = 0
                registros__semestres['tasa_titulacion_1'] = dict(valor="{tasa_titulados} %".format(tasa_titulados=tasa_titulados))
            else:
                registros__semestres = {}
                for i in range(8,12):
                    inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodos[i], alumno_id__in=alumnos))
                    titulados_periodo = Titulacion.objects.aggregate(titulados=inactivos)
                    titulados_total = titulados_total + titulados_periodo['titulados']
                    registros__semestres[i+1] = dict(valor=titulados_periodo['titulados'])
                registros__semestres['total_1'] = dict(valor=titulados_total)
                if poblacion_nuevo_ingreso > 0:
                    tasa_titulados = Decimal(titulados_total/poblacion_nuevo_ingreso)
                    tasa_titulados = round(tasa_titulados, 2)
                else:
                    tasa_titulados = 0
                registros__semestres['tasa_titulacion_1'] = dict(valor="{tasa_titulados} %".format(tasa_titulados=tasa_titulados))
                for i in range(12,int(semestres)):
                    inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodos[i], alumno_id__in=alumnos))
                    titulados_periodo = Titulacion.objects.aggregate(titulados=inactivos)
                    titulados_total = titulados_total + titulados_periodo['titulados']
                    registros__semestres[i+1] = dict(valor=titulados_periodo['titulados'])
                registros__semestres['total_2'] = dict(valor=titulados_total)
                if poblacion_nuevo_ingreso > 0:
                    tasa_titulados = Decimal(titulados_total/poblacion_nuevo_ingreso)
                    tasa_titulados = round(tasa_titulados, 2)
                else:
                    tasa_titulados = 0
                registros__semestres['tasa_titulacion_2'] = dict(valor="{tasa_titulados} %".format(tasa_titulados=tasa_titulados))
            response_data[carrera[2]] = dict(poblacion_nuevo_ingreso=poblacion_nuevo_ingreso , registros=registros__semestres)

        return Response(response_data)
