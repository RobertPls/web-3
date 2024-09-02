from django import forms
from reunion.models import Reunion


# TODO aqui es otro formulario ya que para editar solo se modificara el nombre y la fecha, el usuario dueño no se cambiara
# en ningun momento
class ReunionEditForm(forms.ModelForm):
    nombre = forms.CharField(label="Nombre", required=True, max_length=50,
                             widget=forms.widgets.TextInput(attrs={'type': 'text', 'class': 'form-control'}))
    fecha_hora = forms.DateTimeField(label="Fecha y hora", required=True,
                                     widget=forms.widgets.TextInput(
                                         attrs={'type': 'datetime-local', 'class': 'form-control'}))

    # TODO esto son los campos field del modelo o model reunion que se utilizara para el campo de editar
    class Meta:
        model = Reunion
        fields = ['nombre', 'fecha_hora']
