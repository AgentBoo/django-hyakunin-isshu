## ohi app (Ogura Hyakunin Isshu index) 

<br>

*Uses*
`Django`, `DRF`, `React`, `React Helmet`, `MobX`, `react-magic-hat`, `react-beautiful-dnd`, `flow` types

<br>

ohi app is based on the *O*gura *H*yakunin *I*sshu anthology. 

<br><br>

##### Mission statement

<br>

_Background_
I started reading the Chihayafuru manga in 2017. Chihayafuru references the Ogura Hyakunin Isshu poems every chapter, and each time, translators seems to use a slightly different translation of the same poem, since the translations are made on demand. On top of that, the manga itself isn't too concerned with presenting each poem in its entirety, but only uses segments that are important for the gameplay or for the storytelling. Because of that, *I wanted to have a way to quickly find the corresponding poem when I see an interesting segment mentioned in the manga, and read its full (english) translation.*  

<br>

_Ogura Hyakuning Isshu_
I want to scrape the available translations of Ogura Hyakunin Isshu (OHI) from the UVA website and save them to a database (I have checked the website several times in the past year, and virtually no updates have been made to the content, and probably never will). The OHI is transcribed in japanese, romanji, and has english translations. If you check Amazon or other bookselling sources, you will find that there is more than one official english translation of the OHI. As mentioned in the Background section, there are also many different translations created throughout the lifetime of the Chihayafuru manga. I want to expose the poems using a REST API, so they can be consumed by the public and primarily by my own app.

<br>

_ohi app_
Fetch default poems + authors in jp, rom, eng
Navigate based on a language
Filter or find 100 poems
    *Filter on poem segments*
    Find a poem based on its numeral
Show N poems at a time (pagination)
Show batched poems
Drag and drop selected poems next to each other 
Add poem to a batch on click 
Show detail with a *translation* that leads to more information on click 
Not found page

<br>

_ohi database_
Scraped poems 
Scraped translations
Karuta versions of poems
Different transcriptions of poems 
Different translations
Link to Add translation form 
Link to API  

<br><br>

##### Scraper 

If scraping from the UVA site for poems:

<br>

1. Run scraper.py
2. Check outputs
3. Fix formatting issues in the outputs
4. Run poems2csv.py 

<br>

*Formatting issues:*

n.27 and n.100 poems are problematic.

Japanese transcript: everything seems correct.
Romanized transcript: everything seems correct.

English translation: A closing </lg> and opening <lg> tags are missing in eng.html, between Fujiwara no Kanesuke's (27) and Minamoto no Muneyuki's poems (28), making the parser think there is only one poem #27. (~ line 976).

```html
<!-- Correct -->
<hr width=50% size=4> </lg><lg><a names="eng28"> </a>
```

English translation: The lxml parser made a work-break of <center> at #100 poem, preventing extraction of the #100 poem lines. (~ line 3556) 

```html
<!-- Correct -->
<center><h3><a
href="/japanese/hyakunin/images/onna100.jpg">100</a></h3></center>
```

Example block:
```html
<lg><a name="eng2"> </a>
<center><h3><a
href="/japanese/hyakunin/images/onna2.jpg">2</a></h3></center>

 

<br><center>Empress Jito</center>


<br>The spring has passed
<br>And the summer come again;
<br>For the silk-white robes,
<br>

<br>So they say, are spread to dry
<br>On the "Mount of Heaven's Perfume."
<br>

<center><hr width=30% size=4><a
href="/etcbin/hyakuframe2www?act=queryform&specfile=/web/data/japanese/hyakunin/frames/index/hyaku1eng.o2w"><font color="000080">Search</font></a>
<br><br>
 | 
<a href="/japanese/hyakunin/frames/index/hyaku2rom.html#rom2"
target="rom"><- Romaji</a>
 |
<a href="/japanese/hyakunin/frames/index/hyaku3euc.html#euc2"
target="euc">Japanese -></a>
 |
 </center>



<hr width=50% size=4> </lg>
```

<br><br>

##### Notes 

**Ubuntu 18**
`npm run test` throws ENOSPC and npm ELIFECYCLE errors because of a limited number of watchers on linux
 
https://github.com/facebook/jest/issues/3254<br>
https://stackoverflow.com/questions/22475849/node-js-error-enospc<br>
https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details<br>

**Deployment**
use `deploy.sh` 