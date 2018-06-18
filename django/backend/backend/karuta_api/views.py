from rest_framework import generics 
from .models import Poem
from .serializers import PoemSerializer 


# Create your views here.

class PoemList(generics.ListAPIView):
	queryset = Poem.objects.all().order_by('numeral')
	serializer_class = PoemSerializer

class PoemDetail(generics.RetrieveUpdateAPIView):
	lookup_field = 'numeral'
	queryset = Poem.objects.all().order_by('numeral')
	serializer_class = PoemSerializer