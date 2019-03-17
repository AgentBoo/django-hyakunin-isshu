if __name__ == '__main__':
	'''
	Scrapes kyogi karuta poems from the UVA site 
	and saves the html content into individual files.
	'''
	from bs4 import BeautifulSoup
	
	import requests
	import csv
	import os 

	BASE_DIR = os.path.dirname(os.path.abspath(__file__))
	OUTPUT_DIR = os.path.join(BASE_DIR, 'frames')

	MAIN_PAGE = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'

	'''
	Use chihayaenv environment.

	Poems are contained within 3 iframes. 
	Save iframe contents to individual html files locally. 
	The iframe contents are not well formatted (it's a 
	really old site). 

	I couldn't figure out how to make available html parsers 
	deal with the formatting errors, so I chose to make 
	changes to the content manually to get correct results. 
	'''

	rooturl = MAIN_PAGE.split('hyakuframes.html')[0]

	page = requests.get(MAIN_PAGE)
	tree = BeautifulSoup(page.text,'lxml')

	# the first extracted iframe doesn't contain any poems 
	iframes = tree.find_all('frame')[1:]
	urlmap = { frame.attrs['name']: rooturl + frame.attrs['src'] for frame in iframes }

	for name, url in urlmap.items():
	    content = requests.get(url).text
	    path = os.path.join(OUTPUT_DIR, f'{name}.html')

	    with open(path, 'w') as file:
	      file.write(content)

 
 
