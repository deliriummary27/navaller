# Generated by Django 3.0.8 on 2020-08-19 02:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0008_question_article'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='admiral',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='articles.Admiral'),
        ),
        migrations.AddField(
            model_name='comment',
            name='articleType',
            field=models.CharField(choices=[('AT', 'article'), ('AD', 'admiral'), ('TM', 'timeline')], max_length=2, null=True),
        ),
        migrations.AddField(
            model_name='comment',
            name='timeline',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.DO_NOTHING, to='articles.Timeline'),
        ),
    ]
