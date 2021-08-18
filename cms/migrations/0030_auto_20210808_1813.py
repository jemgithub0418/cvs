# Generated by Django 3.1.7 on 2021-08-08 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0029_auto_20210808_1809'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schoolofficehours',
            name='closing',
            field=models.PositiveSmallIntegerField(choices=[(9, '2PM'), (16, '9PM'), (14, '7PM'), (6, '11AM'), (11, '4PM'), (4, '9AM'), (12, '5PM'), (5, '10AM'), (3, '8AM'), (2, '7AM'), (7, '12NN'), (8, '1PM'), (15, '8PM'), (1, '6AM'), (10, '3PM'), (13, '6PM')], default='12'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='last_day',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Monday'), (2, 'Tuesday'), (4, 'Thursday'), (7, 'Sunday'), (3, 'Wednesday'), (6, 'Saturday'), (5, 'Friday')], default='5'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='opening',
            field=models.PositiveSmallIntegerField(choices=[(9, '2PM'), (16, '9PM'), (14, '7PM'), (6, '11AM'), (11, '4PM'), (4, '9AM'), (12, '5PM'), (5, '10AM'), (3, '8AM'), (2, '7AM'), (7, '12NN'), (8, '1PM'), (15, '8PM'), (1, '6AM'), (10, '3PM'), (13, '6PM')], default='3'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='starting_day',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Monday'), (2, 'Tuesday'), (4, 'Thursday'), (7, 'Sunday'), (3, 'Wednesday'), (6, 'Saturday'), (5, 'Friday')], default='1'),
        ),
    ]
