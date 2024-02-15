from django.urls import path, re_path
from . import views

urlpatterns = [
    path('ingresos/', views.IngresoList.as_view(), name='ingresos-list'),
    path('ingresos/<int:pk>/', views.IngresoDetail.as_view(), name='ingresos-detail'),
    re_path(r'ingresos/subir/(?P<filename>[^/]+)$', views.IngresoUpload.as_view(), name='ingresos-upload'),
    path('egresos/', views.EgresoList.as_view(), name='egresos-list'),
    path('egresos/<int:pk>/', views.EgresoDetail.as_view(), name='egresos-detail'),
    path('titulaciones/', views.TitulacionList.as_view(), name='titulaciones-list'),
    path('titulaciones/<int:pk>/', views.TitulacionDetail.as_view(), name='titulaciones-detail'),
    path('liberaciones-ingles/', views.LiberacionInglesList.as_view(), name='liberaciones-ingles-list'),
    path('liberaciones-ingles/<int:pk>/', views.LiberacionInglesDetail.as_view(), name='liberaciones-ingles-detail'),
]