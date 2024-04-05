from django.urls import path
from . import views

urlpatterns = [
    path('', views.CarreraList.as_view(), name='carrera-list'),
    path('<str:pk>/', views.CarreraDetail.as_view(), name='carrera-detail'),
]