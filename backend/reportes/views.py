from django.http import JsonResponse
# Create your views here.
from django.db.models import Count, F, Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

from registros.models import Ingreso, Egreso, Titulacion
from planes.models import Plan
from carreras.models import Carrera
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
        carreras = Carrera.objects.select_related('clave__plan').values_list('clave', 'plan', 'nombre')
        for carrera in carreras:
            alumnos = Ingreso.objects.filter(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera[0]).annotate(clave=F("alumno_id")
                ).values("clave")
            activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera[0], alumno_id__in=alumnos))
            nuevo_ingreso = Ingreso.objects.aggregate(poblacion=activos)
            poblacion_nuevo_ingreso = nuevo_ingreso['poblacion']
            if int(semestres) <= 12:
                egreso_total = 0
                semestres_regs = {}
                for i in range(8,int(semestres)):
                    inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodos[i], alumno_id__in=alumnos))
                    egreso_periodo = Egreso.objects.aggregate(egresados=inactivos)
                    egreso_total = egreso_total + egreso_periodo['egresados']
                    semestres_regs[i+1] = dict(valor=egreso_periodo['egresados'])
                semestres_regs['total_1'] = dict(valor=egreso_total)
                if poblacion_nuevo_ingreso > 0:
                    tasa_egreso = Decimal(egreso_total/poblacion_nuevo_ingreso)
                    tasa_egreso = round(tasa_egreso, 2)
                else:
                    tasa_egreso = 0
                semestres_regs['tasa_egreso_1'] = dict(valor="{tasa} %".format(tasa=tasa_egreso))
            else:
                egreso_total = 0
                semestres_regs = {}
                for i in range(8,12):
                    inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodos[i], alumno_id__in=alumnos))
                    egreso_periodo = Egreso.objects.aggregate(egresados=inactivos)
                    egreso_total = egreso_total + egreso_periodo['egresados']
                    semestres_regs[i+1] = dict(valor=egreso_periodo['egresados'])
                semestres_regs['total_1'] = dict(valor=egreso_total)
                if poblacion_nuevo_ingreso > 0:
                    tasa_egreso = Decimal(egreso_total/poblacion_nuevo_ingreso)
                    tasa_egreso = round(tasa_egreso, 2)
                else:
                    tasa_egreso = 0
                semestres_regs['tasa_egreso_1'] = dict(valor="{tasa} %".format(tasa=tasa_egreso))
                for i in range(12,int(semestres)):
                    inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodos[i], alumno_id__in=alumnos))
                    egreso_periodo = Egreso.objects.aggregate(egresados=inactivos)
                    egreso_total = egreso_total + egreso_periodo['egresados']
                    semestres_regs[i+1] = dict(valor=egreso_periodo['egresados'])
                semestres_regs['total_2'] = dict(valor=egreso_total)
                if poblacion_nuevo_ingreso > 0:
                    tasa_egreso = Decimal(egreso_total/poblacion_nuevo_ingreso)
                    tasa_egreso = round(tasa_egreso, 2)
                else:
                    tasa_egreso = 0
                semestres_regs['tasa_egreso_2'] = dict(valor="{tasa} %".format(tasa=tasa_egreso))
            response_data[carrera[2]] = dict(carrera=carrera[2],poblacion_nuevo_ingreso=poblacion_nuevo_ingreso , registros=semestres_regs)

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
        carreras = Carrera.objects.select_related('clave__plan').values_list('clave', 'plan', 'nombre')
        for carrera in carreras:
            alumnos = Ingreso.objects.filter(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera[0]).annotate(clave=F("alumno_id")
                ).values("clave")
            activos = Count("alumno__plan__carrera__pk", filter=Q(tipo__in=tipos, periodo=cohorte,alumno__plan__carrera__pk=carrera[0], alumno_id__in=alumnos))
            nuevo_ingreso = Ingreso.objects.aggregate(poblacion=activos)
            poblacion_nuevo_ingreso = nuevo_ingreso['poblacion']
            titulados_total = 0
            if int(semestres) <= 12:
                semestres_regs = {}
                for i in range(8,int(semestres)):
                    inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodos[i], alumno_id__in=alumnos))
                    titulados_periodo = Titulacion.objects.aggregate(titulados=inactivos)
                    titulados_total = titulados_total + titulados_periodo['titulados']
                    semestres_regs[i+1] = dict(valor=titulados_periodo['titulados'])
                semestres_regs['total_1'] = dict(valor=titulados_total)
                if poblacion_nuevo_ingreso > 0:
                    tasa_titulados = Decimal(titulados_total/poblacion_nuevo_ingreso)
                    tasa_titulados = round(tasa_titulados, 2)
                else:
                    tasa_titulados = 0
                semestres_regs['tasa_titulacion_1'] = dict(valor="{tasa_titulados} %".format(tasa_titulados=tasa_titulados))
            else:
                semestres_regs = {}
                for i in range(8,12):
                    inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodos[i], alumno_id__in=alumnos))
                    titulados_periodo = Titulacion.objects.aggregate(titulados=inactivos)
                    titulados_total = titulados_total + titulados_periodo['titulados']
                    semestres_regs[i+1] = dict(valor=titulados_periodo['titulados'])
                semestres_regs['total_1'] = dict(valor=titulados_total)
                if poblacion_nuevo_ingreso > 0:
                    tasa_titulados = Decimal(titulados_total/poblacion_nuevo_ingreso)
                    tasa_titulados = round(tasa_titulados, 2)
                else:
                    tasa_titulados = 0
                semestres_regs['tasa_titulacion_1'] = dict(valor="{tasa_titulados} %".format(tasa_titulados=tasa_titulados))
                for i in range(12,int(semestres)):
                    inactivos = Count("alumno__plan__carrera__pk", filter=Q(periodo=periodos[i], alumno_id__in=alumnos))
                    titulados_periodo = Titulacion.objects.aggregate(titulados=inactivos)
                    titulados_total = titulados_total + titulados_periodo['titulados']
                    semestres_regs[i+1] = dict(valor=titulados_periodo['titulados'])
                semestres_regs['total_2'] = dict(valor=titulados_total)
                if poblacion_nuevo_ingreso > 0:
                    tasa_titulados = Decimal(titulados_total/poblacion_nuevo_ingreso)
                    tasa_titulados = round(tasa_titulados, 2)
                else:
                    tasa_titulados = 0
                semestres_regs['tasa_titulacion_2'] = dict(valor="{tasa_titulados} %".format(tasa_titulados=tasa_titulados))
            response_data[carrera[2]] = dict(poblacion_nuevo_ingreso=poblacion_nuevo_ingreso , registros=semestres_regs)

        return Response(response_data)
