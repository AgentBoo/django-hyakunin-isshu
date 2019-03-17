from django.db.models import Q 
from rest_framework import generics 
from .models import Poem, Translation 
from .serializers import PoemSerializer

# Create your views here.

class PoemList(generics.ListAPIView):
	'''
	It is not possible to annotate and get complete related model instance
	https://blog.roseman.org.uk/2010/08/14/getting-related-item-aggregate/
	'''
	queryset = Poem.objects.all()
	serializer_class = PoemSerializer