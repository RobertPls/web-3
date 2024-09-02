from django.contrib.auth.models import User
from rest_framework import serializers

from apiepractico2web3.models import ReunionUsuario, Reunion

#TODO serializador para la lista de usuario solo muestra los datos necesarios
class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')

#TODO serializer para ver las reuniones de manera simple con su usario, se usa en la vista de reuniones donde un
# usuario esta inscrito
class ReunionSimpleSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(
        read_only=True
    )

    class Meta:
        model = Reunion
        fields = ('id', 'nombre_reunion', 'fecha_hora', 'user')

#TODO lista de inscripciones que es la tabla intermeda mostrando el objeto reunion relacionado
class ReunionInscripcionSerializer(serializers.ModelSerializer):
    reunion = ReunionSimpleSerializer(
        read_only=True
    )

    class Meta:
        model = ReunionUsuario
        fields = ('id', 'reunion')

#TODO lista de inscripciones que es la tabla intermeda mostrando el objeto usuario relacionado
class UsuarioInscripcionSerializer(serializers.ModelSerializer):
    user = UserSimpleSerializer(
        read_only=True
    )

    class Meta:
        model = ReunionUsuario
        fields = ('id', 'user')
