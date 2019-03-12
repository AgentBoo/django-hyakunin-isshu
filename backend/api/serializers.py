from rest_framework import serializers 
from .models import Poem, Romanization, Translation

# Create your serializers here.

class PoemSerializer(serializers.ModelSerializer):
	jap = JapaneseSerializer(read_only=True)
	rom = RomajiSerializer(read_only=True)
	eng = TranslationSerializer(read_only=True)

	class Meta:
		model = Poem 
		fields = ('numeral', 'jap', 'rom', 'eng')


class PoemSetSerializer(serializers.ModelSerializer):
	jap = JapaneseSerializer(read_only=True)
	rom = RomajiSerializer(read_only=True)
	translations = TranslationSerializer(many=True, read_only=True)

	class Meta:
		model = Poem 
		fields = ('numeral', 'jap', 'rom', 'translations')


class JapaneseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Poem 
		fields = ('author', 'verses')


class JapaneseExtSerializer(JapaneseSerializer):
	class Meta(JapaneseSerializer.Meta):
		fields = ('numeral', 'author', 'verses')


class RomajiSerializer(serializers.ModelSerializer):
	author = serializers.CharField(source='romanized_author')
	verses = serializers.ArrayField(source='romanized_verses')
	
	class Meta:
		model = Romanization
		fields = ('author', 'verses')


class RomajiExtSerializer(JapaneseSerializer):
	class Meta(RomajiSerializer.Meta):
		fields = ('numeral', 'author', 'verses')


class TranslationSerializer(serializers.ModelSerializer):
	author = serializers.CharField(source='translated_author')
	verses = serializers.CharField(source='translated_verses')

	class Meta:
		model = Translation 
		fields = ('author', 'verses', 'translator')

