# Generated by Django 3.1.7 on 2021-08-14 11:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('students', '0013_studentprofile_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='adviser',
            field=models.ForeignKey(blank=True, limit_choices_to=models.Q(is_teacher=True), null=True, on_delete=django.db.models.deletion.CASCADE, related_name='adviser', to=settings.AUTH_USER_MODEL),
        ),
    ]
