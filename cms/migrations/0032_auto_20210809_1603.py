# Generated by Django 3.1.7 on 2021-08-09 08:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0031_auto_20210809_1600'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schoolofficehours',
            name='closing',
            field=models.PositiveSmallIntegerField(choices=[(1, '6AM'), (2, '7AM'), (3, '8AM'), (4, '9AM'), (5, '10AM'), (6, '11AM'), (7, '12NN'), (8, '1PM'), (9, '2PM'), (10, '3PM'), (11, '4PM'), (12, '5PM'), (13, '6PM'), (14, '7PM'), (15, '8PM'), (16, '9PM')], default='12'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='last_day',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Monday'), (2, 'Tuesday'), (3, 'Wednesday'), (4, 'Thursday'), (5, 'Friday'), (6, 'Saturday'), (7, 'Sunday')], default='5'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='opening',
            field=models.PositiveSmallIntegerField(choices=[(1, '6AM'), (2, '7AM'), (3, '8AM'), (4, '9AM'), (5, '10AM'), (6, '11AM'), (7, '12NN'), (8, '1PM'), (9, '2PM'), (10, '3PM'), (11, '4PM'), (12, '5PM'), (13, '6PM'), (14, '7PM'), (15, '8PM'), (16, '9PM')], default='3'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='starting_day',
            field=models.PositiveSmallIntegerField(choices=[(1, 'Monday'), (2, 'Tuesday'), (3, 'Wednesday'), (4, 'Thursday'), (5, 'Friday'), (6, 'Saturday'), (7, 'Sunday')], default='1'),
        ),
    ]
