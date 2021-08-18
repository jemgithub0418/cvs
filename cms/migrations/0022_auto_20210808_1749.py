# Generated by Django 3.1.7 on 2021-08-08 09:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0021_auto_20210808_1737'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schoolofficehours',
            name='closing',
            field=models.CharField(choices=[('10', '3PM'), ('11', '4PM'), ('3', '8AM'), ('13', '6PM'), ('6', '11AM'), ('9', '2PM'), ('12', '5PM'), ('5', '10AM'), ('4', '9AM'), ('16', '9PM'), ('7', '12NN'), ('14', '7PM'), ('2', '7AM'), ('15', '8PM'), ('1', '6AM'), ('8', '1PM')], default='5PM', max_length=4),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='last_day',
            field=models.CharField(choices=[('7', 'Sunday'), ('3', 'Wednesday'), ('5', 'Friday'), ('4', 'Thursday'), ('6', 'Saturday'), ('2', 'Tuesday'), ('1', 'Monday')], default='Friday', max_length=12),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='opening',
            field=models.CharField(choices=[('10', '3PM'), ('11', '4PM'), ('3', '8AM'), ('13', '6PM'), ('6', '11AM'), ('9', '2PM'), ('12', '5PM'), ('5', '10AM'), ('4', '9AM'), ('16', '9PM'), ('7', '12NN'), ('14', '7PM'), ('2', '7AM'), ('15', '8PM'), ('1', '6AM'), ('8', '1PM')], default='8AM', max_length=4),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='starting_day',
            field=models.CharField(choices=[('7', 'Sunday'), ('3', 'Wednesday'), ('5', 'Friday'), ('4', 'Thursday'), ('6', 'Saturday'), ('2', 'Tuesday'), ('1', 'Monday')], default='Monday', max_length=12),
        ),
    ]
