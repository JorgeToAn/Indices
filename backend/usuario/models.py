from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
import re

class Usuario(AbstractUser):
    class Sexo(models.IntegerChoices):
        HOMBRE = 0, 'Hombre'
        MUJER = 1, 'Mujer'
        INDEFINIDO = 2, 'Indefinido'

    def validate_name(value):
        match = re.search(r'^[A-ZÁÉÍÓÚÑÄËÏÖÜ]+$', value.upper())
        if not match:
            raise ValidationError(
                f'{value} contiene caracteres que no son letras',
                params={'value': value},
            )

    first_name = models.CharField(verbose_name='nombre', max_length=150, null=False, blank=False, validators=[validate_name])
    last_name = models.CharField(verbose_name='apellido paterno', max_length=150, null=False, blank=False, validators=[validate_name])
    second_last_name = models.CharField(verbose_name='apellido materno', max_length=150, null=True, blank=False, validators=[validate_name])
    email = models.EmailField(verbose_name='correo electronico', null=False, blank=False, unique=True)
    sexo = models.IntegerField(choices=Sexo.choices, default=Sexo.INDEFINIDO, null=False)

    REQUIRED_FIELDS = [
        'first_name',
        'last_name',
        'email',
    ]

    def save(self, *args, **kwargs):
        self.first_name = self.first_name.upper()
        self.last_name = self.last_name.upper()
        self.second_last_name = self.second_last_name.upper() if self.second_last_name else None
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.username} | {self.email}'

    class Meta:
        permissions = [
            ('view_tablas_poblacion', 'Puede consultar Tablas de Poblacion'),
            ('view_tablas_crecimiento', 'Puede consultar Tablas de Crecimiento'),
            ('view_indices_permanencia', 'Puede consultar Indices de Permanencia'),
            ('view_indices_egreso', 'Puede consultar Indices de Egreso'),
            ('view_indices_titulacion', 'Puede consultar Indices de Titulacion'),
            ('view_indices_desercion', 'Puede consultar Indices de Desercion'),
            ('view_reportes_nuevo_ingreso', 'Puede consultar Reportes de Nuevo Ingreso'),
            ('view_reportes_egresados', 'Puede consultar Reportes de Egresados'),
            ('view_reportes_titulados', 'Puede consultar Reportes de Titulados'),
            ('view_cedulas_cacei', 'Puede consultar Cedulas de CACEI'),
            ('view_cedulas_caceca', 'Puede consultar Cedulas de CACECA'),
        ]