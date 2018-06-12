from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

''' 
Traditionally, an Author has a Poem, and a Poem belongs to an Author.
In Ogura Hyakunin Isshu and karuta, there is a 1-to-1 relationship between an author and a poem, 
where poems are more important identities than authors, so the association has been reversed here
'''

class Author(models.Model):
	jap = models.CharField(max_length=100, blank=True, default='Unknown')
	rom = models.CharField(max_length=100, blank=True, default='Unknown')
	eng = models.CharField(max_length=100, blank=True, default='Unknown')

	def __str__(self):
		return '%s' % self.id 


class Poem(models.Model):
	# unique=True implies the creation of a unique index 
	numeral = models.IntegerField(blank=False, default=-1, unique=True)
	jap = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)
	rom = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)
	eng = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)

	author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='poem')

	def __str__(self):
		return 'Poem number %s' % self.numeral



