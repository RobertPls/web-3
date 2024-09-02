from django.contrib.auth.models import User
from rest_framework import serializers, viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apipractico4web3django.api.Extra.extra_serializers import UsuarioEncuestaVistaSerializer
from apipractico4web3django.models import UsuarioEncuesta
from apipractico4web3django.permissions import IsAdminUserOrReadOnly


class UsuarioEncuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioEncuesta
        fields = ('id', 'usuario', 'encuesta')


class UsuarioEncuestaViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioEncuestaSerializer
    queryset = UsuarioEncuesta.objects.all()
    permission_classes = [IsAuthenticated, IsAdminUserOrReadOnly]

    def create(self, request, *args, **kwargs):
        usuario_encuesta_serializer = UsuarioEncuestaSerializer(data=request.data)

        if not usuario_encuesta_serializer.is_valid():
            return Response({"success": False, "data": usuario_encuesta_serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        encuesta_asignada_existente = UsuarioEncuesta.objects.filter(usuario=request.data.get("usuario"), encuesta=request.data.get("encuesta")).exists()

        if encuesta_asignada_existente:
            return Response({"success": False, "data": "Ya se ha asignado la encuesta al usuario"},
                            status=status.HTTP_400_BAD_REQUEST)

        usuario_encuesta_serializer.save()
        return Response({"success": True, "data": usuario_encuesta_serializer.data})

    def retrieve(self, request, *args, **kwargs):
        obj_usuario_encuesta = get_object_or_404(UsuarioEncuesta, pk=kwargs.get('pk'))

        usuario_encuesta_serializer = UsuarioEncuestaSerializer(obj_usuario_encuesta)

        return Response(
            {"success": True, "data": usuario_encuesta_serializer.data})

    def destroy(self, request, *args, **kwargs):
        obj_usuario_encuesta = get_object_or_404(UsuarioEncuesta, pk=kwargs.get('pk'))

        obj_usuario_encuesta.delete()
        return Response({"success": True})

    def list(self, request, *args, **kwargs):
        obj_user = get_object_or_404(User, pk=request.user.pk)

        if obj_user.is_staff:
            lista_usuario_encuestas = UsuarioEncuesta.objects.all()
        else:
            lista_usuario_encuestas = UsuarioEncuesta.objects.filter(usuario_id=obj_user.pk)

        usuario_encuesta_serializer = UsuarioEncuestaVistaSerializer(instance=lista_usuario_encuestas, many=True)
        return Response({"success": True, "data": usuario_encuesta_serializer.data})
