# Generated by Django 3.1.7 on 2021-04-22 04:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_blog'),
    ]

    operations = [
        migrations.RenameField(
            model_name='blog',
            old_name='author',
            new_name='author_author',
        ),
        migrations.RenameField(
            model_name='blog',
            old_name='content',
            new_name='content_content',
        ),
        migrations.RenameField(
            model_name='blog',
            old_name='title',
            new_name='title_title',
        ),
    ]