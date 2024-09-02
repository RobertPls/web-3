from django.shortcuts import get_object_or_404
from rest_framework import viewsets, serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from apiepractico2web3.models import Reunion, ReunionUsuario
from apiepractico2web3.apis import UsuarioInscripcionSerializer, ReunionInscripcionSerializer


# TODO serializer base para reunion donde se mapean todos los datos
class ReunionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reunion
        fields = ('id', 'nombre_reunion', 'fecha_hora', 'user')


# TODO viewset completo al tener modelviewset viene con todos los metodos
class ReunionViewSet(viewsets.ModelViewSet):
    queryset = Reunion.objects.all()
    serializer_class = ReunionSerializer
    permission_classes = [IsAuthenticated]

    # TODO la funcion create primero obtiene el usuario en base al token que viene en request.user
    # y lo mete la data que llega y lo valida con el serializer, si no es valido devuelve error, si pasa se cre
    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.pk
        reunion_serializer = ReunionSerializer(data=request.data)

        if not reunion_serializer.is_valid():
            return Response({"success": False, "data": reunion_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        reunion_serializer.save()
        return Response({"success": True, "data": reunion_serializer.data})

    # TODO la funcion retrieve o detalle obtiene la reunion en base al id que viene en la url, si el usuario en el
    # request no es el dueño responde que no esta autorizado, si pasa eso se obtiene la lista de los inscritos en la
    # reunion y lo pasa por el serializer que toma en cuenta solo al usuario y devuelve el json
    def retrieve(self, request, *args, **kwargs):
        obj_reunion = get_object_or_404(Reunion, pk=kwargs.get('pk'))

        if obj_reunion.user != request.user:
            return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)

        lista_inscritos_en_reunion = ReunionUsuario.objects.filter(reunion_id=obj_reunion.pk)
        lista_inscritos_en_reunion_serializer = UsuarioInscripcionSerializer(lista_inscritos_en_reunion, many=True)

        reunion_serializer = ReunionSerializer(obj_reunion)
        return Response(
            {"success": True,
             "data": {"reunion": reunion_serializer.data,
                      "lista_inscripciones": lista_inscritos_en_reunion_serializer.data}})

    # TODO la funcion de actualizar obtiene el id en la url si el usuario no es el dueño de la reunion por editar, devuelve que no tiene autorizacion
    # si no hace pasar los datos de que vienen para actualizar y con el serializer se actualiza solo si es valido.
    def update(self, request, *args, **kwargs):
        obj_reunion = get_object_or_404(Reunion, pk=kwargs.get('pk'))

        if obj_reunion.user != request.user:
            return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = ReunionSerializer(obj_reunion, data=request.data, partial=True)

        if not serializer.is_valid():
            return Response({"success": False, "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()
        return Response({"success": True, "data": serializer.data})

    #TODO la funcion de eliminar busca el objeto si el usuario no el dueño devuelve sin autorizacion y si todo esta correcto
    # se elimina
    def destroy(self, request, *args, **kwargs):
        obj_reunion = get_object_or_404(Reunion, pk=kwargs.get('pk'))

        if obj_reunion.user != request.user:
            return Response({"success": False}, status=status.HTTP_401_UNAUTHORIZED)

        obj_reunion.delete()
        return Response({"success": True})

    def list(self, request, *args, **kwargs):
        lista_reuniones_dueño = Reunion.objects.filter(user_id=request.user)
        lista_reuniones_inscrito = ReunionUsuario.objects.filter(user_id=request.user)

        serializer_dueño = ReunionSerializer(instance=lista_reuniones_dueño, many=True)
        serializer_inscrito = ReunionInscripcionSerializer(instance=lista_reuniones_inscrito, many=True)

        return Response(data={"dueño": serializer_dueño.data, "inscrito": serializer_inscrito.data})
