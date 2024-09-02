from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apiepractico3web3django.api import GenerosDelJuegoSerializer
from apiepractico3web3django.models import Juego
from apiepractico3web3django.models.genero_juego import GeneroJuego
from apiepractico3web3django.permissions import IsAdminUserOrReadOnly


class JuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Juego
        fields = ('id', 'nombre','precio','creador', 'imagen')


class JuegoViewSet(viewsets.ModelViewSet):
    serializer_class = JuegoSerializer
    queryset = Juego.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def create(self, request, *args, **kwargs):
        request.data['creador'] = request.user.pk
        serializer = JuegoSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"success": False, "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({"success": True, "data": serializer.data})

    def retrieve(self, request, *args, **kwargs):
        obj_juego = get_object_or_404(Juego, pk=kwargs.get('pk'))

        lista_generos = GeneroJuego.objects.filter(juego_id=obj_juego.pk)

        juego_serializer = JuegoSerializer(obj_juego)
        generos_serializer = GenerosDelJuegoSerializer(instance=lista_generos, many=True)
        return Response(
            {"success": True,
             "data": {"juego": juego_serializer.data, "lista_generos": generos_serializer.data}})

    def update(self, request, *args, **kwargs):
        obj_juego = get_object_or_404(Juego, pk=kwargs.get('pk'))

        serializer = JuegoSerializer(obj_juego, data=request.data, partial=True)

        if not serializer.is_valid():
            return Response({"success": False, "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({"success": True, "data": serializer.data})

    def destroy(self, request, *args, **kwargs):
        obj_juego = get_object_or_404(Juego, pk=kwargs.get('pk'))

        obj_juego.delete()
        return Response({"success": True})

    def list(self, request, *args, **kwargs):
        lista_juegos = Juego.objects.all()

        serializer = JuegoSerializer(instance=lista_juegos, many=True)
        return Response({"success": True, "lista_juegos": serializer.data})
