import os 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')


import django 
django.setup()


import csv 
from backend.karuta_api.models import Poem

root = os.path.dirname(os.path.abspath(__file__))

def populate_poem(language,index,row):
	try:
		poem = Poem.objects.get(numeral=index + 1)

		# setattr is an alternative to the 'conventional' setting of a field on an
		# object i.e. poem.jap = 'Naniwa-zu ni, Sakuya konohana...' 
		setattr(poem, language, row)
		poem.save() 

		print(poem)
	
	except Poem.DoesNotExist:
		poem = Poem.objects.create(numeral=index + 1, preferred_translator='Clay MacCauley', **{language: row})

		print(poem) 


def populate_translation(language,index,row):
	try:
		poem = Poem.objects.get(numeral=index + 1)
		# all of the initial translations were made by Clay MacCauley, hence preferred_translator	
		translation = poem.translations.create(eng=row, translator=poem.preferred_translator)

		print(translation)

	except Poem.DoesNotExist:
		# create an arbitrary poem if no poem has been created yet
		poem = Poem.objects.create(numeral=index + 1, preferred_translator='Clay MacCauley')
		translation = poem.translations.create(eng=row, translator=poem.preferred_translator)

		print(translation)


def csv_to_poems(language):
	'''
		For every language, open a language specific .csv file
		If the language is english, update or create a Translation instance 
		Otherwise, update or create a Poem instance for every row 
	'''
	# csv files are named jap.csv, rom.csv, eng.csv
	filename = '{lang}.csv'.format(lang=language)
	path = os.path.join(root, 'seeds', filename)

	try:
		with open(path, newline='') as csvfile:
			reader = csv.reader(csvfile)

			# skip headers 
			next(reader, None)

			if language == 'eng':
				for index,row in enumerate(reader):
					populate_translation(language, index, row)

			else: 
				for index,row in enumerate(reader):
					populate_poem(language, index, row)

			csvfile.close()
	
	except IOError:
		print('An error occurred trying to open and read file {file}'.format(file=filename))


def seed(*languages):
	for language in languages:
		csv_to_poems(language)


# populate the database with data from language specific csv files 
seed('rom', 'jap','eng')


'''
Additional comments for this module can be found in a lab-book-3.md
'''