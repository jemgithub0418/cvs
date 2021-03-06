# Generated by Django 3.1.7 on 2021-07-23 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0011_auto_20210722_2024'),
    ]

    operations = [
        migrations.CreateModel(
            name='SiteHeaderImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(max_length=255, upload_to='Site Header Image')),
            ],
            options={
                'verbose_name_plural': 'Site Header',
            },
        ),
        migrations.AlterModelOptions(
            name='sitebackground',
            options={'verbose_name_plural': 'Site Background'},
        ),
    ]
