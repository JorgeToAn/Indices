from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.db import models
import re

class Personal(models.Model):
    class Gender(models.TextChoices):
        MALE = 'H', _('Hombre')
        FEMALE = 'M', _('Mujer')
        OTHER = 'X', _('Otro')

    def validate_curp(value):
        match = re.search(r'^[A-Z][AEIOU][A-Z]{2}\d{2}(((0[13578]|1[02])(0[1-9]|[1-2]\d|30|31))|((0[469]|11)(0[1-9]|[1-2]\d|30))|(02)(0[1-9]|[1-2]\d))(H|M)(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)([B-DF-HJ-NP-TV-Z]{3})[A-Z0-9]\d$', value.upper())
        if not match:
            raise ValidationError(
                _('Enter a valid CURP'),
                params={'value': value},
            )

    def validate_solo_letras(value):
        match = re.search(r'^[A-ZÁÉÍÓÚÑÄËÏÖÜ ]+$', value.upper())
        if not match:
            raise ValidationError(
                _('Enter a value formed only by letters'),
                params={'value': value},
            )

    curp = models.CharField(verbose_name='CURP', primary_key=True, max_length=18, blank=False, validators=[validate_curp])
    nombre = models.CharField(max_length=150, null=False, blank=False, validators=[validate_solo_letras])
    paterno = models.CharField(verbose_name=_('apellido paterno'), max_length=150, null=False, blank=False, validators=[validate_solo_letras])
    materno = models.CharField(verbose_name=_('apellido materno'), max_length=150, null=True, blank=True, validators=[validate_solo_letras])
    fecha_nacimiento = models.DateField(null=False, blank=False)
    genero = models.CharField(choices=Gender.choices, default=Gender.OTHER, max_length=1, null=False)
    discapacidades = models.ManyToManyField('discapacidades.Discapacidad', related_name='discapacidades', blank=True)
    habla_lengua_indigena = models.BooleanField(default=False)

    REQUIRED_FIELDS = [
        'curp',
        'nombre',
        'paterno',
        'fecha_nacimiento',
    ]

    def save(self, *args, **kwargs):
        self.curp = self.curp.upper()
        self.nombre = self.nombre.upper()
        self.paterno = self.paterno.upper()
        self.materno = self.materno.upper() if self.materno else None
        super().save(*args, **kwargs)

    def __str__(self):
        fullname = f'{self.nombre} {self.paterno}'
        if self.materno:
            fullname += f' {self.materno}'
        return f'[{self.pk}] {fullname}'

    class Meta:
        verbose_name = 'información personal'
        verbose_name_plural = 'informaciones personales'
