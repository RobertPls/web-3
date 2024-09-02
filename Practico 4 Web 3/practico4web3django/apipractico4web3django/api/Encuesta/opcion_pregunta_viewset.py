from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apipractico4web3django.models import OpcionPregunta, Pregunta, MULTIPLE
from apipractico4web3django.permissions import IsAdminUserOrReadOnly


class OpcionPreguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpcionPregunta
        fields = ('id', 'texto', 'pregunta')


class OpcionPreguntaViewSet(viewsets.ModelViewSet):
    serializer_class = OpcionPreguntaSerializer
    queryset = OpcionPregunta.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def create(self, request, *args, **kwargs):
        opcion_pregunta_serializer = OpcionPreguntaSerializer(data=request.data)

        if not opcion_pregunta_serializer.is_valid():
            return Response({"success": False, "data": opcion_pregunta_serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        obj_pregunta = get_object_or_404(Pregunta, pk=request.data.get("pregunta"))

        if obj_pregunta.tipo != MULTIPLE:
            return Response({"success": False, "data": "La pregunta no es de tipo multiple"},
                            status=status.HTTP_400_BAD_REQUEST)

        opcion_pregunta_serializer.save()
        return Response({"success": True, "data": opcion_pregunta_serializer.data})

    def retrieve(self, request, *args, **kwargs):
        obj_opcion_pregunta = get_object_or_404(OpcionPregunta, pk=kwargs.get('pk'))

        opcion_pregunta_serializer = OpcionPreguntaSerializer(obj_opcion_pregunta)

        return Response({"success": True, "data": opcion_pregunta_serializer.data})

    def update(self, request, *args, **kwargs):
        obj_opcion_pregunta = get_object_or_404(OpcionPregunta, pk=kwargs.get('pk'))

        opcion_pregunta_serializer = OpcionPreguntaSerializer(obj_opcion_pregunta, data=request.data, partial=True)

        if not opcion_pregunta_serializer.is_valid():
            return Response({"success": False, "data": opcion_pregunta_serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        opcion_pregunta_serializer.save()
        return Response({"success": True, "data": opcion_pregunta_serializer.data})

    def destroy(self, request, *args, **kwargs):
        obj_opcion_pregunta = get_object_or_404(OpcionPregunta, pk=kwargs.get('pk'))

        obj_opcion_pregunta.delete()
        return Response({"success": True})

    def list(self, request, *args, **kwargs):
        lista_opcion_preguntas = OpcionPregunta.objects.all()

        opcion_pregunta_serializer = OpcionPreguntaSerializer(instance=lista_opcion_preguntas, many=True)

        return Response({"success": True, "data": opcion_pregunta_serializer.data})
