from django.db import models

# Create your models here.
class Poem(models.Model):
	numeral = models.IntegerField()

	db_table = '"poems"'

	def __str__(self):
		return 'Poem number %s' % (self.numeral)


class Jap(models.Model):
	poem = models.OneToOneField(Poem, on_delete=models.CASCADE, primary_key=True, default=-1)
	author = models.CharField(max_length=100, default='Unknown')
	line_1 = models.CharField(max_length=100, default='None')
	line_2 = models.CharField(max_length=100, default='None')
	line_3 = models.CharField(max_length=100, default='None')
	line_4 = models.CharField(max_length=100, default='None')
	line_5 = models.CharField(max_length=100, default='None')

	def __str__(self):
		return self.author 


class Rom(models.Model):
	poem = models.OneToOneField(Poem, on_delete=models.CASCADE, primary_key=True, default=-1)
	author = models.CharField(max_length=100, default='Unknown')
	line_1 = models.CharField(max_length=100, default='None')
	line_2 = models.CharField(max_length=100, default='None')
	line_3 = models.CharField(max_length=100, default='None')
	line_4 = models.CharField(max_length=100, default='None')
	line_5 = models.CharField(max_length=100, default='None')

	def __str__(self):
		return self.author 


class Eng(models.Model):
	poem = models.OneToOneField(Poem, on_delete=models.CASCADE, primary_key=True, default=-1)
	author = models.CharField(max_length=100, default='Unknown')
	line_1 = models.CharField(max_length=100, default='None')
	line_2 = models.CharField(max_length=100, default='None')
	line_3 = models.CharField(max_length=100, default='None')
	line_4 = models.CharField(max_length=100, default='None')
	line_5 = models.CharField(max_length=100, default='None')

	def __str__(self):
		return self.author 