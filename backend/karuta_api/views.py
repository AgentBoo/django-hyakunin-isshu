from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Poem, Translation
from .serializers import PoemSerializer, TranslationSerializer

# Create your views here.

class PoemViewSet(viewsets.ReadOnlyModelViewSet):
	queryset = Poem.objects.all()
	serializer_class = PoemSerializer

	@action(methods=['get'], detail=True)
	def translations(self, request, pk):
		queryset = self.get_object().translations 
		serializer = TranslationSerializer(queryset, many=True)
		return Response(serializer.data, status=status.HTTP_200_OK)


class TranslationViewSet(viewsets.ModelViewSet):
	queryset = Translation.objects.all()
	serializer_class = TranslationSerializer