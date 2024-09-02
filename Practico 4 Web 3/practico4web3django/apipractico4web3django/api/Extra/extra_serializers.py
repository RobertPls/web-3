from django.contrib.auth.models import User
from rest_framework import serializers

from apipractico4web3django.models import Pregunta, OpcionPregunta, Encuesta, RespuestaPregunta, RespuestaEncuesta, \
    UsuarioEncuesta


class UserSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name')


class EncuestaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encuesta
        fields = ('id', 'nombre')


class PreguntaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ('id', 'texto', 'tipo', 'encuesta')


class OpcionPreguntaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpcionPregunta
        fields = ('id', 'texto', 'pregunta')


class UsuarioEncuestaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioEncuesta
        fields = ('id', 'usuario', 'encuesta')


class RespuestaEncuestaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespuestaEncuesta
        fields = ('id', 'usuario', 'encuesta')


class RespuestaPreguntaSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespuestaPregunta
        fields = ('id', 'texto', 'pregunta', 'encuesta')


# =============================================================================================================================
class RespuestaPreguntaSinEncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespuestaPregunta
        fields = ('id', 'texto', 'pregunta')


# =============================================================================================================================
class PreguntaVistaSerializer(serializers.ModelSerializer):
    opciones = OpcionPreguntaSimpleSerializer(
        read_only=True, many=True, source='opciones_en_pregunta'
    )

    class Meta:
        model = Pregunta
        fields = ('id', 'tipo', 'texto', 'encuesta', 'opciones')


class EncuestaVistaSerializer(serializers.ModelSerializer):
    preguntas = PreguntaVistaSerializer(
        read_only=True, many=True, source='preguntas_en_encuesta'
    )

    class Meta:
        model = Encuesta
        fields = ('id', 'nombre', 'preguntas')


class UsuarioEncuestaVistaSerializer(serializers.ModelSerializer):
    usuario = UserSimpleSerializer(read_only=True)
    encuesta = EncuestaVistaSerializer(read_only=True)

    class Meta:
        model = UsuarioEncuesta
        fields = ('id', 'usuario', 'encuesta')


class RespuestaPreguntaVistaSerializer(serializers.ModelSerializer):
    pregunta = PreguntaSimpleSerializer(read_only=True)

    class Meta:
        model = RespuestaPregunta
        fields = ('id', 'texto', 'pregunta')


class RespuestaEncuestaVistaSerializer(serializers.ModelSerializer):
    usuario = UserSimpleSerializer(read_only=True)
    encuesta = EncuestaVistaSerializer(read_only=True)
    respuestas_preguntas = RespuestaPreguntaVistaSerializer(required=True, many=True,
                                                            source='respuestas_en_resolucion_de_encuesta')

    class Meta:
        model = UsuarioEncuesta
        fields = ('id', 'usuario', 'encuesta', 'respuestas_preguntas')
