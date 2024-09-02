from django.contrib.auth.models import User
from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apipractico4web3django.api import RespuestaEncuestaSimpleSerializer, \
    RespuestaPreguntaSinEncuestaSerializer, RespuestaPreguntaSerializer
from apipractico4web3django.api.Extra.extra_serializers import RespuestaEncuestaVistaSerializer
from apipractico4web3django.models import RespuestaEncuesta


class RespuestaEncuestaSerializer(serializers.ModelSerializer):
    respuestas_preguntas = RespuestaPreguntaSinEncuestaSerializer(required=True, many=True,
                                                                  source='respuestas_en_resolucion_de_encuesta')

    class Meta:
        model = RespuestaEncuesta
        fields = ('id', 'usuario', 'encuesta', 'respuestas_preguntas')


class RespuestaEncuestaViewSet(viewsets.ModelViewSet):
    serializer_class = RespuestaEncuestaSerializer
    queryset = RespuestaEncuesta.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['usuario'] = request.user.pk
        respuesta_encuesta_con_lista_serializer = RespuestaEncuestaSerializer(data=request.data)

        if not respuesta_encuesta_con_lista_serializer.is_valid():
            return Response({"success": False, "data": respuesta_encuesta_con_lista_serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        lista_respuestas_preguntas = request.data.pop('respuestas_preguntas')

        respuesta_ecuesta_serializer = RespuestaEncuestaSimpleSerializer(data=request.data)
        respuesta_ecuesta_serializer.is_valid(raise_exception=True)
        obj_respuesta_encuesta = respuesta_ecuesta_serializer.save()

        for respuesta_pregunta in lista_respuestas_preguntas:
            respuesta_pregunta['respuesta_encuesta'] = obj_respuesta_encuesta.pk

        respuestas_preguntas_serializer = RespuestaPreguntaSerializer(data=lista_respuestas_preguntas, many=True)
        respuestas_preguntas_serializer.is_valid(raise_exception=True)
        respuestas_preguntas_serializer.save()

        return Response({"success": True})

    def retrieve(self, request, *args, **kwargs):
        obj_respuesta_encuesta = get_object_or_404(RespuestaEncuesta, pk=kwargs.get('pk'))

        if obj_respuesta_encuesta.usuario.pk != request.user.pk:
            return Response({"success": False},
                            status=status.HTTP_401_UNAUTHORIZED)

        respuesta_encuesta_serializer = RespuestaEncuestaVistaSerializer(obj_respuesta_encuesta)

        return Response(
            {"success": True, "data": respuesta_encuesta_serializer.data})

    def destroy(self, request, *args, **kwargs):
        obj_respuesta_encuesta = get_object_or_404(RespuestaEncuesta, pk=kwargs.get('pk'))

        if obj_respuesta_encuesta.usuario.pk != request.user.pk:
            return Response({"success": False},
                            status=status.HTTP_401_UNAUTHORIZED)

        obj_respuesta_encuesta.delete()
        return Response({"success": True})

    def list(self, request, *args, **kwargs):
        obj_user = get_object_or_404(User, pk=request.user.pk)

        if obj_user.is_staff:
            lista_respuesta_encuestas = RespuestaEncuesta.objects.all()
        else:
            lista_respuesta_encuestas = RespuestaEncuesta.objects.filter(usuario_id=obj_user.pk)

        respuesta_encuesta_serializer = RespuestaEncuestaVistaSerializer(instance=lista_respuesta_encuestas, many=True)
        return Response({"success": True, "data": respuesta_encuesta_serializer.data})
