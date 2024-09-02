from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from reunion.forms.reuniones.reuniones_create_form import ReunionCreateForm
from reunion.forms.reuniones.reuniones_edit_form import ReunionEditForm
from reunion.models import Reunion, ReunionUsuario

#TODO devuelve la lista de las reuniones de la que soy dueño y la lista de todos los objetos que tenga mi usuario
# en la tabla intermedia, que seria donde estoy inscrito
@login_required
def list_reunion(request):
    lista_reuniones_dueño = Reunion.objects.filter(user_id=request.user)
    lista_reuniones_inscrito = ReunionUsuario.objects.filter(user_id=request.user)
    user = request.user
    print(lista_reuniones_inscrito.values())
    return render(request, 'reuniones/list.html', {'user': user, 'lista_reuniones_dueño': lista_reuniones_dueño,
                                                   'lista_reuniones_inscrito': lista_reuniones_inscrito})

#TODO view o controller para crear reunion si es post, en caso contrario solo devuelve el html con el form para la vista
@login_required
def create_reunion(request):
    user = request.user
    form = ReunionCreateForm(initial={'user_id': user})
    if request.method == 'POST':
        form = ReunionCreateForm(request.POST, initial={'user_id': user})
        if form.is_valid():
            form.save()
            return redirect('reunion:reuniones_list')
    return render(request, 'reuniones/create.html', {'form': form})

#TODO carga el formulario de editar reunion y se obtiene la reunion mediante el id que viene en la url, esto hace que en el form
# tenemos los datos nuevos y la instancia o objeto a actualizar, si no es post devuelve la vista de detalla o edit con el formulario
# el objeto reunion y la lista de participantes
@login_required
def edit_reunion(request, id):
    reunion = get_object_or_404(Reunion, pk=id)

    if reunion.user_id != request.user:
        return redirect('reunion:reuniones_list')

    form = ReunionEditForm(instance=reunion)
    if request.method == 'POST':
        form = ReunionEditForm(request.POST, instance=reunion)
        if form.is_valid():
            form.save()
            return redirect('reunion:reuniones_list')
    lista = ReunionUsuario.objects.filter(reunion_id=reunion.id)
    return render(request, 'reuniones/edit.html', {'form': form, 'reunion': reunion, 'lista_participantes': lista})

#TODO obtiene la reunion mediante id donde se eliminare mediante la funcion delete
@login_required
def delete_reunion(request, id):
    reunion = get_object_or_404(Reunion, pk=id)

    if reunion.user_id != request.user:
        return redirect('reunion:reuniones_list')

    if request.method == "POST":
        reunion.delete()
    return redirect('reunion:reuniones_list')
