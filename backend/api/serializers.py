from rest_framework import serializers 
from .models import Poem, Translation

# Create your serializers here.

class JapaneseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Poem 
		fields = ('author', 'verses')


class JapaneseExtSerializer(JapaneseSerializer):
	class Meta(JapaneseSerializer.Meta):
		fields = ('numeral', 'author', 'verses')


class RomajiSerializer(serializers.ModelSerializer):
	author = serializers.CharField(source='romanized_author')
	verses = serializers.CharField(source='romanized_verses')
	
	class Meta:
		model = Poem
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


class PoemSerializer(serializers.ModelSerializer):
	jap = JapaneseSerializer(Poem.objects.all(), read_only=True)
	rom = RomajiSerializer(read_only=True)
	eng = serializers.SerializerMethodField(read_only=True)

	def get_eng(self, obj):
		translation = obj.translations.get(default=True)
		return TranslationSerializer(translation, read_only=True).data 

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

