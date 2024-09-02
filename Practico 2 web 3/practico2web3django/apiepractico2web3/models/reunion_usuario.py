from django.contrib.auth.models import User
from django.db import models

from apiepractico2web3.models import Reunion


class ReunionUsuario(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="usuario"
    )
    reunion = models.ForeignKey(
        Reunion,
        on_delete=models.CASCADE,
        related_name="reunion"
    )
