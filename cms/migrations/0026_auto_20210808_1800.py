# Generated by Django 3.1.7 on 2021-08-08 10:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0025_auto_20210808_1755'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schoolofficehours',
            name='closing',
            field=models.PositiveSmallIntegerField(choices=[('5', '10AM'), ('10', '3PM'), ('2', '7AM'), ('13', '6PM'), ('8', '1PM'), ('12', '5PM'), ('11', '4PM'), ('1', '6AM'), ('9', '2PM'), ('14', '7PM'), ('16', '9PM'), ('4', '9AM'), ('6', '11AM'), ('7', '12NN'), ('3', '8AM'), ('15', '8PM')], default='12'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='last_day',
            field=models.PositiveSmallIntegerField(choices=[('4', 'Thursday'), ('3', 'Wednesday'), ('2', 'Tuesday'), ('7', 'Sunday'), ('1', 'Monday'), ('6', 'Saturday'), ('5', 'Friday')], default='5'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='opening',
            field=models.PositiveSmallIntegerField(choices=[('5', '10AM'), ('10', '3PM'), ('2', '7AM'), ('13', '6PM'), ('8', '1PM'), ('12', '5PM'), ('11', '4PM'), ('1', '6AM'), ('9', '2PM'), ('14', '7PM'), ('16', '9PM'), ('4', '9AM'), ('6', '11AM'), ('7', '12NN'), ('3', '8AM'), ('15', '8PM')], default='3'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='starting_day',
            field=models.PositiveSmallIntegerField(choices=[('4', 'Thursday'), ('3', 'Wednesday'), ('2', 'Tuesday'), ('7', 'Sunday'), ('1', 'Monday'), ('6', 'Saturday'), ('5', 'Friday')], default='1'),
        ),
    ]
