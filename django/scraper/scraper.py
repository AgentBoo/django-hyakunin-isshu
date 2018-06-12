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

# extract iframes from the site
main = 'http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html'

page = requests.get(main)
tree = BeautifulSoup(page.text,'lxml')

frames = tree.find_all('frame')

# for each iframe, reconstruct the correct url to send GET requests to
# store correct urls in a list
root = main.split('hyakuframes.html')[0]
urls = []

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
