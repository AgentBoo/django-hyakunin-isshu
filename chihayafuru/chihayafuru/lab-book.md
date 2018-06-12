# Django has a MTV (model-view-template) workflow

1. cli
  ```
  python manage.py startapp poems
  touch poems/urls.py
  ```
* to check problems in django before running migrations
  ```
  python manage.py check
  ```


2. root URLconf
* point root URLconf to poems.urls URLconf

```python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('poems.urls')),
    path('admin/', admin.site.urls),
]
```


3. cli
* setup postgresql
```
createdb poems
psql poems
pip install psycopg2-binary
python manage.py migrate
psql poems
     polls=# \dt <br>
     polls=# CREATE USER polls WITH PASSWORD 'polls'; <br>
     polls=# ALTER ROLE polls SET client_encoding TO 'utf8'; <br>
     polls=# ALTER ROLE polls SET default_transaction_isolation TO 'read committed'; <br>
     polls=# ALTER ROLE polls SET timezone TO 'UTC'; <br>
     polls=# GRANT ALL PRIVILEGES ON DATABASE polls TO polls; <br>
```


4. chihayafuru/settings.py
* register poems inside INSTALLED_APPS
* specify database configuration
* change time zone from 'UTC' to local

* manage.py migrate command will only run migrations for apps in INSTALLED_APPS

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'poems'
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'poems',
        'USER': 'poems',
        'PASSWORD': 'poems',
        'HOST': '',
        'PORT': '5432',
    }
}

TIME_ZONE = 'America/Indiana/Indianapolis'

```


5. poems/models.py
```python
from django.db import models

class Poem(models.Model):
  # ...
class Jap(models.Model):
  # ...
class Rom(models.Model):
  # ...
class Eng(models.Model):
  # ...
```


5.5. cli
```
python manage.py makemigrations
python manage.py migrate

python manage.py createsuperuser

python manage.py shell
```


8. poems/views.py



9. poems/urls.py
``` python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```


10. chihayafuru/settings.py  
TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')

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

```
mkdir chihayafuru/templates/poems 
touch chihayafuru/templates/poems/index.html
```


11. poems/admin.py
* register poems with admin interface

``` python
from django.contrib import admin
from .models import Poem

admin.site.register(Poem)
```
