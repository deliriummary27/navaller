# Generated by Django 3.0.8 on 2020-09-09 18:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0017_like_people'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='admiral',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Admiral'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='article',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Article'),
        ),
        migrations.AlterField(
            model_name='comment',
            name='timeline',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Timeline'),
        ),
        migrations.AlterField(
            model_name='like',
            name='admiral',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Admiral'),
        ),
        migrations.AlterField(
            model_name='like',
            name='article',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Article'),
        ),
        migrations.AlterField(
            model_name='like',
            name='timeline',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Timeline'),
        ),
        migrations.AlterField(
            model_name='question',
            name='admiral',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Admiral'),
        ),
        migrations.AlterField(
            model_name='question',
            name='article',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Article'),
        ),
        migrations.AlterField(
            model_name='question',
            name='timeline',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='articles.Timeline'),
        ),
    ]
