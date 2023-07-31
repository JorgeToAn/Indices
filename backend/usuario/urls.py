from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', views.CustomTokenObtainPairView.as_view(), name='token_access'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registrar/', views.RegisterView.as_view(), name='registrar_usuario'),
    path('test/', views.test, name='test'),
    path('', views.getRoutes),
]