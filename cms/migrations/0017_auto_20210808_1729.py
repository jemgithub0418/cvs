# Generated by Django 3.1.7 on 2021-08-08 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0016_schooladdress_schoolcontactnumbers_schoolemail_schoolofficehours'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='schoolcontactnumbers',
            options={'verbose_name_plural': 'Contact Numbers'},
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='closing',
            field=models.CharField(choices=[('9AM', '9AM'), ('3PM', '3PM'), ('5PM', '5PM'), ('7AM', '7AM'), ('12NN', '12NN'), ('1PM', '1PM'), ('8PM', '8PM'), ('6AM', '6AM'), ('8AM', '8AM'), ('11AM', '11AM'), ('7PM', '7PM'), ('6PM', '6PM'), ('9PM', '9PM'), ('2PM', '2PM'), ('10AM', '10AM'), ('4PM', '4PM')], default='5PM', max_length=4),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='last_day',
            field=models.CharField(choices=[('Saturday', 'Saturday'), ('Friday', 'Friday'), ('Wednesday', 'Wednesday'), ('Monday', 'Monday'), ('Sunday', 'Sunday'), ('Tuesday', 'Tuesday'), ('Thursday', 'Thursday')], default='Friday', max_length=12),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='opening',
            field=models.CharField(choices=[('9AM', '9AM'), ('3PM', '3PM'), ('5PM', '5PM'), ('7AM', '7AM'), ('12NN', '12NN'), ('1PM', '1PM'), ('8PM', '8PM'), ('6AM', '6AM'), ('8AM', '8AM'), ('11AM', '11AM'), ('7PM', '7PM'), ('6PM', '6PM'), ('9PM', '9PM'), ('2PM', '2PM'), ('10AM', '10AM'), ('4PM', '4PM')], default='8AM', max_length=4),
        ),
        migrations.AlterField(
            model_name='schoolofficehours',
            name='starting_day',
            field=models.CharField(choices=[('Saturday', 'Saturday'), ('Friday', 'Friday'), ('Wednesday', 'Wednesday'), ('Monday', 'Monday'), ('Sunday', 'Sunday'), ('Tuesday', 'Tuesday'), ('Thursday', 'Thursday')], default='Monday', max_length=12),
        ),
    ]
