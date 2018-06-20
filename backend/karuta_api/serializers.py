from rest_framework import serializers 
from .models import Poem, Author


class AuthorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Author
		fields = ('jap', 'rom', 'eng') 


class PoemSerializer(serializers.ModelSerializer):
	author = AuthorSerializer(read_only=True)

	class Meta:
		model = Poem 
		fields = ('author','jap','rom','eng')