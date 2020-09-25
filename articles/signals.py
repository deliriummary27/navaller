from .models import Article, Like, Admiral, Timeline
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Article)
def create_like_article(sender, instance, created, **kwargs):
    if created:
        Like.objects.create(article=instance)


@receiver(post_save, sender=Article)
def save_like_article(sender, instance, **kwargs):
    instance.like.save() 

@receiver(post_save, sender=Admiral)
def create_like_admiral(sender, instance, created, **kwargs):
    if created:
        Like.objects.create(admiral=instance)


@receiver(post_save, sender=Admiral)
def save_like_admiral(sender, instance, **kwargs):
    instance.like.save()

@receiver(post_save, sender=Timeline)
def create_like_timeline(sender, instance, created, **kwargs):
    if created:
        Like.objects.create(timeline=instance)


@receiver(post_save, sender=Timeline)
def save_likr_timeline(sender, instance, **kwargs):
    instance.like.save()