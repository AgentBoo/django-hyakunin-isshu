from django.db import models
from django.contrib.postgres.fields import ArrayField

import uuid 

# Create your models here.

# Convention: m2m field should be defined in the model that absolutely cannot have others be 0..* to it

class Source(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	title = models.CharField(max_length=100, blank=False, default='n/a')
	url = models.URLField(max_length=200, blank=False, default='n/a')

	def __str__(self):
		return '[%s] %s' % (self.id, self.title)


class Poem(models.Model):
	source = models.ForeignKey(Source, related_name='poems', blank=False, null=True, on_delete=models.SET_NULL)
	numeral = models.IntegerField(blank=False, null=True) # numbering starts at 1 
	author = models.CharField(max_length=64, blank=False, default='n/a')
	verses = ArrayField(models.CharField(max_length=100, blank=True, default=''), size=5, null=True)
	romanized_author = models.CharField(max_length=64, blank=False, default='n/a')
	romanized_verses = ArrayField(models.CharField(max_length=100, blank=True, default=''), size=5, null=True)

	class Meta:
		ordering = ['numeral']
	
	def __str__(self):
		return '[%s] %s %s (%s)' % (self.id, self.author, self.romanized_author, self.numeral) 
 

class Translation(models.Model):
	LANGUAGES = [('en', 'English'), ('vn', 'Vietnamese')]
	default = models.BooleanField(blank=False, default=False)
	source = models.ForeignKey(Source, related_name='translations', blank=False, null=True, on_delete=models.SET_NULL)
	poem = models.ForeignKey(Poem, related_name='translations', blank=False, null=True, on_delete=models.SET_NULL)
	language = models.CharField(max_length=16, blank=False, choices=LANGUAGES, default='en')
	translator = models.CharField(max_length=64, blank=False, default='n/a')
	translated_author = models.CharField(max_length=64, blank=False, default='n/a')
	translated_verses = ArrayField(models.CharField(max_length=100, blank=True, default=''), size=5)

	def __str__(self):
		return '[%s] %s %s (%s), %s' % (self.id, self.poem.author, self.translated_author, self.poem.numeral, self.translator)


class Media(models.Model):
	MEDIA_CHOICES = [('anime', 'anime'), ('manga', 'manga'), ('other', 'other')]
	poem = models.ManyToManyField(Poem, related_name='media', blank=False)
	title = models.CharField(max_length=100, blank=False, default='n/a')
	category = models.CharField(max_length=32, blank=False, choices=MEDIA_CHOICES, default='n/a')

	def __str__(self):
		return '[%s] %s (%s)' % (self.id, self.title, self.category)