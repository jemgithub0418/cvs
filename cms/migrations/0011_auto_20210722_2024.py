# Generated by Django 3.1.7 on 2021-07-22 12:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0010_imagebesidemissionvision'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteBackground',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(max_length=255, upload_to='Site Background')),
            ],
            options={
                'verbose_name_plural': 'Site SiteBackground',
            },
        ),
        migrations.AlterModelOptions(
            name='imagebesidemissionvision',
            options={'verbose_name_plural': 'Image Beside Mission Vision'},
        ),
    ]