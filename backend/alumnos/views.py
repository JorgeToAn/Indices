from rest_framework.permissions import IsAuthenticated
from backend.permissions import IsAdminUserOrReadOnly
from rest_framework import generics
from .serializers import AlumnoSerializer
from .models import Alumno

class AlumnoList(generics.ListCreateAPIView):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class AlumnoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]