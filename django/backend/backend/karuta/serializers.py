from rest_framework import serializers 
from backend.karuta.models import Poem, Author

class PoemSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = Poem 
		fields = ('jap','rom','eng')
