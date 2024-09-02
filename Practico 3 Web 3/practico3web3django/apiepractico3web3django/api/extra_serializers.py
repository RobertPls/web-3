from django.contrib.auth.models import User
from rest_framework import serializers

from apiepractico3web3django.models import GeneroJuego, Genero, Juego


class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')


class GeneroSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = ('id', 'nombre','imagen')


class JuegoSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Juego
        fields = ('id', 'nombre', 'precio','imagen')


class GenerosDelJuegoSerializer(serializers.ModelSerializer):
    genero = GeneroSimpleSerializer(
        read_only=True
    )

    class Meta:
        model = GeneroJuego
        fields = ('id', 'genero')


class JuegosDelGeneroSerializer(serializers.ModelSerializer):
    juego = JuegoSimpleSerializer(
        read_only=True
    )

    class Meta:
        model = GeneroJuego
        fields = ('id', 'juego')
