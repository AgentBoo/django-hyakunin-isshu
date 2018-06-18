from bs4 import BeautifulSoup
import requests
import csv

'''
Save iframe contents to individual txt files locally. 
This is important for two reasons: 
1. I do not want to constantly send requests to the scraped site, while I am figuring out python
   and constantly re-running my script in the guess-check-revise manner 
   (I have only been using python for 3 weeks as of this moment) 
2. Because the original html documents are not well formatted (I am using a very old site). 
   Different available html parsers were not able to deal with the mistakes, so I chose to make 
   changes to the content manually to get correct results using BeautifulSoup.

Use chihayaenv environment.
'''


# extract iframes from this site
main = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'

page = requests.get(main)
tree = BeautifulSoup(page.text,'lxml')

frames = tree.find_all('frame')

root = main.split('hyakuframes.html')[0]
urls = []

for index,frame in enumerate(frames):
    url = root + frame.attrs['src']
    content = requests.get(url).text

    fname = 'frame_{num}.txt'.format(num = index + 1)
    f = open(fname, 'w+')
    f.write(content)
    f.close()

    urls.append(url)


# the first iframe does not contain any poems
urls.pop(0)

jap = urls[0]
rom = urls[1]
eng = urls[2]

print(jap)          # frame_2.txt
print(rom)          # frame_3.txt
print(eng)          # frame_4.txt


'''
Additional comments for this module can be found in a lab-book-2.md
'''