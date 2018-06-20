## Scraper lab-book 

#### Setup

**1. backend/scraper** <br>

```
source activate chihayaenv

pip install lxml
pip install requests
pip install beautifulsoup4

cd backend/scraper && touch scraper.py && touch poems_to_csv.py
```

<br>

#### Scraping

**2. scraper.py** <br> 

_Example use of lxml + requests:_
```python
from lxml import html
import requests

url = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'
page = requests.get(url)
# html.fromstring() implicitly expects bytes as input
tree = html.fromstring(page.content)

# for example
prices = tree.xpath('//span[@class="item-price"]/text()')
```
Resources: <br>
http://docs.python-guide.org/en/latest/scenarios/scrape/

<br>

**3. scraper.py** <br> 

_Example use of bs4_
```python
from bs4 import BeautifulSoup
import requests

url = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'
page = requests.get(url)
tree = BeautifulSoup(page.text, 'lxml')
```

<br>

**4. scraper.py** <br>

The html source has 3 iframes embedded, so I am going to make a request to the main page with all 3 iframes first, inspect the results, and then target each iframe.

```python
from bs4 import BeautifulSoup
import requests
import csv

'''
Save iframe contents to individual txt files. This is important because the original
html documents are not well formatted. Different available html parsers were not able
to deal with the mistakes, so changes will have to be made to the content manually to get
correct results using BeautifulSoup.
Use chihayaenv environment.
'''

# main url of the site with poems in 3 iframes 
main = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'

# make request to the main url and parse the document using lxml parser 
page = requests.get(main)
tree = BeautifulSoup(page.text,'lxml')

# find all iframes (returns a list)
frames = tree.find_all('frame')

# for each iframe, reconstruct the correct url to send GET requests to from root URL
# store correct urls in a list
root = main.split('hyakuframes.html')[0]
urls = []

# request content from the iframe's specific ulrs, one by one
for index,frame in enumerate(frames):
    url = root + frame.attrs['src']
    content = requests.get(url).text

    # save contents to txt files
    fname = 'frame_{num}.txt'.format(num = index + 1)
    f = open(fname, 'w+')
    f.write(content)
    f.close()

    # store urls
    urls.append(url)


# the first iframe does not contain any poems
urls.pop(0)

# individual urls
jap = urls[0]
rom = urls[1]
eng = urls[2]

print(jap)          # frame_2.txt
print(rom)          # frame_3.txt
print(eng)          # frame_4.txt
```

<br>

**5. poems_to_csv.py** <br>

```python
from bs4 import BeautifulSoup
import csv

'''
Create a list of poems and write them into a csv file.

Japanese translation: frame_2.txt is written in kanji (good luck finding raised errors),
but it seems that a stray '\n' newline in poem #100 was passing one of my if-else conditions.

Romanized transcription: everything seems to be correct in frame_3.txt.

English translation: A closing </lg> and opening <lg> tags are missing in frame_4.txt, between
Fujiwara no Kanesuke's and Minamoto no Muneyuki's poems, making the parser think
that there is only one poem #27. Additionally, the lxml parser created this:
    <center><h3><a
    href="/japanese/hyakunin/images/onna100.jpg">100</a></h3></cente
    r
    >
The strings after that segment in poem #100 are not extracted at all.

Switching out parsers did not help with any of these issues, which is alright. The original site looks like heavily hardcoded html and behaviors from 1999, with a few typing errors here and there. 
'''


# skip frame_1.txt file because it does not contain poems
for index,language in enumerate(['jap', 'rom', 'eng']):
    '''
    Save poems to a list (collection of poems)
    Every poem is contained inside a <center> element and there are no id or class attributes that I can use as hooks for BeautifulSoup, so I am removing everything that does not contain an author or a poem text, until I get to the poem text that I can scrape.
    '''
    collection = []
    authors = []

    # open text file and parse
    text = open('frame_{num}.txt'.format(num = index + 2), 'r')
    tree = BeautifulSoup(text, 'lxml')

    # each poem is inside an <lg> element
    for lg in tree.find_all('lg'):
        poem = []

        # redundant elements/tags: <a>, <br>, <hr>
        for element in lg.find_all(['a', 'br', 'hr']):
            element.decompose()

        # use .decompose() to get rid of <hr> elements and everything inside of them
        lg.center.h3.decompose()

        # extract author from <center> element
        for center in lg.find_all('center'):
            if center.string != None and center.string != '\n':
                poem.append(center.string)
                authors.append(center.string)

        # decompose <center> element containing author name
        for center in lg.find_all('center'):
            center.decompose()

        # extract poem line by line
        for line in lg.stripped_strings:
            poem.append(line)

        # add poem to collection
        collection.append(poem)

    # check data
    print(language, 'poems:', len(collection))
    print(language, 'authors:', len(authors))


    '''
    Write poems into a csv file
    '''
    fields = ['author', 'line1', 'line2', 'line3', 'line4', 'line5']

    with open('{lang}.csv'.format(lang = language), 'w+') as f:
        writer = csv.writer(f)
        # add header row
        writer.writerow(fields)
        # poems
        for poem in collection:
            writer.writerow(poem)
```

<br>

**5. poems_to_csv.py** <br>

Move all outputs into a `/backend/scraper/outputs` directory
Copy all .csv files into backend/seeds 

<br>

#### Notes

**Requests**

requests.get() returns a Response object

> timeout is not a time limit on the entire response download; rather, an exception is raised if the server has not issued a response for timeout seconds (more precisely, if no bytes have been received on the underlying socket for timeout seconds). If no timeout is specified explicitly, requests do not time out

Resources: <br>
http://docs.python-requests.org/en/master/user/quickstart/#make-a-request <br>

<br>

**Parsing html documents**

BeautifulSoup can use its own html.parser, or can use lxml

BeautifulSoup() constructor accepts a string or an open filehandle: pass it page.text (although page.content seems to work too)

Resources: <br>
https://www.crummy.com/software/BeautifulSoup/bs4/doc/#navigating-the-tree <br>

<br>

#### Resources

http://docs.python-guide.org/en/latest/scenarios/scrape/ <br>
https://www.crummy.com/software/BeautifulSoup/bs4/doc/#quick-start <br>
https://blog.hartleybrody.com/web-scraping-cheat-sheet/#writing-to-a-csv <br>
https://hackernoon.com/web-scraping-tutorial-with-python-tips-and-tricks-db070e70e071 <br>