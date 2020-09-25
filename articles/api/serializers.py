from rest_framework import serializers
from articles.models import  Admiral, Timeline, Article, Comment, Question, Option, Profile, Like
from drf_writable_nested.serializers import WritableNestedModelSerializer
from rest_auth.serializers import TokenSerializer
from django.contrib.auth import get_user_model

class ArticleSerializer(serializers.ModelSerializer):
    authorName = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Article
        fields = ('id', 'title', 'author', 'authorName', 'content', 'date', 'image')


class AdmiralSerializer(serializers.ModelSerializer):
    authorName = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Admiral
        fields = ('id', 'title',  'subtitle', 'author', 'authorName', 'content', 'date', 'image')

class TimelineSerializer(serializers.ModelSerializer):
    authorName = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Timeline
        fields = ('id', 'title', 'author', 'authorName', 'year', 'image', 'des')

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ('id', 'name', 'content', 'article', 'admiral', 'timeline')

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ('id', 'ques', 'article', 'admiral', 'timeline')

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'opt', 'votes', 'question')

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ('id', 'article', 'admiral', 'timeline', 'likes', 'people')

class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username')


class CustomTokenSerializer(TokenSerializer):
    user = UserTokenSerializer(read_only=True)

    class Meta(TokenSerializer.Meta):
        fields = ('key', 'user')

class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Profile
        fields = ('id', 'user', 'username', 'email', 'phone', 'country', 'instagram', 'twitter', 'youtube', 'photo', 'bio')