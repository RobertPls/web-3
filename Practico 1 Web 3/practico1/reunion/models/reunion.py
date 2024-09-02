from django.contrib.auth.models import User
from django.db import models

#TODO modelo reunion que solo tendra nombre, fecha, y el dueño o user_id tiene on delete casace ya que en caso de
# eliminar el usuario se elimina la reunion
class Reunion(models.Model):
    nombre = models.CharField(max_length=200)
    fecha_hora = models.DateTimeField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="dueño")
    