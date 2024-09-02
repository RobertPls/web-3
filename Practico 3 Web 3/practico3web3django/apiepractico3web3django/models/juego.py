from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator


class Juego(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.FloatField(validators=[MinValueValidator(0)])
    imagen = models.ImageField(blank='', upload_to="juego/", default="default.jpg")
    creador = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="creador"
    )
