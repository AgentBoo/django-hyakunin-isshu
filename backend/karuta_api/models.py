from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class Poem(models.Model):
	numeral = models.PositiveIntegerField(blank=True, null=True, unique=True)
	preferred_translator = models.CharField(max_length=100, blank=True, default='Unknown')
	jap = ArrayField(models.CharField(max_length=100, blank=True, default='No verse'), size=6, blank=True, null=True)
	rom = ArrayField(models.CharField(max_length=100, blank=True, default='No verse'), size=6, blank=True, null=True)

	class Meta:
		db_table = 'poems'
		ordering = ('numeral',)
		
	def __str__(self):
		return '[%s]  %s - %s - %s' % (self.numeral, self.preferred_translator, self.jap, self.rom)


class Translation(models.Model):
	eng = ArrayField(models.CharField(max_length=100, blank=True, default='No verse'), size=6, blank=True, null=True)
	poem = models.ForeignKey(Poem, on_delete=models.CASCADE, related_name='translations')
	translator = models.CharField(max_length=100, blank=True, default='Unknown')

	class Meta:
		db_table = 'translations'
		index_together=['eng','translator']
		unique_together=('eng','poem','translator',)

	def __str__(self):
		return '[%s]  %s - %s' % (self.poem.numeral, self.translator, self.eng)

