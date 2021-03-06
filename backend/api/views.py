from django.http import Http404
from rest_framework import generics 
from .models import Poem
from .serializers import PoemSerializer, ComplementSerializer

# Create your views here.

ORIGINAL_SOURCE = 'Clay MacCauley'

class PoemList(generics.ListAPIView):
	'''
	It is not possible to annotate and get a complete related model instance
	https://blog.roseman.org.uk/2010/08/14/getting-related-item-aggregate/
	'''
	queryset = Poem.objects.filter(source__title=ORIGINAL_SOURCE)
	serializer_class = PoemSerializer


class PoemDetail(generics.RetrieveAPIView):
	queryset = Poem.objects.all()
	serializer_class = ComplementSerializer
	# both lookup_url_kwarg and lookup_field must be set 
	# https://www.django-rest-framework.org/api-guide/generic-views/#attributes
	lookup_url_kwarg = 'pk'
	lookup_field = 'numeral'