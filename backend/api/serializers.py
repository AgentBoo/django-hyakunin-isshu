from rest_framework import serializers 
from .models import Poem, Translation, Media

# Create your serializers here.

ORIGINAL_SOURCE = 'Clay MacCauley'

class MediaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Media 
		fields = ('category', 'title', 'poem')
		read_only_fields = ('category', 'title', 'poem')


class TranslationSerializer(serializers.ModelSerializer):
	# Serialize lists using ListField 
	# https://www.django-rest-framework.org/api-guide/fields/
	numeral = serializers.IntegerField(source='poem.numeral')
	author = serializers.CharField(source='translated_author')
	verses = serializers.ListField(source='translated_verses', child=serializers.CharField())

	class Meta:
		model = Translation 
		fields = ('id', 'numeral', 'translator', 'author', 'verses')
		read_only_fields = ('id', 'numeral', 'translator', 'author', 'verses')


class PoemSerializer(serializers.ModelSerializer):
	# Serializer method field 
	# https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield

	jap = serializers.SerializerMethodField()
	rom = serializers.SerializerMethodField()
	eng = serializers.SerializerMethodField()

	def get_jap(self, obj):
		return {
			'numeral': obj.numeral,
			'author': obj.author,
			'verses': obj.verses
		} 

	def get_rom(self, obj):
		return {
			'numeral': obj.numeral,
			'author': obj.romanized_author,
			'verses': obj.romanized_verses
		} 

	def get_eng(self, obj):
		translation = obj.translations.get(translator=ORIGINAL_SOURCE)
		return {
			'numeral': obj.numeral,
			'author': translation.translated_author,
			'verses': translation.translated_verses
		} 

	class Meta:
		model = Poem 
		fields = ('id', 'jap', 'rom', 'eng')
		read_only_fields = ('id', 'jap', 'rom', 'eng')


class ComplementSerializer(serializers.ModelSerializer):
	source = serializers.URLField(source='source.url')
	media = MediaSerializer(many=True, read_only=True)
	translations = TranslationSerializer(many=True, read_only=True)

	class Meta:
		model = Poem 
		fields = ('id', 'source', 'media', 'translations')
		read_only_fields = ('id', 'source', 'media', 'translations')



