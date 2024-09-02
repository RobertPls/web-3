from django import forms
from django.contrib.auth.models import User

from reunion.models import Reunion, ReunionUsuario

#TODO se crea un campo para el input de usuarios dentro del form, para que se vean el nombre y apellido del user
# y no asi su "username", se hace para no modigicar el __str__ de la clase usuario
class MyModelChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return f"{obj.first_name} {obj.last_name}"

#TODO formulario de la tabla intermedia de reunion y usuario, la tabla donde se ponen los participantes y solo
# recibe el usuario y la reunion, la reunion esta en oculto ya que sabemos previamente a que reunion agregaremos un
# participante, aqui el participante utiliza el modelo que extendimos anteriormente
class ReunionUsuarioCreateForm(forms.ModelForm):
    user_id = MyModelChoiceField(
        label="Usuario", queryset=User.objects.all(),
        widget=forms.widgets.Select(attrs={'type': 'option', 'class': 'form-control'}))
    reunion_id = forms.ModelChoiceField(
        queryset=Reunion.objects.all(),
        widget=forms.HiddenInput())

    # TODO estos son los campos field del model o modelo intermedio de usuario y reunion que se tomara en cuenta para el form
    class Meta:
        model = ReunionUsuario
        fields = ['user_id', 'reunion_id']
