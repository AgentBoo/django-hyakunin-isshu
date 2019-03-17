if __name__ == '__main__':
	import os	
	import sys

	ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
	SEED_DIR = os.path.join(ROOT_DIR, 'scraper', 'poems')

	seedfiles = os.listdir(SEED_DIR)

	ORIGINAL_SOURCE = 'Clay MacCauley'
	ORIGINAL_URL = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'

	JAP = '-j'
	ROM = '-r'
	ENG = '-t'


	'''
	Calling this script without additional args 
	prints out all files in the SEED_DIR. 

	Specific seed files should be flagged, e.g. -t eng.csv -r rom.csv -j euc.csv 
	'''
	if len(sys.argv) == 1:
		for file in seedfiles:
			if file.endswith(".csv"):
				print(file)

	else:
		os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

		import django
		django.setup()
		
		import csv 


		def parse_cmd_line_args():
			# JAP > ROM > ENG order is preferrable 
			flags = [JAP, ROM, ENG]
			values = []

			'''
			If a regular flag is followed by an unmatching file, 
			let downstream errors raise the issue. Do not handle here.
			'''

			if '-all' in sys.argv:
				values = [(JAP, 'euc.csv'), (ROM, 'rom.csv'), (ENG, 'eng.csv')]
			else:	
				for flag in flags:
					if flag in sys.argv:
						try:
							next_arg = sys.argv[sys.argv.index(flag) + 1]
							values.append((flag, next_arg))
						except IndexError as err:
							raise Exception(f'You have not specified a file for the {flag} flag') from err 

			return values


		def file2path(file, dirpath):
			seedfiles = os.listdir(dirpath)

			if file in seedfiles:
				return os.path.join(dirpath, file)
			else:
				options = ', '.join(seedfiles)
				raise Exception(f'Cannot find {file} in the scraped poems directory.\nChoose from {options}')


		def collect_paths():
			paths = {}

			for flag, file in parse_cmd_line_args():
				filepath = file2path(file, SEED_DIR)
				paths.update({ flag: filepath })
			
			return paths


		def create_source(title, url):
			from backend.api.models import Source

			# update_or_create() returns [instance, Boolean]
			source = Source.objects.update_or_create(title=title, url=url)

			return source[0]


		def create_poem(row, source):
			from backend.api.models import Poem

			try:
				poem = Poem.objects.get(numeral=row[0], source=source)

				poem.author = row[1]
				poem.verses = row[2:]
				poem.save(update_fields=['author', 'verses'])

				return poem 

			except Poem.DoesNotExist:
				poem = Poem.objects.create(source=source, numeral=row[0], author=row[1], verses=row[2:])

				return poem  
 

		def romanize_poem(row, source):
			from backend.api.models import Poem

			try:
				poem = Poem.objects.get(numeral=row[0], source=source)

				poem.romanized_author = row[1]
				poem.romanized_verses = row[2:]
				poem.save(update_fields=['romanized_author', 'romanized_verses'])

				return poem 

			except Poem.DoesNotExist:
				raise Exception(f'Original poem {row[0]} does not exist and therefore cannot be romanized')

 
		def create_translation(row, source):
			from backend.api.models import Poem

			try:
				poem = Poem.objects.get(numeral=row[0], source=source)

				# update_or_create() returns [instance, Boolean]
				translation = poem.translations.update_or_create(
					default=True, 
					source=poem.source, 
					translator=poem.source.title, 
					translated_author = row[1],
					translated_verses = row[2:]
				)
			
				return translation[0] 

			except Poem.DoesNotExist:
				raise Exception(f'Original poem {row[0]} does not exist and therefore cannot be translated')


		def dbseed():
			import csv 
			from collections import OrderedDict

			paths = collect_paths()

			if len(paths) is not 0:
				callbacks = OrderedDict({ 
					JAP: create_poem, 
					ROM: romanize_poem, 
					ENG: create_translation 
				})

				source = create_source(ORIGINAL_SOURCE, ORIGINAL_URL)

				for flag, callback in callbacks.items():
					if 'all' or flag in sys.argv:
						path = paths.get(flag, None)

						if path is not None:
							with open(path, 'r') as csvfile:
								reader = csv.reader(csvfile)
								next(reader)

								for row in reader:
									result = callback(row, source)
									print(result)

				print('Done seeding!')

			else:
				print('Nothing to be done.')


		# fin 
		dbseed()
