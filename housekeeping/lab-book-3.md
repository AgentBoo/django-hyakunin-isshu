## Django+ Django REST framework backend

_Quick:_ 
```
# django-admin startapp will create a new directory 
django-admin startapp <app_name>

# django-admin startapp will not create a new directory for you if you use this syntax, so set up your own 
django-admin startapp <app_name> <existing_app_directory>
django-admin startapp karuta_api backend/karuta_api

python manage.py makemigrations 
python manage.py migrate
python manage.py runserver 
python manage.py shell 

Poem.objects.all().delete()
Poem.objects.first()
Poem.objects.last()
```

<br>

#### Setup
```
pip install djangorestframework
pip install psycopg2-binary 
```

<br>

#### Initial Settings

**1. backend/backend/settings.py** <br> 

For environ variables, use [os.getenv()](https://docs.python.org/3/library/os.html#os.getenv)

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'backend.karuta_api',
    'backend.karuta_app'
]


DATABASES = {
    'default': {
        # .postgresql is in the newer django versions, old django versions have .postgresql-psycopg2
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'poems',
        'USER': 'poems',
        'PASSWORD': 'poems',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}


REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ]
}

``` 

<br>

#### Model => serializer => view => URLconf => root URLconf (karuta_api)

**2. backend/backend/karuta_api/models.py** <br>  

_Make migrations and migrate after creating models_

```python
from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.

class Author(models.Model):
    jap = models.CharField(max_length=100, blank=True, default='Unknown')
    rom = models.CharField(max_length=100, blank=True, default='Unknown')
    eng = models.CharField(max_length=100, blank=True, default='Unknown')

    def __str__(self):
        return '[%s]  %s - %s - %s' % (self.id, self.jap, self.rom, self.eng) 


class Poem(models.Model):
    numeral = models.PositiveIntegerField(blank=True, null=True, unique=True)
    jap = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)
    rom = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)
    eng = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)

    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='poem')

    class Meta:
        ordering = ('numeral',)
        
    def __str__(self):
        return '[%s]  %s - %s - %s' % (self.numeral, self.author.jap, self.author.rom, self.author.eng)

```
Resources: 
* using dunders <br>
  https://stackoverflow.com/questions/1307014/python-str-versus-unicode

* array field for postgres <br>
  https://docs.djangoproject.com/en/2.0/ref/contrib/postgres/fields/

* one-to-one association models inheritance <br>
    * not correct for the author-poem use case (author has one poem - poem belongs to an author)
    * one-to-one signifies inheritance, where author basically is a poem (author is a basis for a poem and a poem is a subclass of author and extends it) <br>
    https://docs.djangoproject.com/en/2.0/topics/db/examples/one_to_one/ <br>
    https://stackoverflow.com/questions/25206447/when-to-use-one-to-one-relationships-in-django-models 

* foreign keys are primarily used for many-to-one associations <br>
  https://docs.djangoproject.com/en/2.0/ref/models/fields/#foreignkey

* Field.null x Field.default x Field.blank
    * a combination of all three does not really make sense 
    * either combine blank + default or blank + null 
    * for CharField, it is preferred to not set null=True <br> 
    https://docs.djangoproject.com/en/2.0/ref/models/fields/#null

* related_name to replace default model_set name for the backwards relation from the related object back to a primary object <br>
  https://docs.djangoproject.com/en/2.0/ref/models/fields/#django.db.models.ForeignKey.related_name

<br>

**3. backend/seeds.py** <br>  

_I had to use `python manage.py shell` a lot for this_

```python
import os 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django 
django.setup()

import csv 
from backend.karuta_api.models import Author, Poem

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def populate_poem():
    pass 
def csv_to_poems():
    pass 
def seed:
    pass 
``` 
Resources: 
* python fundamentals 
```python
keys = ['a','b','c']
values = [1,2,3]
dictionary = dict(zip(keys,values))

for key,value in dictionary.items()
    print(key,value)

with open(file,'r') as csvfile:
    reader = csv.reader(csvfile)
    # skip headers if headers not specified in reader()
    next(reader,None)
    # ...
    csvfile.close()
```
* os paths <br>
  https://docs.python.org/3/library/os.path.html

* csv files <br>
  https://docs.python.org/3/library/csv.html <br>
  https://docs.python.org/3/library/csv.html#csv.csvreader.__next__

* querying database, get_or_create boilerplate <br>
  https://docs.djangoproject.com/en/2.0/ref/models/querysets/#get-or-create

* nested with statements (unnecessary) <br>
  https://stackoverflow.com/questions/26731720/how-to-avoid-nested-with-statements-when-working-with-multiple-files-in-python

<br>

**4. backend/backend/karuta_api/admin.py** <br>  

Register model with the admin interface 
```python 
from django.contrib import admin
from .models import Poem, Author


# Register your models here.
admin.site.register(Poem)
admin.site.register(Author)
```

<br>

**5. backend/backend/karuta_api/serializers.py** <br>  

_Create a `serializers.py` file in `/karuta_api`_

```python
from rest_framework import serializers 
from .models import Poem, Author


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('jap', 'rom', 'eng') 

# serialize one 
class PoemSerializer(serializers.ModelSerializer):
    # serialize one
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Poem 
        fields = ('author','jap','rom','eng')

``` 
Resources: 
* serializer relations <br>
  http://www.django-rest-framework.org/api-guide/relations/#nested-relationships

<br>

**6. cli** <br>

```
python manage.py makemigrations 
python manage.py migrate 

python manage.py shell 

from backend.karuta_api.models import Poem, Author 
from backend.karuta_api.serializers import AuthorSerializer, PoemSerializer 

=> checkout models and serializers
```

<br>

**7. backend/backend/karuta_api/views.py** <br>  

```python 
from rest_framework import generics 
from .models import Poem
from .serializers import PoemSerializer 


# Create your views here.

# serialize many => list 
class PoemList(generics.ListAPIView):
    queryset = Poem.objects.all().order_by('numeral')
    serializer_class = PoemSerializer

# serialize one => read + update
class PoemDetail(generics.RetrieveUpdateAPIView):
    lookup_field = 'numeral'
    queryset = Poem.objects.all().order_by('numeral')
    serializer_class = PoemSerializer
```
Resources: 
* Generic views <br> 
  http://www.django-rest-framework.org/api-guide/generic-views/#concrete-view-classes
* lookup_field attr <br>
  http://www.django-rest-framework.org/api-guide/generic-views/#attributes

<br>

**8. backend/backend/karuta_api/urls.py** <br>  

_Create a `urls.py` file in `/karuta_api`_

```python
from django.urls import path
from .views import PoemList, PoemDetail


urlpatterns = [
    path('poems', PoemList.as_view(), name='poem-list'),
    path('poems/<int:numeral>', PoemDetail.as_view(), name='poem-detail')
]
```
Resources: 
* specific lookup field <br>
  https://docs.djangoproject.com/en/2.0/topics/http/urls/#example <br>
  http://www.django-rest-framework.org/api-guide/generic-views/#attributes


<br>

**9. backend/backend/urls.py** <br>  

```python 
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('api/', include('backend.karuta_api.urls')),
    path('admin/', admin.site.urls),
]

```
Resources: <br>
http://www.django-rest-framework.org/tutorial/quickstart/#settings

<br>

**10. cli** <br>

```
python manage.py makemigrations 
python manage.py migrate 

python manage.py shell 

python manage.py runserver
```

<br>

#### Notes
_This set up is enough to create a consumable api to retrieve poems, but compatibility with react is going to be ensured next_

<br>

#### Resources: 
https://docs.python.org/3/library/os.html#os.getenv <br>

<br>
<br>
<br>