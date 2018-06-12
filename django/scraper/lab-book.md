1. cli
```
conda create --name chihayaenv django
source activate chihayaenv

pip install lxml
pip install requests
pip install beautifulsoup4

touch scraper.py
```


2. scraper.py (lxml + requests )
- html.fromstring() implicitly expects bytes as input

http://docs.python-guide.org/en/latest/scenarios/scrape/

```python
from lxml import html
import requests

url = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'
page = requests.get(url)
tree = html.fromstring(page.content)

# for example
prices = tree.xpath('//span[@class="item-price"]/text()')
```


3. scraper.py (bs4)
```python
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
- inspect the result files

```python
from bs4 import BeautifulSoup
import requests
import csv
# main url
main = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'
# make request to the main url and parse the document
page = requests.get(main)
tree = BeautifulSoup(page.text, 'lxml')

# find all iframes (returns a list)
frames = tree.find_all('frame')

# find each iframe's src attr and check with the browser what individual documents look like
for frame in frames:
  print(frame.attrs['src'])

# for each iframe, reconstruct the correct url to send GET requests to from a root URL
# store correct urls in a list
root = main.split('hyakuframes.html')[0]
urls = []

# make a list of all iframe urls
# fetch content from all 3 urls
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

# urls
jap = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/index/hyaku3euc.html'
rom = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/index/hyaku2rom.html'
eng = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/index/hyaku1eng.html'
```

7. Saving to a csv file
https://blog.hartleybrody.com/web-scraping-cheat-sheet/#writing-to-a-csv


8. poems_to_csv.py
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
<br>
https://hackernoon.com/web-scraping-tutorial-with-python-tips-and-tricks-db070e70e071
<br>
https://www.crummy.com/software/BeautifulSoup/bs4/doc/#quick-start
