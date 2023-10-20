from django.db import models

class Alumno(models.Model):

    no_control = models.CharField(primary_key=True, max_length=9, null=False, blank=False, verbose_name='número de control')
    curp = models.ForeignKey('personal.Personal', on_delete=models.PROTECT, verbose_name='curp')
    plan = models.ForeignKey('planes.Plan', on_delete=models.PROTECT, verbose_name='plan de estudios')

    REQUIRED_FIELDS = [
        'no_control',
        'curp',
        'plan',
    ]

    def save(self, *args, **kwargs):
        self.no_control = self.no_control.upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f'[{self.pk}] {self.no_control}'

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['no_control', 'curp'], name='unique_alumno')
        ]
