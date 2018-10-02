# django-hyakunin-isshu


This project was inspired by the excellent [manga](https://myanimelist.net/anime/10800/Chihayafuru) and [anime](http://www.crunchyroll.com/chihayafuru) Chihayafuru about the players of karuta and Ogura Hyakunin Isshu. Karuta is a unique japanese sport of acute reflexes, hand-eye-ear coordination, and memorization skills, centered around the Ogura Hyakunin Isshu antology of poems. Hyakunin Isshu features 100 poems by 100 famous poets from the ancient Nara Period to the early Kamakura Period, spanning about 400 years of the Japenese history.
<br><br>
The manga and anime show translated parts of some of the poems that are read in a karuta match, but I found myself often wanting to read the complete poem in my own time. The available originals and their translations can be found in the forms of [blogs](https://100poets.wordpress.com/), [wikias](http://chihayafuru.wikia.com/wiki/Ogura_Hyakunin_Isshu) as a part of [departmental projects](http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html) at universities, or in a [physical form](https://www.amazon.com/gp/product/0824817052/ref=as_li_ss_tl?ie=UTF8&tag=thelev8thbud-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0824817052). I wanted to make the poems available in a more convenient form with a modern and clean user interface.
<br><br>
I also needed an excuse to use python to scrape someone else's website and set up a DRF-React app.
<br><br>
Django and Django REST framework (DRF) are used on the backend, React is used on the frontend. You can check out other vital packages in requirements.txt and package.json
<br><br>
Demo: <br>
https://fathomless-ravine-59797.herokuapp.com
<br><br>

#### Comments:
There are two different versions of **local_settings.py**, one for development and one for production, which complement the **settings.py**. Neither should be committed to version control. 

**lab-book.md** files are used throughout this django project as a way to document my work in a protocol form and leave myself notes for future reference (similar to a science lab book, but a lot less strict on format). 

_Update: All lab books were moved inside the housekeeping directory_

**Ubuntu 16.04**
`npm run test` throws ENOSPC and npm ELIFECYCLE errors because of a limited number of watchers on linux 
https://github.com/facebook/jest/issues/3254
https://stackoverflow.com/questions/22475849/node-js-error-enospc
https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers#the-technical-details


#### Styles:
_Comments:_
Use `#` for oneliners, and `'''...'''` for multiline comments in .py files 
Use `//` for oneliners, and `/*...*/` for multiline comments in .js files  

_React props:_
Do some vetting of Prettier
One prop can be on the same line 
More than one prop should shift all props to next lines 

_React state:_
define state shape in the constructor 
do not define state as a class property (ES class properties proposal) because babel will put it in the constructor anyway 
https://hackernoon.com/the-constructor-is-dead-long-live-the-constructor-c10871bea599

_Imports_
Use alphabetical order  

_Use of same variables on next lines_
Indent them under each other 
```js 
const configured = configureStore();
      configured.dispatch(requestPoems("FETCH_POEMS"));
```

_Everything else:_
Use Black for .py and Prettier for .js to impose style 
