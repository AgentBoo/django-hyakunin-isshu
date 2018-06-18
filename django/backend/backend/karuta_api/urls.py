from django.urls import path
from .views import PoemList, PoemDetail


urlpatterns = [
	path('poems', PoemList.as_view(), name='poem-list'),
	path('poems/<int:numeral>', PoemDetail.as_view(), name='poem-detail')
]