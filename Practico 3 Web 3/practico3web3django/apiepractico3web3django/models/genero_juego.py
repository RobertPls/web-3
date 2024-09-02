from django.db import models

from apiepractico3web3django.models import Juego, Genero


class GeneroJuego(models.Model):
    genero = models.ForeignKey(
        Genero,
        on_delete=models.CASCADE,
        related_name="genero"
    )
    juego = models.ForeignKey(
        Juego,
        on_delete=models.CASCADE,
        related_name="juego"
    )
