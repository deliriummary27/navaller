from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Article(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    image = models.ImageField(default='default.jpg', upload_to='media')

    def __str__(self):
        return self.title


class Admiral(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=300)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    image = models.ImageField(default='Nimitz.jpg', upload_to='media')

    def __str__(self):
        return self.title

class Timeline(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    year = models.FloatField()
    image = models.ImageField(default='Nimitz.jpg', upload_to='media')
    des = models.TextField()

    def __str__(self):
        return self.title

class Comment(models.Model):
    name = models.CharField(max_length=100)
    content = models.TextField()
    article = models.ForeignKey(Article, on_delete=models.CASCADE, null=True, blank=True)
    admiral = models.ForeignKey(Admiral, on_delete=models.CASCADE, null=True, blank=True)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE, null=True, blank=True)

class Question(models.Model):
    ques = models.CharField(max_length=1000)
    article = models.ForeignKey(Article, on_delete=models.CASCADE, null=True, blank=True)
    admiral = models.ForeignKey(Admiral, on_delete=models.CASCADE, null=True, blank=True)
    timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.ques
    
class Option(models.Model):
    opt = models.CharField(max_length=1000)
    votes = models.IntegerField(default=0)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, null=True)

class Like(models.Model):
    article = models.OneToOneField(Article, on_delete=models.CASCADE, null=True)
    admiral = models.OneToOneField(Admiral, on_delete=models.CASCADE, null=True)
    timeline = models.OneToOneField(Timeline, on_delete=models.CASCADE, null=True)
    likes = models.IntegerField(default=0)
    people = models.IntegerField(default=0)

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField(null=True, blank=True)
    phone = models.CharField(max_length=100, null=True, blank=True)
    country = models.CharField(max_length=1000, null=True, blank=True)
    instagram = models.CharField(max_length=1000, null=True, blank=True)
    twitter = models.CharField(max_length=1000, null=True, blank=True)
    youtube = models.CharField(max_length=1000, null=True, blank=True)
    photo = models.ImageField(default='Nimitz.jpg', upload_to='media')
    bio = models.CharField(max_length=1000)
