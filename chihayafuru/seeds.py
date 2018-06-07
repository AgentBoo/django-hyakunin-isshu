import os 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chihayafuru.settings')


import django
django.setup()


import csv 
from poems.models import Poem, Jap, Rom, Eng


# creates 100 parent poems identified by a numeral  
def create_hundred(model):
		for num in range(100):
			p = model(numeral=num)
			p.save()


# creates a poem in a specific language 
def create_poem(model, poem, *fields):
		p = model(poem = poem ,
				  author = fields[0],
				  line_1 = fields[1],
				  line_2 = fields[2],
				  line_3 = fields[3],
				  line_4 = fields[4],
				  line_5 = fields[5])
		p.save()
		print(p)


# reads rows from a .csv and saves data into individual language specific models  
def csv_to_poems(model, language):
		file_name = './csv/{lang}.csv'.format(lang=language)
		print('Reading from {file}'.format(file=file_name))

		with open(file_name, newline='') as csvfile:
			reader = csv.reader(csvfile)

			# skip headers
			next(reader, None)

			for index,row in enumerate(reader):
				poem = Poem.objects.get(numeral=index)
				create_poem(model, poem, row[0], row[1], row[2], row[3], row[4], row[5])

			csvfile.close()


# populates the database with data 
def seed(*languages):
	models = [Jap, Rom, Eng]
	lang_dict = dict(zip(languages,models))

	create_hundred(Poem)

	for lang,model in lang_dict.items():
		csv_to_poems(model,lang)


# call seeding function
seed('jap', 'rom', 'eng')
