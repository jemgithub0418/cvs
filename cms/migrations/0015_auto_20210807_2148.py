# Generated by Django 3.1.7 on 2021-08-07 13:48

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0014_auto_20210807_1626'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vision',
            name='vision',
            field=ckeditor.fields.RichTextField(),
        ),
    ]
