from rest_framework.routers import SimpleRouter
from .views import PoemViewSet


router = SimpleRouter(trailing_slash=False)
router.register(r'poems', PoemViewSet, base_name='poem')

urlpatterns = router.urls