from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.template import loader
from django.urls import reverse

from reunion.forms.reuniones_usuarios.reuniones_usuarios_form import ReunionUsuarioCreateForm
from reunion.models import Reunion, ReunionUsuario

#TODO view o controler que registra el usuario y la reunion en la tabla intermedia, se ve que el formulario inicia por defecto
# con la reunion ya que esta la recibimos por la url, si es post carga los datos del formulario
# si no devuelve el html donde se agrega un usuario a una reunion
@login_required
def create_reunion_usuario(request, id):
    reunion = get_object_or_404(Reunion, pk=id)
    form = ReunionUsuarioCreateForm(initial={'reunion_id': reunion})
    if request.method == 'POST':
        form = ReunionUsuarioCreateForm(request.POST, initial={'reunion_id': reunion})
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('reunion:reuniones_edit', kwargs={"id": reunion.pk}))
    return render(request, 'reunionesUsuarios/create.html', {'form': form, 'reunion': reunion})

#TODO se obtiene el objeto de la tabla intermedia y la reunionm, el objeto de la tabla intermedia es para eliminarlos
# y el objeto reunion es para volver a la vista de detalle de la reunion ya que esto necesita el id de la reunion
@login_required
def delete_reunion_usuario(request, id):
    reunion_usuario = get_object_or_404(ReunionUsuario, pk=id)
    reunion = get_object_or_404(Reunion, pk=reunion_usuario.reunion_id.pk)

    if request.method == "POST":
        reunion_usuario.delete()
    return HttpResponseRedirect(reverse('reunion:reuniones_edit', kwargs={"id": reunion.pk}))
