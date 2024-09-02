from django.urls import path, include
from rest_framework import routers

from apipractico4web3django.api import EncuestaViewSet, PreguntaViewSet, UsuarioEncuestaViewSet, OpcionPreguntaViewSet, \
    UserViewSet, RespuestaEncuestaViewSet

router = routers.DefaultRouter()
router.register(r'usuario', UserViewSet)
router.register(r'encuesta', EncuestaViewSet)
router.register(r'pregunta', PreguntaViewSet)
router.register(r'opcion-pregunta', OpcionPreguntaViewSet)
router.register(r'encuesta-asignada', UsuarioEncuestaViewSet)
router.register(r'respuesta-encuesta', RespuestaEncuestaViewSet)
urlpatterns = [
    path('', include(router.urls))
]
