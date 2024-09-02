from django.db import models

from apipractico4web3django.models import Pregunta, RespuestaEncuesta


class RespuestaPregunta(models.Model):
    pregunta = models.ForeignKey(
        Pregunta,
        on_delete=models.CASCADE,
        related_name="respuesta_de_preagunta_en_resolucion_de_encuesta"
    )
    texto = models.CharField(max_length=100)
    respuesta_encuesta = models.ForeignKey(
        RespuestaEncuesta,
        on_delete=models.CASCADE,
        related_name="respuestas_en_resolucion_de_encuesta"
    )
