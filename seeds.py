import os 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')


import django 
django.setup()


import csv 
from backend.karuta_api.models import Author, Poem


root = os.path.dirname(os.path.abspath(__file__))

def populate_poem(language,index,row):
	try:
		# this function is executed for every row in every csv file 
		poem = Poem.objects.get(numeral=index + 1)

		# setattr is an alternative to the conventional setting of a field 
		# on an object i.e. poem.jap = 'Naniwa-zu ni, Sakuya konohana...' 
		setattr(poem, language, row[1:6])
		poem.save() 

		setattr(poem.author, language, row[0])
		poem.author.save()

		print(poem)
	
	except Poem.DoesNotExist:
		# execute this for the first 100 author and 100 poem objects created from the first file
		author = Author.objects.get_or_create(**{ language: row[0] })[0]
		poem = Poem.objects.create(author=author, numeral=index + 1, **{language: row[1:6]})

		print(poem) 


def csv_to_poems(language):
	# csv files are named jap.csv, rom.csv, eng.csv
	filename = '{lang}.csv'.format(lang=language)
	path = os.path.join(root, 'seeds', filename)

	try:
		with open(path, newline='') as csvfile:
			print('Reading from {file}'.format(file=filename))

			reader = csv.reader(csvfile)

			# skip headers 
			next(reader,None)

			for index,row in enumerate(reader):
				populate_poem(language, index, row)

			csvfile.close()
	
	except IOError:
		print('An error occurred trying to open and read file {file}'.format(file=filename))


def seed(*languages):
	for language in languages:
		csv_to_poems(language)


# populate database with data from language specific csv files 
seed('eng', 'rom', 'jap')



'''
Additional comments for this module can be found in a lab-book-3.md
'''