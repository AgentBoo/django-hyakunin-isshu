from rest_framework import viewsets
from .models import Poem
from .serializers import PoemSerializer

# Create your views here.

class PoemViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Poem.objects.all()
	serializer_class = PoemSerializer


