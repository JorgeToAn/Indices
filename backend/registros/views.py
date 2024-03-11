from rest_framework.permissions import IsAuthenticated, IsAdminUser
from backend.permissions import IsAdminUserOrReadOnly

from rest_framework import generics, views
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.db.models import Q

from .serializers import IngresoSerializer, EgresoSerializer, TitulacionSerializer, LiberacionInglesSerializer
from .models import Ingreso, Egreso, Titulacion, LiberacionIngles
from .periodos import getPeriodoActual

from personal.models import Personal, obtenerFechaNac, obtenerGenero
from alumnos.models import Alumno
from carreras.models import Carrera
from planes.models import Plan

import openpyxl
import re

### INGRESO
class IngresoList(generics.ListCreateAPIView):
    queryset = Ingreso.objects.all()
    serializer_class = IngresoSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class IngresoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Ingreso.objects.all()
    serializer_class = IngresoSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

# FORMATO DE EXCEL [CURP, NO_CONTROL, PATERNO, MATERNO, NOMBRE, CARRERA, (PERIODO+TIPO)]
class IngresoUpload(views.APIView):
    parser_classes = [FileUploadParser]
    permission_classes = [IsAuthenticated&IsAdminUser]

    def post(self, request, format=None):
        try:
            file_obj = request.data['file']
            wb = openpyxl.load_workbook(file_obj, data_only=True)
            ws = wb.active

            results = {"errors": [], "created": 0}
            header_row = ws[1]
            for row in ws.iter_rows(min_row=2):
                row_dict = row_to_dict(header_row, row)

                try:
                    personal, _ = Personal.objects.get_or_create(
                        pk=row_dict['curp'],
                        paterno=row_dict['paterno'],
                        materno=row_dict['materno'],
                        nombre=row_dict['nombre'],
                        fecha_nacimiento=obtenerFechaNac(row_dict['curp']),
                        genero=obtenerGenero(row_dict['curp']),
                    )
                    carrera = Carrera.objects.get(pk=row_dict['carrera'])
                    plan = Plan.objects.filter(carrera=carrera).last()
                    alumno, _ = Alumno.objects.get_or_create(no_control=row_dict['no_control'], curp=personal, plan=plan)
                    if alumno.plan.carrera.clave != row_dict['carrera']:
                        raise Exception(f'Carrera en archivo no concuerda con el plan registrado del alumno {alumno.no_control}')

                    for periodo, tipo in row_dict['periodos']:
                        if not Ingreso.objects.filter(alumno=alumno, periodo=periodo, tipo=tipo).exists():
                            ingreso = Ingreso(alumno=alumno, periodo=periodo, tipo=tipo)
                            ingreso.save()
                            results['created'] += 1
                except Exception as ex:
                    results['errors'].append({'type': str(type(ex)), 'message': str(ex), 'row_index': row[0].row})
                    continue
            return Response(status=200, data=results)
        except Exception as e:
            error_message = str(e)
            return Response(status=500, data={'message': error_message})

### EGRESO
class EgresoList(generics.ListCreateAPIView):
    queryset = Egreso.objects.all()
    serializer_class = EgresoSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class EgresoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Egreso.objects.all()
    serializer_class = EgresoSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

# FORMATO DE EXCEL [NO_CONTROL, PERIODO]
class EgresoUpload(views.APIView):
    parser_classes = [FileUploadParser]
    permission_classes = [IsAuthenticated&IsAdminUser]

    def post(self, request, format=None):
        try:
            file_obj = request.data['file']
            wb = openpyxl.load_workbook(file_obj, data_only=True)
            ws = wb.active

            results = { 'errors':[], 'created':0 }
            header_row = ws[1]
            for row in ws.iter_rows(min_row=2):
                row_dict = row_to_dict(header_row, row)
                try:
                    alumno = Alumno.objects.get(pk=row_dict['no_control'])
                    for periodo, _ in row_dict['periodos']:
                        if not Egreso.objects.filter(periodo=periodo, alumno=alumno).exists():
                            egreso = Egreso(periodo=periodo, alumno=alumno)
                            egreso.save()
                            results['created'] += 1
                except Exception as ex:
                    results['errors'].append({'type': str(type(ex)), 'message': str(ex), 'row_index': row[0].row})
                    continue
            return Response(status=200, data=results)
        except Exception as e:
            error_message = str(e)
            return Response(status=500, data={'message': error_message})

### TITULACION
class TitulacionList(generics.ListCreateAPIView):
    queryset = Titulacion.objects.all()
    serializer_class = TitulacionSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class TitulacionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Titulacion.objects.all()
    serializer_class = TitulacionSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

# FORMATO DE EXCEL [NO_CONTROL, (PERIODO+TIPO)]
class TitulacionUpload(views.APIView):
    parser_classes = [FileUploadParser]
    permission_classes = [IsAuthenticated&IsAdminUser]

    def post(self, request, format=None):
        try:
            file_obj = request.data['file']
            wb = openpyxl.load_workbook(file_obj, data_only=True)
            ws = wb.active

            results = { 'errors':[], 'created':0 }
            header_row = ws[1]
            for row in ws.iter_rows(min_row=2):
                row_dict = row_to_dict(header_row, row)
                try:
                    alumno = Alumno.objects.get(pk=row_dict['no_control'])
                    for periodo, tipo in row_dict['periodos']:
                        if not Titulacion.objects.filter(periodo=periodo, alumno=alumno).exists():
                            titulacion = Titulacion(periodo=periodo, alumno=alumno, tipo=tipo)
                            titulacion.save()
                            results['created'] += 1
                except Exception as ex:
                    results['errors'].append({'type': str(type(ex)), 'message': str(ex), 'row_index': row[0].row})
                    continue
            return Response(status=200, data=results)
        except Exception as e:
            error_message = str(e)
            return Response(status=500, data={'message': error_message})

### LIBERACION DE INGLES
class LiberacionInglesList(generics.ListCreateAPIView):
    queryset = LiberacionIngles.objects.all()
    serializer_class = LiberacionInglesSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class LiberacionInglesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = LiberacionIngles.objects.all()
    serializer_class = LiberacionInglesSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

# FORMATO DE EXCEL [NO_CONTROL, PERIODO]
class LiberacionInglesUpload(views.APIView):
    parser_classes = [FileUploadParser]
    permission_classes = [[IsAuthenticated&IsAdminUser]]

    def post(self, request, format=None):
        try:
            file_obj = request.data['file']
            wb = openpyxl.load_workbook(file_obj, data_only=True)
            ws = wb.active

            results = { 'errors':[], 'created':0 }
            header_row = ws[1]
            for row in ws.iter_rows(min_row=2):
                row_dict = row_to_dict(header_row, row)
                try:
                    alumno = Alumno.objects.get(pk=row_dict['no_control'])
                    for periodo, _ in row_dict['periodos']:
                        if not LiberacionIngles.objects.filter(periodo=periodo, alumno=alumno).exists():
                            liberacion = LiberacionIngles(periodo=periodo, alumno=alumno)
                            liberacion.save()
                            results['created'] += 1
                except Exception as ex:
                    results['errors'].append({'type': str(type(ex)), 'message': str(ex), 'row_index': row[0].row})
                    continue
            return Response(status=200, data=results)
        except Exception as e:
            error_message = str(e)
            return Response(status=500, data={'message': error_message})

### CORTE
@api_view
@permission_classes([IsAuthenticated&IsAdminUser])
def corte(request):
    periodo = getPeriodoActual()
    if not Ingreso.objects.contiene_corte(periodo) and not Egreso.objects.contiene_corte(periodo) and not Titulacion.objects.contiene_corte(periodo) and not LiberacionIngles.objects.contiene_corte(periodo):
        ingresos = Ingreso.objects.realizar_corte(periodo)
        egresos = Egreso.objects.realizar_corte(periodo)
        titulaciones = Titulacion.objects.realizer_corte(periodo)
        liberaciones = LiberacionIngles.objects.realizar_corte(periodo)
        return Response(status=200, data={'periodo': periodo, 'updated': {'ingresos': ingresos, 'egresos': egresos, 'titulaciones': titulaciones, 'liberaciones-ingles': liberaciones}})
    else:
        return Response(status=400, data={'periodo': periodo ,'message': f'No se puede realizar un corte ya que existen registros que pertenecen a un corte para el periodo {periodo}.'})

# Lee un renglon de excel y lo convierte a un diccionario de acuerdo a los campos del header_row
def row_to_dict(header_row, data_row):
    keywords = ['curp', 'no_control', 'paterno', 'materno', 'nombre', 'carrera']
    row_dict = {'periodos': []}
    for cell in data_row:
        index = cell.column - 1
        header = str(header_row[index].value).lower()
        value = str(cell.value) if cell.value else None
        if header in keywords:
            row_dict[header] = value
        elif re.match(r'^[12][0-9]{3}[13]$', header):
            if value: row_dict['periodos'].append((header, value[0:2]))
        else:
            raise Exception(f'Campo "{header}" no es reconocido')
    # ordenar periodos por fecha
    row_dict['periodos'].sort(key=lambda x: x[0])
    return row_dict