from django import forms
from django.contrib.auth.models import User
from reunion.models import Reunion

#TODO form para la creacion de reuniones, solo se agrega el nombre la fecha y el input de usuario se pone en oculto por que se lo
# agrega en el view ya que el dueño es el usuario logueado en la aplicacion igual tiene para agregale clases al html
class ReunionCreateForm(forms.ModelForm):
    nombre = forms.CharField(label="Nombre", required=True, max_length=50,
                             widget=forms.widgets.TextInput(attrs={'type': 'text', 'class': 'form-control'}))
    fecha_hora = forms.DateTimeField(label="Fecha y hora", required=True,
                                     widget=forms.widgets.TextInput(
                                         attrs={'type': 'datetime-local', 'class': 'form-control'}))
    user_id = forms.ModelChoiceField(
        queryset=User.objects.all(),
        widget=forms.HiddenInput())

    # TODO esto son los campos o fields que se utilizara del modelo o model Reunion
    class Meta:
        model = Reunion
        fields = ['nombre', 'fecha_hora', 'user_id']
