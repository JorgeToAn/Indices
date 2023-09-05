from django.db import models

class Plan(models.Model):

    clave = models.CharField(max_length=150, unique=True, null=False, blank=False)
    fecha_inicio = models.DateField(null=False, blank=False)
    fecha_final = models.DateField(null=True, blank=False)

    REQUIRED_FIELDS = [
        'clave',
        'fecha_inicio',
    ]

    def __str__(self):
        f'[{self.pk}] {self.clave}'

    def save(self, *args, **kwargs):
        self.clave = self.clave.upper()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'plan de estudios'
        verbose_name_plural = 'planes de estudios'
        constraints = [
            models.CheckConstraint(
                check=models.Q(fecha_final__isnull=True)
                | models.Q(fecha_final__gt=models.F('fecha_inicio')),
                name='fecha_final_gt_fecha_inicio')
        ]