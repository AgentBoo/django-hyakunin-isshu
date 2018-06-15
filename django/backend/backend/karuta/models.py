from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.

class Author(models.Model):
	jap = models.CharField(max_length=100, blank=True, default='Unknown')
	rom = models.CharField(max_length=100, blank=True, default='Unknown')
	eng = models.CharField(max_length=100, blank=True, default='Unknown')

	def __str__(self):
		return '[%s]  %s - %s - %s' % (self.id, self.jap, self.rom, self.eng) 


class Poem(models.Model):
	numeral = models.IntegerField(blank=True, null=True, unique=True)
	jap = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)
	rom = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)
	eng = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)

	author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='poem')

	class Meta:
		ordering = ('numeral',)
		
	def __str__(self):
		return '[%s]  %s - %s - %s' % (self.numeral, self.author.jap, self.author.rom, self.author.eng)



