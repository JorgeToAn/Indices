from django.urls import path, re_path
from . import views

urlpatterns = [
    path('ingresos/', views.IngresoList.as_view(), name='ingresos-list'),
    path('ingresos/<int:pk>/', views.IngresoDetail.as_view(), name='ingresos-detail'),
    path('ingresos/subir/', views.IngresoUpload.as_view(), name='ingresos-upload'),
    path('egresos/', views.EgresoList.as_view(), name='egresos-list'),
    path('egresos/<int:pk>/', views.EgresoDetail.as_view(), name='egresos-detail'),
    path('egresos/subir/', views.EgresoUpload.as_view(), name='egresos-upload'),
    path('titulaciones/', views.TitulacionList.as_view(), name='titulaciones-list'),
    path('titulaciones/<int:pk>/', views.TitulacionDetail.as_view(), name='titulaciones-detail'),
    path('titulaciones/subir/', views.TitulacionUpload.as_view(), name='titulaciones-upload'),
    path('liberaciones-ingles/', views.LiberacionInglesList.as_view(), name='liberaciones-ingles-list'),
    path('liberaciones-ingles/<int:pk>/', views.LiberacionInglesDetail.as_view(), name='liberaciones-ingles-detail'),
    path('liberaciones-ingles/subir/', views.LiberacionInglesUpload.as_view(), name='liberaciones-ingles-upload'),
]