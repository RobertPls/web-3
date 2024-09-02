from django.contrib.auth.models import User
from django.db import models

from apipractico4web3django.models import Encuesta


class UsuarioEncuesta(models.Model):
    usuario = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="encuestas_asignadas"
    )
    encuesta = models.ForeignKey(
        Encuesta,
        on_delete=models.CASCADE,
        related_name="usuarios_asignados"
    )
