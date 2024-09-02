# Generated by Django 4.2 on 2023-05-22 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiepractico3web3django', '0002_generojuego'),
    ]

    operations = [
        migrations.AddField(
            model_name='genero',
            name='imagen',
            field=models.FileField(blank='', default='default.jpg', upload_to='genero/'),
        ),
        migrations.AddField(
            model_name='juego',
            name='imagen',
            field=models.ImageField(blank='', default='default.jpg', upload_to='juego/'),
        ),
    ]
