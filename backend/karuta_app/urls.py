from django.urls import path
from .views import reactKarutaApp


urlpatterns = [
	path('', reactKarutaApp, name='react-karuta'),
]