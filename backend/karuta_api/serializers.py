from rest_framework import serializers 
from .models import Poem, Author

# Create your serializers here.

class AuthorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Author
		fields = ('id', 'jap', 'rom', 'eng') 


class PoemSerializer(serializers.ModelSerializer):
	author = AuthorSerializer(read_only=True)

	class Meta:
		model = Poem 
		fields = ('id','author','jap','rom','eng')

