from django.urls import path, include

from reunion.views import reunion_view, reunion_usuario_view, user_view, authentication_view
from django.contrib.auth import views as auth_views

app_name = 'reunion'
#TODO todas las urls de la app donde se ven separados cada area de la aplicacion
urlpatterns = [
    path('login/', authentication_view.login, name='login'),
    path('logout/', authentication_view.logout, name='logout'),

    path('user/', user_view.edit_user, name='user_edit'),
    path('user/create', user_view.create_user, name='user_create'),
    path('user/delete', user_view.delete_user, name='user_delete'),

    path('reuniones/', reunion_view.list_reunion, name='reuniones_list'),
    path('reuniones/create/', reunion_view.create_reunion, name='reuniones_create'),
    path('reuniones/<int:id>/', reunion_view.edit_reunion, name='reuniones_edit'),
    path('reuniones/<int:id>/delete/', reunion_view.delete_reunion, name='reuniones_delete'),

    path('reuniones-usuarios/<int:id>/create', reunion_usuario_view.create_reunion_usuario,
         name='reuniones_usuarios_create'),
    path('reuniones-usuarios/<int:id>/delete', reunion_usuario_view.delete_reunion_usuario,
         name='reuniones_usuarios_delete'),

]
