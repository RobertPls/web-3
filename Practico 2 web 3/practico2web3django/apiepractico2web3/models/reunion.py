from django.db import models
from django.contrib.auth.models import User


class Reunion(models.Model):
    nombre_reunion = models.CharField(max_length=200)
    fecha_hora = models.DateTimeField()
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="dueño"
    )