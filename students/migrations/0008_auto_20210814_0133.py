# Generated by Django 3.1.7 on 2021-08-13 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0007_auto_20210814_0116'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentgrade',
            name='grade',
            field=models.DecimalField(decimal_places=2, max_digits=4),
        ),
    ]
