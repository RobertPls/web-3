from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apipractico4web3django.models import RespuestaPregunta
from apipractico4web3django.permissions import IsAdminUserOrReadOnly


class RespuestaPreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = RespuestaPregunta
        fields = ('id', 'texto', 'pregunta', 'respuesta_encuesta')


class RespuestaPreguntaViewSet(viewsets.ModelViewSet):
    serializer_class = RespuestaPreguntaSerializer
    queryset = RespuestaPregunta.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def create(self, request, *args, **kwargs):
        respuesta_pregunta_serializer = RespuestaPreguntaSerializer(data=request.data)
        if not respuesta_pregunta_serializer.is_valid():
            return Response({"success": False, "data": respuesta_pregunta_serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        respuesta_pregunta_serializer.save()
        return Response({"success": True, "data": respuesta_pregunta_serializer.data})

    def retrieve(self, request, *args, **kwargs):
        obj_respuesta_pregunta = get_object_or_404(RespuestaPregunta, pk=kwargs.get('pk'))

        respuesta_pregunta_serializer = RespuestaPreguntaSerializer(obj_respuesta_pregunta)

        return Response(
            {"success": True,
             "data": respuesta_pregunta_serializer.data})

    def update(self, request, *args, **kwargs):
        obj_respuesta_pregunta = get_object_or_404(RespuestaPregunta, pk=kwargs.get('pk'))

        respuesta_pregunta_serializer = RespuestaPreguntaSerializer(obj_respuesta_pregunta, data=request.data,
                                                                    partial=True)

        if not respuesta_pregunta_serializer.is_valid():
            return Response({"success": False, "data": respuesta_pregunta_serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        respuesta_pregunta_serializer.save()
        return Response({"success": True, "data": respuesta_pregunta_serializer.data})

    def destroy(self, request, *args, **kwargs):
        obj_respuesta_pregunta = get_object_or_404(RespuestaPregunta, pk=kwargs.get('pk'))

        obj_respuesta_pregunta.delete()
        return Response({"success": True})

    def list(self, request, *args, **kwargs):
        lista_respuesta_preguntas = RespuestaPregunta.objects.all()

        respuesta_pregunta_serializer = RespuestaPreguntaSerializer(instance=lista_respuesta_preguntas, many=True)
        return Response({"success": True, "data": respuesta_pregunta_serializer.data})
