###### Checklist:
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
