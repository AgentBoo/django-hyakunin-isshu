from rest_framework import serializers 
from .models import Poem, Author


class AuthorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Author
		fields = ('id','jap', 'rom', 'eng') 


class PoemSerializer(serializers.ModelSerializer):
	class Meta:
		model = Poem 
		fields = ('id','numeral')


class PoemsSerializer(serializers.ModelSerializer):
	author = AuthorSerializer(read_only=True)

	class Meta:
		model = Poem 
		fields = ('id','author','jap','rom','eng')