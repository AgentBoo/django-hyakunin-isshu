from django.db.models import Subquery 
from .models import Poem, Translation 
from .serializers import PoemSerializer

# Create your views here.

class PoemList(generics.ListAPIView):
    queryset = Poem.objects.annotate(eng=Subquery(translations.filter(default=True)))
    serializer_class = PoemSerializer