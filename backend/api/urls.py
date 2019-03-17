from django.urls import path
from .views import PoemList 

# Create your routes here.

urlpatterns = [
	path('poems/', PoemList.as_view())
]

