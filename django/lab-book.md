## Django+ Django REST framework backend

0. Quick 
```
# django-admin startapp will create a new directory 
django-admin startapp <app_name>

# django-admin startapp will not create a new directory for you if you use this syntax, so set up your own 
django-admin startapp <app_name> <existing_app_directory>
django-admin startapp karuta backend/karuta

python manage.py makemigrations 
python manage.py migrate
python manage.py runserver 
python manage.py shell 

Poem.objects.all().delete()
```


#### Setup
1. cli 
Move ./chihayafuru django project to a different folder 
<br>
Clone repo from 
``` 
git clone https://github.com/AgentBoo/django-hyakunin-isshu.git
``` 
<br>
<br>
[kuma](https://github.com/mozilla/kuma) will serve as an example for file tree structure
    * backend related apps are placed inside the backend project 
    * frontend app is placed next to the backend project 
<br>
Protocol
```
conda create --name chihayaenv django 
source activate chihayaenv 

mkdir django-karuta && cd django-karuta  

# makes django-karuta/scraper: put scripts for scraping the ogura-hyakunin-isshu source website here  
mkdir scraper

# makes django-karuta/django 
mkdir django && cd django

# makes django-karuta/django/poems: put csv files with poems here   
mkdir poems 

# makes django-karuta/django/backend: start django project here 
django-admin startproject backend . && cd backend

# makes django-karuta/django/backend/frontend: npm i -g create-react-app && create-react-app frontend 
# if you have npm 5.2+ and create-react-app isn't already installed via yarn or npm  
npx create-react-app frontend 

# makes django-karuta/django/backend/backend/karuta
cd backend && mkdir karuta  
django-admin startapp karuta backend/karuta 

pip install djangorestframework
pip install psycopg2-binary 

createdb poems 
psql poems 

CREATE USER poems WITH PASSWORD 'poems';
ALTER ROLE poems SET client_encoding TO 'utf8';
ALTER ROLE poems SET default_transaction_isolation TO 'read committed';
ALTER ROLE poems SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE poems TO poems;
\q
```

* current tree 
    * django-karuta 
        * django
            * backend
                * backend 
                    * karuta
                * frontend  
                * templates 
                * manage.py
                * seeds.py
            * poems  
            * lab-book
            * .gitignore  
        * scraper  

* workflow: model => serializer => view => urls.py => root URLconf

Resources: 
* create-react-app <br>
https://github.com/facebook/create-react-app <br>
https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f


2. backend/settings.py 
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'backend.karuta',
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


REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
    ]
}
``` 


3. cli 
* create superuser 
```
python manage.py createsuperuser --email chibi.chan@seznam.cz --username admin hakuoro++++
``` 


4. karuta/models.py 
```python
from django.db import models
from django.contrib.postgres.fields import ArrayField


# Create your models here.
# Check out the imports: use ArrayField instead of models.ArrayField

class Author(models.Model):
    jap = models.CharField(max_length=100, blank=True, default='Unknown')
    rom = models.CharField(max_length=100, blank=True, default='Unknown')
    eng = models.CharField(max_length=100, blank=True, default='Unknown')

    def __str__(self):
        return '%s  %s %s %s' % (self.id, self.jap, self.rom, self.eng) 


class Poem(models.Model):
    # unique=True implies the creation of a unique index 
    numeral = models.IntegerField(blank=True, null=True, unique=True)
    jap = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)
    rom = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)
    eng = ArrayField(models.CharField(max_length=200, blank=True, default='None'), blank=True, null=True)

    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='poem')

    class Meta:
        ordering = ('numeral',)
        
    def __str__(self):
        return '%s  %s %s %s' % (self.numeral, self.author.jap, self.author.rom, self.author.eng) 
```
 
Resources: 
* using dunders <br>
https://stackoverflow.com/questions/1307014/python-str-versus-unicode

* array field for postgres <br>
https://docs.djangoproject.com/en/2.0/ref/contrib/postgres/fields/

* one-to-one association models inheritance <br>
    * not correct for the author-poem use case (author has one poem - poem belongs to an author)
    * one-to-one signifies inheritance, almost as if an author basically is a poem (author is a basis for a poem and a poem is a subclass of author and extends it) <br>
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


5. seeds.py 
```python
import os 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

import django 
django.setup()

import csv 
from backend.karuta.models import Author, Poem

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


6. backend/karuta/admin.py
* register model with admin 

```python 
from django.contrib import admin
from .models import Poem, Author

# Register your models here.
admin.site.register(Poem)
admin.site.register(Author)
```


7. karuta/serializers.py 
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


8. karuta/views.py 
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
* Generic views 
http://www.django-rest-framework.org/api-guide/generic-views/#concrete-view-classes
* lookup_field attr 
http://www.django-rest-framework.org/api-guide/generic-views/#attributes


8. backend/karuta/urls.py
```python
from django.urls import path
from .views import PoemList, PoemDetail


urlpatterns = [
    path('poems', PoemList.as_view(), name='poem-list'),
    path('poems/<int:numeral>', PoemDetail.as_view(), name='poem-detail')
]
```
Resources: <br>
* specific lookup field 
https://docs.djangoproject.com/en/2.0/topics/http/urls/#example
http://www.django-rest-framework.org/api-guide/generic-views/#attributes


9. backend/urls.py 
```python 
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('api/', include('backend.karuta.urls')),
    path('admin/', admin.site.urls),
]

```

Resources: <br>
http://www.django-rest-framework.org/tutorial/quickstart/#settings




# Deployment to heroku
Start deployment AFTER create-react-app to test if things work alright <br>
Heroku provides an example setup of [django-heroku](https://github.com/heroku/python-getting-started) <br>
Heroku web apps require a Procfile <br>

#### Check if everything works locally 
```
# one terminal tab 
cd django-karuta/django/backend 
python manage.py runserver 

# second terminal tab 
cd django-karuta/django/backend/frontend 
npm start 
```

#### Procfile, requirements, gunicorn
1. Create a Procfile (to explicitly declare what cmd should be executed to start the app)
```
Procfile

# declares a single process type (web process type will be attached to the HTTP routing stack of heroku and receive web traffic when deployed) 
# and the cmd needed to run it
web: gunicorn backend.wsgi --log-file

# if slow app boot time 
web:gunicorn backend.wsgi --preload --log-file 
```


2. requirements.txt
* install gunicorn and whitenoise locally (so you can freeze them) or add their names + versions directly to requirements.txt  
```
pip install gunicorn 
pip install whitenoise 
# installs whitenoise for you
pip install django-heroku

pip freeze > requirements.txt
pip install -r requirements.txt
```

Resources: <br>
* requirements.txt <br>
https://pip.pypa.io/en/stable/user_guide/#requirements-files <br>
https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format <br>

* specifying a python runtime (python3 v python2)
    * newly created python applications default to python3 (Python 3.6.4 as of 15 June 18) <br>
https://devcenter.heroku.com/articles/python-runtimes


3. Gunicorn 
```
pip install gunicorn  
```
Resources:
* deploying apps with gunicorn 
    * with a typical django app memory footprint, you can expect to run 2-4 gunicorn worker processes on a free/hobby/standard-1x dyno 
    * gunicorn automatically honors WEB_CONCURRENCY env variable, which is set automatically by heroku based on processes' Dyno size 
    * gunicorn restarts a worker if it hasn't completed any work within last 30s <br>
https://devcenter.heroku.com/articles/python-gunicorn


#### Django static files with django-heroku 
4. Django-heroku
* configures static files using WhiteNoise, provides logging configuration and test runner (important for heroku cli)
* automatically configures django app to work on heroku (from docs: 'automatically configures staticfiles to 'just work'')
```
pip install django-heroku
```
```python 
# settings.py (bottom of the script)
django_heroku.settings(locals()) 

# automatically configures DATABASE_URL, ALLOWED_HOSTS, WhiteNoise, Logging, Heroku CI for the app
# if SECRET_KEY env variable is set, django-heroku picks up on it too
``` 

Resources:
* example settings.py from test project by django-heroku <br>
https://github.com/heroku/django-heroku/blob/master/test/testproject/settings.py 
* test for settings.py <br>
https://github.com/heroku/django-heroku/blob/master/test/test_django_heroku.py
<br>
https://github.com/heroku/django-heroku
<br>
https://devcenter.heroku.com/articles/deploying-python
<br>
https://devcenter.heroku.com/articles/django-memcache


#### Taking care of static files manually 
5. settings.py 
* make staticfiles dir at the BASE_DIR path
* set up the staticfiles folder according to django or udemy 
```python
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Extra places for collectstatic to find static files.
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

```


6. whitenoise 
* django does not support serving static files in production 
```
pip install whitenoise
```
* settings.py 
```python 
# for dev server (whitenoise will take over from django, so it might approximate production environment better)
INSTALLED_APPS = [
    # ...
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    # ...
]

MIDDLEWARE_CLASSES = [
  # 'django.middleware.security.SecurityMiddleware',
  'whitenoise.middleware.WhiteNoiseMiddleware',
  # ...
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```
* wsgi.py (wrap your existing wsgi application in a whitenoise instance and tell it where to find your static files) 
```python
from whitenoise import WhiteNoise

from my_project import MyWSGIApp

application = MyWSGIApp()
application = WhiteNoise(application, root='/path/to/static/files')
application.add_files('/path/to/more/static/files', prefix='more-files/') 

# or
import os

from django.core.wsgi import get_wsgi_application
from whitenoise.django import DjangoWhiteNoise

os.environ.setdefault(“DJANGO_SETTINGS_MODULE”, “reactdjango.settings”)

application = get_wsgi_application()
application = DjangoWhiteNoise(application)
```
Resources:
* whitenoise docs <br>
http://whitenoise.evans.io/en/stable/django.html


#### React related Django configs 
```
# yarn run build outputs its build artifacts into <app-name>/build/
npm run build  
```

5. backend/backend/settings.py
* configure django's static files to serve js and css from create-react-app /src directory for collectstatic 
```python
# for dev server
ALLOWED_HOSTS = ['heroku app url', 'localhost url']

REACT_APP_DIR = os.path.join(BASE_DIR, 'frontend') 

STATIC_DIR = os.path.join(REACT_APP_DIR, 'build', 'static') 

STATICFILES_DIRS = [
    STATIC_DIR, 
]

# if using whitenoise
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = [
    'whitenoise.django.GzipManifestStaticFilesStorage',
]

# at the end of settings.py -- activate django-heroku
django_heroku.settings(locals())
``` 


6. backend/backend/karuta/views.py 
```python 
import logging

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )
```


7. backend/backend/karuta/urls.py 
* frontend app view must be on a catch-all urlpattern in order for pushState routing to work 
```python
urlpatterns = [
    # last line 
    path('', FrontendAppView.as_view(), name='react'),
] 
```

8. package.json 
* check if 'npm run build' is defined somewhere in the scripts or add manually
* add exact versions of engines 
```javascript
{
    'scripts:{
        // ... ,
        'postinstall': 'npm run build'
        },
    'engines': {
        'node': 'version',
        'npm': 'version'
    },
} 
```

X. CSRF protection 
* enable CSRF protection in django 
* react side 
```javascript
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

fetch(url, {
    credentials: 'include',
    method: 'POST',
    mode: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    body: {}
   })
  } 
```
* django side 
``` views.py 
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
def myview(request):
    #...

```

Resources:<br>
* csrf when using redux
```
npm install redux-csrf --save
# set csrf token in redux store 
setCsrfToken(token)
```

<br>
https://docs.djangoproject.com/en/2.0/ref/csrf/#acquiring-the-token-if-csrf-use-sessions-is-false <br>
https://github.com/js-cookie/js-cookie/ <br>
https://www.techiediaries.com/django-react-forms-csrf-axios/

X. CORS
```
pip install django-cors-headers
``` 
* cors middleware should be placed as high as possible -- before any middleware that can generate responses as Django's CommonMiddleware or Whitenoise's WhiteNoiseMiddleware 
```python 
# settings.py 
INSTALLED_APPS = (
    ...
    'corsheaders',
    ...
)

MIDDLEWARE = [  # Or MIDDLEWARE_CLASSES on Django < 1.10
    ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]


CORS_ORIGIN_WHITELIST = (
    'google.com',
    'hostname.example.com',
    'localhost:8000',
    '127.0.0.1:9000'
)

# for integration with csrf 
CORS_ORIGIN_WHITELIST = (
    'read.only.com',
    'change.allowed.com',
)

CSRF_TRUSTED_ORIGINS = (
    'change.allowed.com',
)

# This is default and does not have to be specified
CORS_ALLOW_HEADERS = (
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
)
```


Resources: <br>
https://github.com/ottoyiu/django-cors-headers

#### Heroku and postgres
X. Postgres setup
* heroku recommends running Postgres locally to ensure parity between environments 
* export DATABASE_URL env variable for your app to connect to it locally 
```
export DATABASE_URL=postgres://$(whoami)
```
* connecting to db with django 
```
pip install dj-database-url
```
```python
# settings.py (at the bottom of a script)
import dj_database_url

DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)
```

Resources:
<br>
https://devcenter.heroku.com/articles/heroku-postgresql#local-setup
<br>
https://devcenter.heroku.com/articles/heroku-postgresql#connecting-with-django
<br>
https://devcenter.heroku.com/articles/python-concurrency-and-database-connections#persistent-connections


X. Deployment 
```
# check app locally 
python manage.py collectstatic 
heroku local web 

# heroku  
heroku create 

# buildpacks (last buildpack determines the process type of the app)
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 heroku/python
heroku buildpacks 

# deploy app 
git push heroku master 

# make sure at least 1 instance of app is running 
heroku ps:scale web=1
heroku open

# check logs 
heroku logs --tail

# list config vars for your app 
heroku config 

# set local env vars 
heroku config:set SUSHI='sushi'

# for gunicorn configuration
heroku config:set WEB_CONCURRENCY=3

```


X. Heroku postgres 
```
# check out which addons are used (heroku-postgresql (postgresql-concave-52656) should appear in the list)
heroku addons

# show information about postgres 
heroku pg:info 

# connect to the remote db 
heroku pg:psql
# then try to acquire an advisory lock before running a migration
SELECT pg_try_advisory_lock(migration); 
# then check number of active connections
SELECT count(*) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND usename = current_user;

# migrate 
heroku run python manage.py migrate 

# check the django shell 
heroku run python manage.py shell 

# continuously monitor status of db 
watch heroku pg:info 

# pull remote data from a heroku postgrse db to a newly created local db example (you will be prompted to 
# drop an already existing local db before proceeding) 
heroku pg:pull HEROKU_POSTGRESQL_MAGENTA mylocaldb --app sushi 

# if credentials are needed for new local db example 
PGUSER=postgres PGPASSWORD=password heroku pg:pull HEROKU_POSTGRESQL_MAGENTA mylocaldb --app sushi 

# push local db data to a remote heroku db (remote db must be empty, or you will be prompted to pg:reset a remote db if it's not empty)
heroku pg:push mylocaldb HEROKU_POSTGRESQL_MAGENTA --app sushi 

```


#### Heroku misc 
Env variables 
Resources: <br>
https://devcenter.heroku.com/articles/config-vars#managing-config-vars <br>
https://stackoverflow.com/questions/37473108/how-do-you-add-environment-variables-to-your-django-project <br>
https://godjango.com/blog/working-with-environment-variables-in-python/ <br>
https://docs.djangoproject.com/en/2.0/topics/settings/#the-django-admin-utility <br>

#### Release phase (not for db migrations)
* release phase can be useful for tasks such as sending CSS, JS, and other assets from your app's slug to a CDN or S3 bucket or running db schema migrations 
* if a release phase task fails, the new release is not deployed, leaving your current release unaffected 
* for migrations, it is suggested to use heroku run instead 
```
Procfile

release: python manage.py migrate 
web: gunicorn backend.wsgi --log-file 
```

Resources:<br>
* specifying relase phase tasks in Procfile <br>
https://devcenter.heroku.com/articles/release-phase

<br>
<br>
<br>

Resources: 
* heroku docs <br> 
https://devcenter.heroku.com/articles/deploying-python

* tutorials <br>
[react + django simple repo](https://github.com/SamSamskies/django-webpack-heroku-example)
[react + django (published 2015)](https://owais.lone.pw/blog/webpack-plus-reactjs-and-django/)