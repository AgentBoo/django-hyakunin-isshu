from django.db import models
from django.contrib.postgres.fields import ArrayField

import uuid

# Create your models here.

# Convention: m2m field should be defined in the model that absolutely cannot be 0..*

class Source(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	title = models.CharField(max_length=100, blank=False, default='n/a')
	url = models.URLField(blank=True, default='n/a')


class Poem(models.Model):
	source = models.ForeignKey(Source, related_name='poems', blank=False, null=True, on_delete=models.SET_NULL)
	numeral = models.IntegerField(blank=False, null=True)
	author = models.CharField(max_length=32, blank=False, default='n/a')
	verses = ArrayField(models.CharField(max_length=32, blank=True, default=''), size=5)


class Media(models.Model):
	CHOICES = ['anime', 'manga', 'other']
	poem = models.ManyToManyField(Poem, related_name='media', blank=False, null=True, on_delete=models.CASCADE)
	title = models.CharField(max_length=100, blank=False, default='n/a')
	category = models.CharField(max_length=32, blank=False, default='n/a')


class Romanization(models.Model):
	poem = models.OneToOne(primary_key=True)
	romanized_author = models.CharField(max_length=32, blank=False, default='n/a')
	romanized_verses = ArrayField(models.CharField(max_length=32, blank=True, default=''), size=5)


class Translation(models.Model):
	poem = models.ForeignKey(Poem, related_name='translations', blank=False, null=True, on_delete=models.SET_NULL)
	source = models.ForeignKey(Source, related_name='translations', blank=False, null=True, on_delete=models.SET_NULL)
	translator = models.CharField(max_length=32, blank=False, default='n/a')
	translated_author = models.CharField(max_length=32, blank=False, default='n/a')
	translated_verses = ArrayField(models.CharField(max_length=32, blank=True, default=''), size=5)
	language = models.CharField(max_length=32, blank=False, default='n/a')
	default = models.BooleanField(blank=True, default=False)