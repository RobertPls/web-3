from django.urls import path, include
from rest_framework import routers

from apiepractico3web3django.api import JuegoViewSet, UserViewSet, GeneroViewSet, GeneroJuegoViewSet

router = routers.DefaultRouter()
router.register(r'juego', JuegoViewSet)
router.register(r'genero', GeneroViewSet)
router.register(r'usuario', UserViewSet)
router.register(r'genero-juego', GeneroJuegoViewSet)

urlpatterns = [
    path('', include(router.urls))
]
