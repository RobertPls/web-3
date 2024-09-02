from django.db import models
from rest_framework.generics import get_object_or_404

from apipractico4web3django.models import Pregunta


class OpcionPregunta(models.Model):
    texto = models.CharField(max_length=50)
    pregunta = models.ForeignKey(
        Pregunta,
        on_delete=models.CASCADE,
        related_name="opciones_en_pregunta"
    )
