# Generated by Django 2.0.5 on 2018-06-07 00:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poems', '0003_auto_20180606_2359'),
    ]

    operations = [
        migrations.CreateModel(
            name='Jap',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=100)),
            ],
        ),
    ]
