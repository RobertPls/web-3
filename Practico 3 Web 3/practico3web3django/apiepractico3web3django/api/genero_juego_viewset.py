from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apiepractico3web3django.models import GeneroJuego
from apiepractico3web3django.permissions import IsAdminUserOrReadOnly


class GeneroJuegoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneroJuego
        fields = ('id', 'genero', 'juego')


class GeneroJuegoViewSet(viewsets.ModelViewSet):
    serializer_class = GeneroJuegoSerializer
    queryset = GeneroJuego.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def create(self, request, *args, **kwargs):
        serializer = GeneroJuegoSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"success": False, "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({"success": True, "data": serializer.data})

    def destroy(self, request, *args, **kwargs):
        obj_genero_juego = get_object_or_404(GeneroJuego, pk=kwargs.get('pk'))

        obj_genero_juego.delete()
        return Response({"success": True})
