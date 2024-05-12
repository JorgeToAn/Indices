from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from backend.permissions import IsAdminUserOrReadOnly, CanViewCarrera
from .serializers import CarreraSerializer
from .models import Carrera
from guardian.shortcuts import get_objects_for_user, assign_perm, remove_perm, get_perms


class CarreraList(ListCreateAPIView):
    # queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]
    def get_queryset(self):
        user = self.request.user
        queryset = get_objects_for_user(user, 'ver_carrera', klass=Carrera)
        return queryset

class CarreraListAll(ListCreateAPIView):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class CarreraDetail(RetrieveUpdateDestroyAPIView):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly&CanViewCarrera]

class AsignarPermisos(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        clave = request.GET.get('pk')
        carrera = Carrera.objects.get(clave=clave)
        print(carrera)
        user = request.user
        assign_perm('ver_carrera', user, carrera)
        if user.has_perm('ver_carrera', carrera):
            print('Hola')
            return Response(status=200, data={'message': 'Permiso asignado'})
        else:
            return Response(status=400, data={'message': 'Permiso no asignado'})

class RemoverPermisos(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        clave = request.GET.get('pk')
        carrera = Carrera.objects.get(clave=clave)
        user = request.user
        remove_perm('ver_carrera', user, carrera)
        print(get_perms(user, carrera))
        if not user.has_perm('ver_carrera', carrera):
            print('Hola')
            return Response(status=200, data={'message': 'Permiso removido'})
        else:
            return Response(status=400, data={'message': 'Permiso no removido'})