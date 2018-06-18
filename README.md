# django-hyakunin-isshu


This project was inspired by the excellent [manga](https://myanimelist.net/anime/10800/Chihayafuru) and [anime](http://www.crunchyroll.com/chihayafuru) Chihayafuru about the players of karuta and Ogura Hyakunin Isshu. Karuta is a unique japanese sport of acute reflexes, hand-eye-ear coordination, and memorization skills, centered around the Ogura Hyakunin Isshu antology of poems. Hyakunin Isshu features 100 poems by 100 famous poets from the ancient Nara Period to the early Kamakura Period, spanning about 400 years of the Japenese history.
<br>
The manga and anime show translated parts of some of the poems that are read in a karuta match, but I found myself often wanting to read the complete poem in my own time. The available originals and their translations can be found in the forms of [blogs](https://100poets.wordpress.com/), [wikias](http://chihayafuru.wikia.com/wiki/Ogura_Hyakunin_Isshu) as a part of [departmental projects](http://jti.lib.virginia.edu/japanese/hyakunin/frames/hyakuframes.html) at universities, or in a [physical form](https://www.amazon.com/gp/product/0824817052/ref=as_li_ss_tl?ie=UTF8&tag=thelev8thbud-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0824817052). I wanted to make the poems available in a more convenient form with a modern and clean user interface.
<br> 
I also needed an excuse to use python to scrape someone else's website and set up a DRF-React app.
<br>
<br>
Django and Django REST framework (DRF) are used on the backend, React is used on the frontend. You can check out other vital packages in requirements.txt and package.json
<br>
<br>
Demo: 

<br>
<br>

#### Comments:
Add **local_settings** to **.gitignore** for remote push to GitHub, but make sure that **local_settings** is committed and **NOT** ignored for heroku pushes.   


**lab-book.md** files are used throughout this django project as a way to document my work in a protocol form and leave myself notes for future reference (similar to a science lab book, but a lot less strict on format). 


_Update: All lab books were moved inside the housekeeping directory_