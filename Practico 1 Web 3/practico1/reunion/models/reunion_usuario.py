from django.contrib.auth.models import User
from django.db import models

from reunion.models import Reunion

#TODO tabla intermedia que obtiene el usuario y el la reunion para almacenar los participantes de una reunion
class ReunionUsuario(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="usuario")
    reunion_id = models.ForeignKey(Reunion, on_delete=models.CASCADE, related_name="reunion")