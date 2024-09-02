from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import auth
from reunion.forms.usuarios.usuario_edit_form import UserEditForm
from reunion.forms.usuarios.usuario_create_form import UserCreateForm

#TODO view o controler para la creacion de usuario utilizando el user create form que es el que cree extendiendo el user creartion form
# aqui si es post guarda si no devuelve el html
def create_user(request):
    form = UserCreateForm()
    if request.method == 'POST':
        form = UserCreateForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('reunion:login')
    return render(request, 'usuarios/create.html', {'form': form})

#TODO la vista de editar usuario donde se usa el usereditform con la instancia del usuario actual que se obtiene mediante.
# request.user
# si es post guarda si no devuelve la vista de edicion
@login_required()
def edit_user(request):
    user = request.user
    form = UserEditForm(instance=user)
    if request.method == 'POST':
        form = UserEditForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return redirect('reunion:reuniones_list')
    return render(request, 'usuarios/edit.html', {'form': form})

#TODO vista o controller para eliminar el usuario y redirigir a la vista de login
@login_required()
def delete_user(request):
    user = get_object_or_404(User, pk=request.user.pk)
    if request.method == "POST":
        user.delete()
    return redirect('reunion:login')
