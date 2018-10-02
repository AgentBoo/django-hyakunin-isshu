from rest_framework.routers import SimpleRouter
from .views import PoemViewSet, TranslationViewSet


router = SimpleRouter(trailing_slash=False)
router.register(r'poems', PoemViewSet, base_name='poem')
router.register(r'translations', TranslationViewSet, base_name='translation')

urlpatterns = router.urls