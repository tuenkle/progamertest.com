# Generated by Django 4.1.7 on 2023-03-10 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cps', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cpsresult',
            name='score',
        ),
        migrations.AddField(
            model_name='cpsresult',
            name='cps_result',
            field=models.FloatField(default=1),
            preserve_default=False,
        ),
    ]