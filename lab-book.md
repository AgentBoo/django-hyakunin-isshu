1. cli
```
conda create --name chihayaenv django
source activate chihayaenv
django-admin startproject chihayafuru

pip install lxml
pip install requests
pip install beautifulsoup4

touch scraper.py
```


2. scraper.py (lxml + requests )
- html.fromstring() implicitly expects bytes as input

``` python
from lxml import html
import requests

url = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'
page = requests.get(url)
tree = html.fromstring(page.content)

# for example
prices = tree.xpath('//span[@class="item-price"]/text()')
```

http://docs.python-guide.org/en/latest/scenarios/scrape/


3. scraper.py (bs4)
``` python
from bs4 import BeautifulSoup
import requests

url = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'

page = requests.get(url)
tree = BeautifulSoup(page.text, 'lxml')
```


4. scraper.py
Requests
- requests.get() returns a Response object
- from docs:
  _timeout is not a time limit on the entire response download; rather, an exception is raised if the server has not issued a response for timeout seconds (more precisely, if no bytes have been received on the underlying socket for timeout seconds)._
  _If no timeout is specified explicitly, requests do not time out_

http://docs.python-requests.org/en/master/user/quickstart/#make-a-request

5. scraper.py  
Parsing html documents
- bs4 can use its own html.parser, or can use lxml
- BeautifulSoup() constructor accepts a string or an open filehandle
  - pass it page.text (although page.content seems to work too)

https://www.crummy.com/software/BeautifulSoup/bs4/doc/#navigating-the-tree


6. iframes
- make request to the main page with 3 iframes

``` python
from bs4 import BeautifulSoup
import requests
# main url
url = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'
# make request to the main url and parse the document
page = requests.get(url)
tree = BeautifulSoup(page.text, 'lxml')

# find all iframes (returns a list)
frames = tree.find_all('frame')

# find each iframe's src attr and check with the browser what individual documents look like
for frame in frames:
  print(frame.attrs['src'])

# get the root url from the original url
root = url.split('hyakuframes.html')[0]

# make a list of all iframe urls
# fetch content from all 3 urls
urls = []
contents = []
for frame in frames:
  src = frame.attrs['src']
  url = root + src
  urls.append(url)
  content = requests.get(url)
  contents.append(content)

# get rid of the first entry because it does not seem to be what I want
urls.pop(0)
contents.pop(0)

# check everything
print(urls)
print(contents)

# urls
jap = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/index/hyaku3euc.html'
rom = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/index/hyaku2rom.html'
eng = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/index/hyaku1eng.html'


# create individual files with individual html strings for further processing
# creates lang_1.py, lang_2.py, lang_3.py
for item in range(1,4):
    name = 'lang_{num}.py'.format(num = item)
    f = open(name, 'w+')
    f.write(contents[item-1].text)
    f.close()

```   

- inspect the files

7. Saving to a csv file
https://blog.hartleybrody.com/web-scraping-cheat-sheet/#writing-to-a-csv

8. poems_to_csv.py

``` python
from bs4 import BeautifulSoup
import csv

'''
Create a list of poems and write them into a csv file.
'''

# skip frame_1.txt file because it does not contain poems
for index,language in enumerate(['jap', 'rom', 'eng']):
    '''Save poems to a list (collection of poems)'''
    collection = []
    authors = []

    # open text file and parse
    text = open('frame_{num}.txt'.format(num = index + 2), 'r')
    tree = BeautifulSoup(text, 'lxml')

    # each poem is inside an lg element
    for lg in tree.find_all('lg'):
        poem = []

        # redundant elements/tags
        for element in lg.find_all(['a', 'br', 'hr']):
            element.decompose()

        lg.center.h3.decompose()

        # extract author from center element
        for center in lg.find_all('center'):
            if center.string != None and center.string != '\n':
                poem.append(center.string)
                authors.append(center.string)

        # decompose center element containing author name
        for center in lg.find_all('center'):
            center.decompose()

        # extract poem line by line
        for line in lg.stripped_strings:
            poem.append(line)

        # add poem to collection
        collection.append(poem)

    print(language, 'poems:', len(collection))
    print(language, 'authors:', len(authors))


    '''Write poems into a csv file'''
    fields = ['author', 'line1', 'line2', 'line3', 'line4', 'line5']

    with open('{lang}.csv'.format(lang = language), 'w+') as f:
        writer = csv.writer(f)
        # header row
        writer.writerow(fields)
        # poems
        for poem in collection:
            writer.writerow(poem)

```

#### Sources
http://docs.python-guide.org/en/latest/scenarios/scrape/
https://hackernoon.com/web-scraping-tutorial-with-python-tips-and-tricks-db070e70e071
https://www.crummy.com/software/BeautifulSoup/bs4/doc/#quick-start
