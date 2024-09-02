from django import forms
from django.contrib.auth.models import User

#TODO para editar el usuario solo se cambiara el nombre apellido y el email, por lo tanto se usa otro formulario
class UserEditForm(forms.ModelForm):
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

    # TODO campos field del podel o modelo user que se tomara en cuenta para el formulario
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email')
