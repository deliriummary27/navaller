from rest_framework.routers import DefaultRouter
from .views import AdmiralViewSet, TimelineViewSet, ArticleViewSet, CommentViewSet,  QuestionViewSet, OptionViewSet, ProfileViewSet, LikeViewSet

router = DefaultRouter()
router.register(r'articles', ArticleViewSet, basename='articles')
router.register(r'comments', CommentViewSet, basename='comments')
router.register(r'admirals', AdmiralViewSet, basename='admirals')
router.register(r'timeline', TimelineViewSet, basename='timeline')
router.register(r'questions', QuestionViewSet, basename='questions')
router.register(r'options', OptionViewSet, basename='options')
router.register(r'likes', LikeViewSet, basename='likes')
router.register(r'profiles', ProfileViewSet, basename='profiles')
urlpatterns = router.urls
