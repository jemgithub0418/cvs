# Generated by Django 3.1.7 on 2021-08-13 16:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('students', '0002_remove_student_student_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='student',
            field=models.OneToOneField(default=81, limit_choices_to=models.Q(is_student=True), on_delete=django.db.models.deletion.CASCADE, to='accounts.user'),
            preserve_default=False,
        ),
    ]
