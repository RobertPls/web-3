from django.db import models

from apipractico4web3django.models import Encuesta

TEXTUAL = "TEXTUAL"
NUMERICA = "NUMERICA"
MULTIPLE = "MULTIPLE"
TIPO_PREGUNTA = [
    (TEXTUAL, "Textual"),
    (NUMERICA, "Numerica"),
    (MULTIPLE, "Multiple"),
]


class Pregunta(models.Model):
    texto = models.CharField(max_length=50)
    tipo = models.CharField(max_length=8, choices=TIPO_PREGUNTA, default=TEXTUAL)
    encuesta = models.ForeignKey(
        Encuesta,
        on_delete=models.CASCADE,
        related_name="preguntas_en_encuesta"
    )
