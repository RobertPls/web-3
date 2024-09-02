from django.db import models


class Encuesta(models.Model):
    nombre = models.CharField(max_length=50)

