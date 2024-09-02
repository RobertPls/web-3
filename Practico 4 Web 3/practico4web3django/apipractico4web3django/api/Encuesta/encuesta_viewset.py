from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apipractico4web3django.api.Extra.extra_serializers import EncuestaVistaSerializer
from apipractico4web3django.models import Encuesta
from apipractico4web3django.permissions import IsAdminUserOrReadOnly


class EncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Encuesta
        fields = ('id', 'nombre')


class EncuestaViewSet(viewsets.ModelViewSet):
    serializer_class = EncuestaSerializer
    queryset = Encuesta.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def create(self, request, *args, **kwargs):
        encuesta_serializer = EncuestaSerializer(data=request.data)

        if not encuesta_serializer.is_valid():
            return Response({"success": False, "data": encuesta_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        encuesta_serializer.save()
        return Response({"success": True, "data": encuesta_serializer.data})

    def retrieve(self, request, *args, **kwargs):
        obj_encuesta = get_object_or_404(Encuesta, pk=kwargs.get('pk'))
        encuesta_serializer = EncuestaVistaSerializer(obj_encuesta)

        return Response(
            {"success": True, "data": encuesta_serializer.data})

    def update(self, request, *args, **kwargs):
        obj_encuesta = get_object_or_404(Encuesta, pk=kwargs.get('pk'))

        encuesta_serializer = EncuestaSerializer(obj_encuesta, data=request.data, partial=True)

        if not encuesta_serializer.is_valid():
            return Response({"success": False, "data": encuesta_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        encuesta_serializer.save()
        return Response({"success": True, "data": encuesta_serializer.data})

    def destroy(self, request, *args, **kwargs):
        obj_encuesta = get_object_or_404(Encuesta, pk=kwargs.get('pk'))

        obj_encuesta.delete()
        return Response({"success": True})

    def list(self, request, *args, **kwargs):
        lista_encuestas = Encuesta.objects.all()

        encuesta_serializer = EncuestaVistaSerializer(instance=lista_encuestas, many=True)
        return Response({"success": True, "data": encuesta_serializer.data})
