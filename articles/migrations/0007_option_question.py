# Generated by Django 3.0.8 on 2020-08-15 19:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0006_auto_20200814_2209'),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ques', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Option',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('opt', models.CharField(max_length=1000)),
                ('votes', models.IntegerField(default=0)),
                ('question', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Question')),
            ],
        ),
    ]
