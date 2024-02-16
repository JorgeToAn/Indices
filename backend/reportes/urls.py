from django.urls import path
from . import views

urlpatterns = [
    path('nuevo-ingreso/', views.ReportesNuevoIngreso.as_view(), name='nuevo-ingreso'),
]