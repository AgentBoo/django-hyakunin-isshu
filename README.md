## ohi app (Ogura Hyakunin Isshu index) 

<br>

*Uses*
`Django`, `DRF`, `React`, `React Helmet`, `MobX`, `react-magic-hat`, `react-beautiful-dnd`

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

<br>

_ohi REST API_  
/<source:ref>/all
list of all poems + authors in jp, rom, eng (specific source)
/<source:ref>/defail/<poem:numeral>
poem + author in jp, rom, eng (specific source)
/<source:ref>/all/jp
list of all poems + authors in jp (specific source => poem)
/<source:ref>/all/rom
list of all poems + authors in rom (specific source => poem)
/<source:ref>/all/en
list of all poems + authors in eng (specific source => poem => translation)

/default/detail/<poem:numeral>
poem + author in jp, rom, all translations, card (default source)

/sources/
list of sources + refs

<br>

###### REST API 
- scraped, karuta, and different transcriptions of poems use the same model (the primary unifier is the numeral field; the primary differentiator is the source field) 
- karuta poems have an associated Card
- Poem:Card are 1-to-1, every card belongs to a poem, but not every poem has a card
- Poem:Romaji are 1-to-1, every rom transcript belongs to a poem, and every poem has a rom transcript 
- Poem:Translation are 1-to-N, every translation belongs to a poem, and every poem can have many translations

'''
GET /api/<str:source>/all/
GET /api/<str:source>/all/jp/
GET /api/<str:source>/all/rom/
GET /api/<str:source>/all/en/

GET /api/default/all/
GET /api/default/all/jp/
GET /api/default/all/rom/
GET /api/default/all/en/

GET /api/<str:source>/detail/<int:numeral>/
GET /api/default/detail/<int:numeral>/
'''

<br>

Card Schema 
```
{ 
    id: uuid, 
    poem: fk,
    kimariji: String,
    unique_syllables: Number,
}
```

Poem Schema 
```
{ 
    id: uuid, 
    numeral: Number,
    author: String,
    verses: Array[String],
    source: fk,
}
```

Romaji Schema
```
{ 
    id: uuid, 
    poem: fk,
    author: String,
    verses: Array[String],
}
```

Translations
```
{
    id: uuid,
    poem: fk,
    author: String,
    verses: Array[String]
    lang: String,
    translator: String
}
```

Source Schema
```
{
    id: uuid4,
    title: String,
    url: URL or NULL
}
```

<br><br>

##### Notes 

**Ubuntu 18**
`npm run test` throws ENOSPC and npm ELIFECYCLE errors because of a limited number of watchers on linux
 
https://github.com/facebook/jest/issues/3254
https://stackoverflow.com/questions/22475849/node-js-error-enospc
https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details

**Deployment**

use deploy.sh 