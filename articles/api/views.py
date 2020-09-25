from rest_framework import viewsets
from .serializers import AdmiralSerializer, TimelineSerializer, ArticleSerializer, CommentSerializer,  QuestionSerializer,  OptionSerializer, CustomTokenSerializer, ProfileSerializer, LikeSerializer
from articles.models import Admiral, Timeline, Article, Comment, Question, Option, Profile, Like

class ArticleViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    queryset = Article.objects.all()

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class AdmiralViewSet(viewsets.ModelViewSet):
    serializer_class = AdmiralSerializer
    queryset = Admiral.objects.all()

class TimelineViewSet(viewsets.ModelViewSet):
    serializer_class = TimelineSerializer
    queryset = Timeline.objects.all()

class QuestionViewSet(viewsets.ModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

class OptionViewSet(viewsets.ModelViewSet):
    serializer_class = OptionSerializer
    queryset = Option.objects.all()

class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    queryset = Like.objects.all()

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

