from django.urls import path
from . import views

urlpatterns = [
    path('', views.PlanList.as_view(), name='plan-list'),
    path('<int:pk>/', views.PlanDetail.as_view(), name='plan-detail'),
        path('carreras/', views.CarreraPlanList.as_view(), name='carrera-plan-list'),

]