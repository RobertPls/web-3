from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

#TODO este es el formulario para la creacion de usuario, extiende del modelo user creation form que esta por defecto
# se hace asi para poder agregarle las clases de bootstrap, los campos estan de acuerdo a sus necesidaes, tipo email,
# date o password
class UserCreateForm(UserCreationForm):
    username = forms.CharField(max_length=50,
                               label="Usuario", required=True,
                               widget=forms.widgets.TextInput(
                                   attrs={'type': 'text', 'class': 'form-control'}))

    first_name = forms.CharField(max_length=50,
                                 label="Nombres", required=True,
                                 widget=forms.widgets.TextInput(
                                     attrs={'type': 'text', 'class': 'form-control'}))
    last_name = forms.CharField(max_length=50,
                                label="Apellidos", required=True,
                                widget=forms.widgets.TextInput(
                                    attrs={'type': 'text', 'class': 'form-control'}))
    email = forms.EmailField(
        label="email", required=True,
        widget=forms.widgets.EmailInput(
            attrs={'type': 'email', 'class': 'form-control'}))

    password1 = forms.CharField(max_length=50,
                                label="Contraseña", required=True,
                                widget=forms.widgets.PasswordInput(
                                    attrs={'type': 'password', 'class': 'form-control'}))

    password2 = forms.CharField(max_length=50,
                                label="Repita la contraseña", required=True,
                                widget=forms.widgets.PasswordInput(
                                    attrs={'type': 'password', 'class': 'form-control'}))

    # TODO estos son los campos field del model o modelo user para tomar en cuenta en el formulario
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password1', 'password2']
