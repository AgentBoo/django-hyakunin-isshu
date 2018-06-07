1. cli 
conda create --name chihayaenv django 
source activate chihayaenv 

git clone https://github.com/AgentBoo/django-hyakunin-isshu.git
mv django-hyakunin-isshu django-karuta 
cd django-karuta && touch lab-book.md && cd chihayafuru 


2. cli  
python manage.py runserver

pip install psycopg2 

createdb poems 
psql poems 

CREATE USER poems WITH PASSWORD 'poems';
ALTER ROLE poems SET client_encoding TO 'utf8';
ALTER ROLE poems SET default_transaction_isolation TO 'read committed';
ALTER ROLE poems SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE poems TO poems;
\q 

https://docs.djangoproject.com/en/2.0/ref/databases/#postgresql-notes


3. settings.py 

TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'poems',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ TEMPLATE_DIR ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'poems',
        'USER': 'poems',
        'PASSWORD': 'poems',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}



3. chihayafuru/urls.py 
``` python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
	path('', include('poems.urls')),
    path('admin/', admin.site.urls),
]
```

4. poems/views.py 
``` python
from django.shortcuts import render

# Create your views here.
def index(request):
	context = { 'poems': 'Hello world' }
	return render(request, 'poems/index.html', context)
```

5. poems/urls.py 
``` python
from django.urls import path 
from . import views 

urlpatterns = [
	path('', views.index, name='index')	
] 
```

6. check 
python manage.py migrate 
python manage.py runserver 


7. poems/models.py 
``` python
from django.db import models

# Create your models here.
class Poem(models.Model):
	# ... 

class Jap(models.Model):
	# ... 1-to-1 

class Rom(models.Model):
	# ... 1-to-1

class Eng(models.Model):
	# ... 1-to-1
``` 

* a parent object has to be saved before it can be assigned to a 1-to-1 relationship, otherwise ValueError will be raised 


8. python shell 
Poem.objects.all().delete()


9. seeds.py 
Create a script to populate database from 3 files 
``` python
# fundamentals 

keys = ['a','b','c']
values = [1,2,3]
dictionary = dict(zip(keys,values))

for key,value in dictionary.items()
    print(key,value)

with open(file,'r') as csvfile:
    reader = csv.reader(csvfile)
    next(reader,None)
    # ...
    csvfile.close()
```

10. poems/views.py
``` python  
from django.shortcuts import render
from .models import Poem 

# Create your views here.
def index(request):
    poems_list = Poem.objects.order_by('numeral')
    context = { 'poems': poems_list }
    return render(request, 'poems/index.html', context)
```

11. settings.py 
STATIC_DIR = os.path.join(BASE_DIR, 'static')
STATICFILES_DIRS = [STATIC_DIR]


12. templates/poems/index.html 
Create an ordered list of tables with all versions of the poems


13. static/poems/css/styles.css 
Add table styles 