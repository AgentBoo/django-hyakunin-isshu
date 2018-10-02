from rest_framework import serializers 
from .models import Poem, Translation

# Create your serializers here.

class PoemSerializer(serializers.ModelSerializer):
	eng = serializers.SerializerMethodField() 

	class Meta:
		model = Poem 
		fields = ('id', 'jap', 'rom', 'eng')

	def get_eng(self,obj):
		return obj.translations.get(translator=obj.preferred_translator).eng


class TranslationSerializer(serializers.ModelSerializer):
	class Meta:
		model = Translation 
		fields = ('id', 'translator', 'eng')