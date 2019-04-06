## ohi app (Ogura Hyakunin Isshu index) 

<br>

*Uses*
`Django`, `DRF`, `React`, `React Helmet`, `React Router`, `MobX`, `react-beautiful-dnd`

*Experiments with*
`TypeScript`, `MobX`, `React Context`

<br>

ohi app is based on the **O**gura **H**yakunin **I**sshu anthology. 

<br>

#### Mission statement

<br>

_Background_

I started reading the Chihayafuru manga in 2017. Chihayafuru references the Ogura Hyakunin Isshu poems every chapter, and each time, translators seems to use a slightly different translation of the same poem, since the translations are made on demand. On top of that, the manga itself isn't too concerned with presenting each poem in its entirety, but only uses segments that are important for the gameplay or for the storytelling. Because of that, _I wanted to have a way to quickly find the corresponding poem when I see an interesting segment mentioned in the manga, and read its full (english) translation._  

<br>

_Ogura Hyakuning Isshu_

I want to scrape the available translations of Ogura Hyakunin Isshu (OHI) from the UVA website and save them to a database (I have checked the website several times in the past year, and virtually no updates have been made to the content, and probably never will). The OHI is transcribed in japanese, romaji, and has english translations. If you check Amazon or other bookselling sources, you will find that there is more than one official english translation of the OHI. As mentioned in the Background section, there are also many different translations created throughout the lifetime of the Chihayafuru manga. I want to expose the poems using a REST API, so they can be consumed by the public and primarily by my own app.

<br>

_ohi app_

- fetch poems + authors in jp, rom, and default eng
- navigate based on a language
- show N poems at a time (pagination)
- show batched poems
- add poem to a batch 
- drag and drop selected poems next to each other 
- show detail with all _translations_ on click 
- filter or find 100 poems, *filter on poem segments*, find a poem based on its numeral
- 404 Not found 

<br>

_ohi database_
- scraped poems 
- scraped translations
- alternative translations

<br>

### Scraper 

If scraping from the UVA site for poems:

<br>

1. Run scraper.py
2. Check outputs
3. Fix formatting issues in the outputs
4. Run poems2csv.py 

<br>

*Formatting issues:*

n.27 and n.100 poems are problematic.<br>

Japanese transcript: everything seems correct.<br>
Romanized transcript: everything seems correct.<br>

English translation: A closing </lg> and opening <lg> tags are missing in eng.html, between Fujiwara no Kanesuke's (27) and Minamoto no Muneyuki's poems (28), making the parser think there is only one poem #27. (~ line 976).<br>

```html
<!-- Correct -->
<hr width=50% size=4> </lg><lg><a names="eng28"> </a>
```

English translation: The lxml parser made a word-break of <center> at #100 poem, preventing extraction of the #100 poem lines. (~ line 3556) 

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

### Notes 

**Ubuntu 18**

`npm run test` throws `ENOSPC` and `ELIFECYCLE` errors because of the limited number of watchers on linux
 
https://github.com/facebook/jest/issues/3254<br>
https://stackoverflow.com/questions/22475849/node-js-error-enospc<br>
https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details<br>

<br>

**Django development server**

The local development server runs a separate process for the auto-reloader.

https://stackoverflow.com/a/28490054

<br>

**Deployment**

use `startdeploy.sh` 
