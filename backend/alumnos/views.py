from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from backend.permissions import IsAdminUserOrReadOnly
from .serializers import AlumnoSerializer, HistorialSerializer
from .models import Alumno


class AlumnoList(generics.ListCreateAPIView):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class AlumnoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class HistorialList(generics.ListAPIView):
    queryset = Alumno.objects.all()
    serializer_class = HistorialSerializer
    permission_classes = [IsAuthenticated]

class HistorialDetail(generics.RetrieveAPIView):
    queryset = Alumno.objects.all()
    serializer_class = HistorialSerializer
    permission_classes = [IsAuthenticated]
