# Generated by Django 2.0.5 on 2018-08-27 18:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('karuta_api', '0002_auto_20180827_1807'),
    ]

    operations = [
        migrations.AlterIndexTogether(
            name='translation',
            index_together={('poem', 'translator')},
        ),
    ]