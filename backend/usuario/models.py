from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
from django.db import models
import re

class Usuario(AbstractUser):
    class Gender(models.IntegerChoices):
        MALE = 0, _('Male')
        FEMALE = 1, _('Female')
        OTHER = 2, _('Other')

    def validate_name(value):
        match = re.search(r'^[A-ZÁÉÍÓÚÑÄËÏÖÜ ]+$', value.upper())
        if not match:
            raise ValidationError(
                _('Enter a valid name'),
                params={'value': value},
            )

    first_name = models.CharField(max_length=150, null=False, blank=False, validators=[validate_name])
    paternal_surname = models.CharField(max_length=150, null=False, blank=False, validators=[validate_name])
    maternal_surname = models.CharField(max_length=150, null=True, blank=False, validators=[validate_name])
    email = models.EmailField(null=False, blank=False, unique=True)
    gender = models.IntegerField(choices=Gender.choices, default=Gender.OTHER, null=False)

    REQUIRED_FIELDS = [
        'first_name',
        'paternal_surname',
        'email',
    ]

    def save(self, *args, **kwargs):
        self.first_name = self.first_name.upper()
        self.paternal_surname = self.paternal_surname.upper()
        self.maternal_surname = self.maternal_surname.upper() if self.maternal_surname else None
        self.email = self.email.lower()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.username}'

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