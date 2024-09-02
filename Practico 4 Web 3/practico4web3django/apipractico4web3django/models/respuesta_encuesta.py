from django.contrib.auth.models import User
from django.db import models

from apipractico4web3django.models import Encuesta


class RespuestaEncuesta(models.Model):
    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="resoluciones_encuesta"
    )
    encuesta = models.ForeignKey(
        Encuesta,
        on_delete=models.CASCADE,
        related_name="resoluciones_usuario"
    )
