# Generated by Django 3.1.7 on 2021-08-10 08:31

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20210810_1628'),
    ]

    operations = [
        migrations.AddField(
            model_name='newsandannouncements',
            name='description',
            field=ckeditor.fields.RichTextField(blank=True),
        ),
    ]
