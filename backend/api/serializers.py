from rest_framework import serializers 
from .models import Poem, Translation, Media

# Create your serializers here.

ORIGINAL_SOURCE = 'Clay MacCauley'

class PoemSerializer(serializers.ModelSerializer):
	# Serializer method field 
	# https://www.django-rest-framework.org/api-guide/fields/#serializermethodfield

	jap = serializers.SerializerMethodField()
	rom = serializers.SerializerMethodField()
	eng = serializers.SerializerMethodField()

	def get_jap(self, obj):
		return {
			'author': obj.author,
			'verses': obj.verses
		} 

	def get_rom(self, obj):
		return {
			'author': obj.romanized_author,
			'verses': obj.romanized_verses
		} 

	def get_eng(self, obj):
		translation = obj.translations.get(translator=ORIGINAL_SOURCE)
		return {
			'author': translation.translated_author,
			'verses': translation.translated_verses
		} 

	class Meta:
		model = Poem 
		fields = ('id', 'jap', 'rom', 'eng')
		read_only_fields = ('id', 'jap', 'rom', 'eng')


class TranslationSerializer(serializers.ModelSerializer):
	author = serializers.CharField(source='translated_author')
	verses = serializers.CharField(source='translated_verses')

	class Meta:
		model = Translation 
		fields = ('translator', 'author', 'verses')
		read_only_fields = ('translator', 'author', 'verses')


class MediaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Media 
		fields = ('category', 'title', 'poem')
		read_only_fields = ('category', 'title', 'poem')


class ComplementSerializer(serializers.ModelSerializer):
	source = serializers.URLField(source='source.url')
	translations = TranslationSerializer(many=True, read_only=True)
	media = MediaSerializer(many=True, read_only=True)

	class Meta:
		model = Poem 
		fields = ('id', 'source', 'translations', 'media')
		read_only_fields = ('id', 'source', 'translations', 'media')



