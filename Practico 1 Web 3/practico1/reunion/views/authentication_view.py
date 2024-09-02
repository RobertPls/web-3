from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.shortcuts import render, redirect

from reunion.forms.autenticacion.custom_auth_form import CustomAuthForm

#TODO view o controller para cerrar sesion, el modelo auth de django hace la logica y solo se llama la funcion logout.
@login_required
def logout(request):
    auth.logout(request)
    return render(request, "autenticacion/logout.html")

#TODO view o ocntroller para el login de la app donde tomo en cuenta el custom auth form que cree para agregar clases
# se usa post para los datos del form que se envian y se hace el login con la ayuda del modelo auth de djangol
# en caso de no entrar por post retorna el html del formulario de login
def login(request):
    form = CustomAuthForm()
    if request.method == "POST":
        form = CustomAuthForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = auth.authenticate(username=username, password=password)
            if user is not None:
                auth.login(request, user)
                return redirect("reunion:reuniones_list")
    return render(request, "autenticacion/login.html", {"form": form})
