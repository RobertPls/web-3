from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apiepractico3web3django.api import JuegosDelGeneroSerializer
from apiepractico3web3django.models import Genero
from apiepractico3web3django.models.genero_juego import GeneroJuego
from apiepractico3web3django.permissions import IsAdminUserOrReadOnly


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = ('id', 'nombre', 'imagen')


class GeneroViewSet(viewsets.ModelViewSet):
    serializer_class = GeneroSerializer
    queryset = Genero.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def create(self, request, *args, **kwargs):
        request.data['creador'] = request.user.pk
        serializer = GeneroSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"success": False, "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({"success": True, "data": serializer.data})

    def retrieve(self, request, *args, **kwargs):
        obj_genero = get_object_or_404(Genero, pk=kwargs.get('pk'))

        lista_juegos = GeneroJuego.objects.filter(genero_id=obj_genero.pk)

        genero_serializer = GeneroSerializer(obj_genero)
        juegos_serializer = JuegosDelGeneroSerializer(instance=lista_juegos, many=True)

        return Response(
            {"success": True,
             "data": {"genero": genero_serializer.data, "lista_juegos": juegos_serializer.data}})

    def update(self, request, *args, **kwargs):
        obj_genero = get_object_or_404(Genero, pk=kwargs.get('pk'))

        serializer = GeneroSerializer(obj_genero, data=request.data, partial=True)

        if not serializer.is_valid():
            return Response({"success": False, "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({"success": True, "data": serializer.data})

    def destroy(self, request, *args, **kwargs):
        obj_genero = get_object_or_404(Genero, pk=kwargs.get('pk'))

        obj_genero.delete()
        return Response({"success": True})

    def list(self, request, *args, **kwargs):
        lista_generos = Genero.objects.all()

        serializer = GeneroSerializer(instance=lista_generos, many=True)
        return Response({"success": True, "lista_generos": serializer.data})
