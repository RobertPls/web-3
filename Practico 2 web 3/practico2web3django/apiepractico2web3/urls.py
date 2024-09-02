from django.urls import path, include
from rest_framework import routers

from apiepractico2web3.apis import ReunionViewSet, UserViewSet, InscripcionViewSet


#TODO las urls se agregan asi ya que estan en base al tipo viewset de django
router = routers.DefaultRouter()
router.register(r'reunion', ReunionViewSet)
router.register(r'user', UserViewSet)
router.register(r'inscripcion', InscripcionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
