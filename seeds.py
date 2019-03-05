import os 
import csv
import sys

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
SEED_DIR = os.path.join(ROOT_DIR, 'scraper', 'poems')
JPFILE = os.path.join(SEED_DIR, 'euc.csv')

def save_poem(model, source, row):
	poem = model.objects.create(
		numeral = row['ID'],
		author = row['Author'],
		verses = row['Verses'],
		source = source,
	)

	print(poem)
	return poem 

def save_rom(model, poem, row): 
	rom = model.objects.create(
		poem = poem,
		author = row['Author'],
		verses = row['Verses']
	)

	print(rom)
	return rom

def save_eng(model, poem, row):
	eng = model.objects.create(
		poem = poem,
		author = row['Author'],
		verses = row['Verses'],
		lang = 'en',
		translator = 'Clay MacCauley')

	print(eng)
	return eng


 
if __name__ == '__main__':
	import os 
	os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

	import django 
	django.setup()

	from backend.api.models import Poem

	# seed files
	files = [ file for file in os.listdir(SEED_DIR) if file.endswith(".csv") ]
	print(f'Files found: {files}')

	# resource 
	# source = Source.objects.create(
	# 	title = 'Clay MacCauley',
	# 	url = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'
	# ) 
	
	try:
		with open(JPFILE, 'r') as csvfile:
			reader = csv.DictReader(csvfile)
			print(next(reader))
	
	except IOError:
		print(f'Cannot open file {JPFILE}')

 


 