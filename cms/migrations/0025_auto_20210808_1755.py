# Generated by Django 3.1.7 on 2021-08-08 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0024_auto_20210808_1751'),
    ]

    operations = [
        migrations.AlterField(
            model_name='schoolofficehours',
            name='closing',
            field=models.IntegerField(choices=[(11, '4PM'), (14, '7PM'), (13, '6PM'), (16, '9PM'), (2, '7AM'), (3, '8AM'), (8, '1PM'), (4, '9AM'), (15, '8PM'), (10, '3PM'), (5, '10AM'), (12, '5PM'), (7, '12NN'), (1, '6AM'), (6, '11AM'), (9, '2PM')], default='12'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='last_day',
            field=models.IntegerField(choices=[(6, 'Saturday'), (5, 'Friday'), (1, 'Monday'), (2, 'Tuesday'), (7, 'Sunday'), (3, 'Wednesday'), (4, 'Thursday')], default='5'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='opening',
            field=models.IntegerField(choices=[(11, '4PM'), (14, '7PM'), (13, '6PM'), (16, '9PM'), (2, '7AM'), (3, '8AM'), (8, '1PM'), (4, '9AM'), (15, '8PM'), (10, '3PM'), (5, '10AM'), (12, '5PM'), (7, '12NN'), (1, '6AM'), (6, '11AM'), (9, '2PM')], default='3'),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='starting_day',
            field=models.IntegerField(choices=[(6, 'Saturday'), (5, 'Friday'), (1, 'Monday'), (2, 'Tuesday'), (7, 'Sunday'), (3, 'Wednesday'), (4, 'Thursday')], default='1'),
        ),
    ]
