# Generated by Django 3.0.8 on 2020-09-04 04:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0016_like'),
    ]

    operations = [
        migrations.AddField(
            model_name='like',
            name='people',
            field=models.IntegerField(default=0),
        ),
    ]
