import os 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')


import django 
django.setup()


import csv 
from backend.karuta.models import Author, Poem

root = os.path.dirname(os.path.abspath(__file__))

# 
def populate_poem(language,index,row):
	try:
		poem = Poem.objects.get(numeral=index + 1)

		setattr(poem, language, row[1:6])
		poem.save() 

		setattr(poem.author, language, row[0])
		poem.author.save()

		print(poem)
	
	except Poem.DoesNotExist:
		author = Author.objects.get_or_create(**{ language: row[0] })[0]
		poem = Poem(author=author, numeral=index + 1, **{language: row[1:6]})

		poem.save()
		
		print(poem) 

# 
def csv_to_poems(language):
	file = '{lang}.csv'.format(lang=language)
	path = os.path.join(root,'poems',file)

	try:
		with open(path, newline='') as csvfile:
			print('Reading from {file}'.format(file=file))

			reader = csv.reader(csvfile)

			# skip headers 
			next(reader,None)

			for index,row in enumerate(reader):
				populate_poem(language, index, row)

			csvfile.close()
	
	except IOError:
		print('An error occurred trying to read file {file}'.format(file=file))


def seed(*languages):
	for language in languages:
		csv_to_poems(language)


# populate database with data from language specific csv files 
seed('eng', 'rom', 'jap')

