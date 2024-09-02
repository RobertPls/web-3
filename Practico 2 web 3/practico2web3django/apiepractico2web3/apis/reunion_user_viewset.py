from django.shortcuts import get_object_or_404
from rest_framework import viewsets, serializers, status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apiepractico2web3.models import Reunion, ReunionUsuario

# TODO serializador base para reunion
class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReunionUsuario
        fields = '__all__'

#TODO view set de inscripcion que es la tabla intermedia solo con los endpoint de create y eliminar
class InscripcionViewSet(viewsets.ViewSetMixin, generics.CreateAPIView, generics.DestroyAPIView):
    queryset = ReunionUsuario.objects.all()
    serializer_class = InscripcionSerializer
    permission_classes = [IsAuthenticated]

    #TODO endpoint de crear donde se crea en base a la data obtenida que es la reunion y el usuario
    # si no es valido retorna error, si el usuario del token no es el dueño de la reunion retorna que no esta autorizado
    # si cumple todo pasa y se crea
    def create(self, request, *args, **kwargs):
        reunion_usuario_serializer = InscripcionSerializer(data=request.data)

        if not reunion_usuario_serializer.is_valid():
            return Response({"success": False, "data": reunion_usuario_serializer.errors},
                            status=status.HTTP_400_BAD_REQUEST)

        obj_reunion = get_object_or_404(Reunion, pk=request.data.get('reunion'))

        if obj_reunion.user != request.user:
            return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)

        reunion_usuario_serializer.save()
        return Response({"success": True, "data": reunion_usuario_serializer.data})

    #TODO la funcion de destruir solo obtiene la llave primaria de la inscripcion, si el usuario no es el dueño de
    # la reunion relacionada a la inscripcion no pasa, si es el dueño se elimina.

    def destroy(self, request, *args, **kwargs):
        obj_reunion_usuario = get_object_or_404(ReunionUsuario, pk=kwargs.get('pk'))

        if obj_reunion_usuario.reunion.user != request.user:
            return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)

        obj_reunion_usuario.delete()
        return Response({"success": True})
