from django.db import models


class Genero(models.Model):
    nombre = models.CharField(max_length=50)
    imagen = models.FileField(blank='', upload_to="genero/", default="default.jpg")

    def __str__(self):
        return self.nombre
