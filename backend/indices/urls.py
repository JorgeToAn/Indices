from django.urls import path
from . import views

urlpatterns = [
    path('permanencia/', views.IndicesPermanencia.as_view(), name='permanencia'),
]