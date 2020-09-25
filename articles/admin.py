from django.contrib import admin
from .models import Article, Comment,  Question, Option, Profile, Like

admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(Question)
admin.site.register(Option)
admin.site.register(Profile)
admin.site.register(Like)