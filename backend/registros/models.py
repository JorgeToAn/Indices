from django.core.exceptions import ValidationError
from django.db import models
import datetime, re

class BaseRegistro(models.Model):
    def validate_registro(value):
        match = re.search(r'^[0-9]{4}[1-3]$', value)
        if not match:
            raise ValidationError(
                'Formato inválido para periodo',
                params={'value': value}
            )
        today = datetime.date.today()
        current_year = today.year
        input_year = int(value[0:4])
        print(current_year, input_year)
        if input_year > current_year:
            raise ValidationError(
                'Periodo inválido, debe ser del año presente o anterior',
                params={'value': value}
            )

    periodo = models.CharField(max_length=5, null=False, blank=False, validators=[validate_registro])
    alumno = models.ForeignKey('alumnos.Alumno', on_delete=models.CASCADE, verbose_name='alumno')

    def __str__(self):
        return f'[{self.pk}] {self.alumno.no_control} en {self.periodo}'

    class Meta:
        abstract = True
        constraints = [
            models.UniqueConstraint(fields=['alumno', 'periodo'], name='unique_%(class)s')
        ]

class Ingreso(BaseRegistro):
    class TiposIngresos(models.TextChoices):
        EXAMEN = 'EX', 'Examen'
        EQUIVALENCIA = 'EQ', 'Equivalencia'
        TRASLADO = 'TR', 'Traslado'
        CONVALIDACION = 'CO', 'Convalidación'
        REINGRESO = 'RE', 'Reingreso'

    tipo = models.CharField(max_length=2, choices=TiposIngresos.choices, default=TiposIngresos.EXAMEN, null=False, blank=False)

    def save(self, *args, **kwargs):
        if not self.pk:
            exclusive_tipos = [
                Ingreso.TiposIngresos.EXAMEN.value,
                Ingreso.TiposIngresos.EQUIVALENCIA.value,
                Ingreso.TiposIngresos.TRASLADO.value,
                Ingreso.TiposIngresos.CONVALIDACION.value
            ]
            if self.tipo in exclusive_tipos and Ingreso.objects.filter(alumno=self.alumno, tipo__in=exclusive_tipos):
                raise ValidationError('Solo puede existir un ingreso de EXAMEN, EQUIVALENCIA, TRASLADO o CONVALIDACION')
        super(Ingreso, self).save(*args, **kwargs)


class Egreso(BaseRegistro):
    def save(self, *args, **kwargs):
        if not self.pk and Egreso.objects.filter(alumno=self.alumno).exists():
            raise ValidationError('Solo puede existir un egreso por alumno')
        super(Egreso, self).save(*args, **kwargs)

class Titulacion(BaseRegistro):
    class TiposTitulaciones(models.TextChoices):
        TESIS = 'TE', 'Tesis'
        RESIDENCIA = 'RE', 'Residencia'
        DUAL = 'DU', 'Modelo Dual'

    tipo = models.CharField(max_length=2, choices=TiposTitulaciones.choices, default=TiposTitulaciones.RESIDENCIA, null=False, blank=False)

    def save(self, *args, **kwargs):
        if not self.pk and Titulacion.objects.filter(alumno=self.alumno).exists():
            raise ValidationError('Solo puede existir una titulacion por alumno')
        elif not Egreso.objects.filter(alumno=self.alumno).exists():
            raise ValidationError('No se puede crear una titulacion sin un egreso existente')
        super(Titulacion, self).save(*args, **kwargs)

    class Meta(BaseRegistro.Meta):
        verbose_name = 'titulación'
        verbose_name_plural = 'titulaciones'

class LiberacionIngles(BaseRegistro):
    def save(self, *args, **kwargs):
        if not self.pk and LiberacionIngles.objects.filter(alumno=self.alumno).exists():
            raise ValidationError('Solo puede existir una liberacion de ingles por alumno')
        super(LiberacionIngles, self).save(*args, **kwargs)

    class Meta(BaseRegistro.Meta):
        verbose_name = 'liberación de inglés'
        verbose_name_plural = 'liberaciones de inglés'
