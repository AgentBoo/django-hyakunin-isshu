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


for index,language in enumerate(['jap', 'rom', 'eng']):
    collection = []
    authors = []

    text = open('frame_{num}.txt'.format(num = index + 2), 'r')
    tree = BeautifulSoup(text, 'lxml')

    for lg in tree.find_all('lg'):
        poem = []

        for element in lg.find_all(['a', 'br', 'hr']):
            element.decompose()

        lg.center.h3.decompose()

        for center in lg.find_all('center'):
            if center.string != None and center.string != '\n':
                poem.append(center.string)
                authors.append(center.string)

        for center in lg.find_all('center'):
            center.decompose()

        for line in lg.stripped_strings:
            poem.append(line)

        collection.append(poem)

    print(language, 'poems:', len(collection))
    print(language, 'authors:', len(authors))


    '''Write poems into individual csv files'''
    fields = ['author', 'line1', 'line2', 'line3', 'line4', 'line5']

    with open('{lang}.csv'.format(lang = language), 'w+') as f:
        writer = csv.writer(f)

        writer.writerow(fields)

        for poem in collection:
            writer.writerow(poem)

    text.close()


'''
Additional comments for this module can be found in a lab-book-2.md
'''