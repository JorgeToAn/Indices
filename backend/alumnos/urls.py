from django.urls import path
from . import views

urlpatterns = [
    path('', views.AlumnoList.as_view(), name='alumno-list'),
    path('<int:pk>/', views.AlumnoDetail.as_view(), name='alumno-view'),
]