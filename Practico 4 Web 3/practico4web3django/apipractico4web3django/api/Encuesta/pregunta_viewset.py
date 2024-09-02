from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apipractico4web3django.api.Extra.extra_serializers import PreguntaVistaSerializer
from apipractico4web3django.models import Pregunta, TIPO_PREGUNTA, TEXTUAL, NUMERICA, OpcionPregunta
from apipractico4web3django.permissions import IsAdminUserOrReadOnly


class PreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ('id', 'tipo', 'texto', 'encuesta')


class PreguntaViewSet(viewsets.ModelViewSet):
    serializer_class = PreguntaSerializer
    queryset = Pregunta.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def create(self, request, *args, **kwargs):
        pregunta_serializer = PreguntaSerializer(data=request.data)

        if not pregunta_serializer.is_valid():
            return Response({"success": False, "data": pregunta_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        pregunta_serializer.save()
        return Response({"success": True, "data": pregunta_serializer.data})

    def retrieve(self, request, *args, **kwargs):
        obj_pregunta = get_object_or_404(Pregunta, pk=kwargs.get('pk'))

        pregunta_serializer = PreguntaVistaSerializer(obj_pregunta)

        return Response({"success": True, "data": pregunta_serializer.data})

    def update(self, request, *args, **kwargs):
        obj_pregunta = get_object_or_404(Pregunta, pk=kwargs.get('pk'))

        pregunta_serializer = PreguntaSerializer(obj_pregunta, data=request.data, partial=True)

        if not pregunta_serializer.is_valid():
            return Response({"success": False, "data": pregunta_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        if request.data.get("tipo") == TEXTUAL or request.data.get("tipo") == NUMERICA:
            opciones_pregunta = OpcionPregunta.objects.filter(pregunta=obj_pregunta.pk)
            opciones_pregunta.delete()

        pregunta_serializer.save()
        return Response({"success": True, "data": pregunta_serializer.data})

    def destroy(self, request, *args, **kwargs):
        obj_pregunta = get_object_or_404(Pregunta, pk=kwargs.get('pk'))

        obj_pregunta.delete()
        return Response({"success": True})

    def list(self, request, *args, **kwargs):
        lista_preguntas = Pregunta.objects.all()

        pregunta_serializer = PreguntaVistaSerializer(instance=lista_preguntas, many=True)
        return Response({"success": True, "data": pregunta_serializer.data})
