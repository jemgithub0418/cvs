# Generated by Django 3.1.7 on 2021-08-14 09:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0019_section_year_level'),
        ('students', '0009_student_section'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='section',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='main.section'),
        ),
    ]
