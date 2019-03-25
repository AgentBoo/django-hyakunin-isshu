from django.urls import path
from .views import PoemList, PoemDetail 

# Create your routes here.

urlpatterns = [
	path('poems/', PoemList.as_view()),
	path('poems/<int:pk>/', PoemDetail.as_view())
]

