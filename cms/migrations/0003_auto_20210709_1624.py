# Generated by Django 3.1.7 on 2021-07-09 08:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0002_auto_20210709_1607'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schoollogo',
            name='ext',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
