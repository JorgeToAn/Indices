from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from backend.permissions import IsAdminUserOrReadOnly
from .serializers import CarreraSerializer
from .models import Carrera

class CarreraList(ListCreateAPIView):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class CarreraDetail(RetrieveUpdateDestroyAPIView):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

