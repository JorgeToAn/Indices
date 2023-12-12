from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from backend.permissions import IsAdminUserOrReadOnly
from .serializers import PlanSerializer
from .models import Plan


class PlanList(ListCreateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class PlanDetail(RetrieveUpdateDestroyAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]

class CarreraPlanList(ListCreateAPIView):
    queryset = Plan.objects.select_related('carrera')
    serializer_class =  PlanSerializer
    # permission_classes = [IsAuthenticated&IsAdminUserOrReadOnly]