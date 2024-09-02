from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from reunion.models import Reunion

#TODO extender la clase authentication form por defecto para podes editar las clases de los input y que funcionen con bootstrap
class CustomAuthForm(AuthenticationForm):
    username = forms.CharField(widget=forms.widgets.TextInput(attrs={'type': 'text', 'class': 'form-control'}))
    password = forms.CharField(
        widget=forms.widgets.TextInput(attrs={'type': 'password', 'class': 'form-control'}))
