# Generated by Django 3.1.7 on 2021-07-09 09:47

import cms.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0005_remove_schoollogo_ext'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schoollogo',
            name='image',
            field=models.ImageField(max_length=255, upload_to=cms.models.UploadToPathAndRename),
        ),
    ]