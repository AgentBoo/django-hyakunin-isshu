## Checklist 

**1. settings.py**

Important settings.py variables are:
1.  `SECRET_KEY`, 
2.  `DEBUG`, 
3.  `ALLOWED HOSTS`, 
4.  `STATIC_ROOT`, 
5.  `STATIC_URL`, 
6.  `MEDIA_ROOT`, 
7.  `MEDIA_URL`,
8.  `CSRF_COOKIE_SECURE`
9.  `SESSION_COOKIE_SECURE`
10. `TEMPLATES`
 
Check settings.py against django deployment [checklist](https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/)

_A template for settings.py is in `/boilerplates`_

_Pay attention to_
```python
import os 

REACT_APP_DIR = ''
INSTALLED_APPS = ''
ROOT_URLCONF = '' 				# defined for you by django-admin
WSGI_APPLICATION = '' 			# defined for you by django-admin  
```

_Standard_
```python
import os 

BASE_DIR = ''
TEMPLATE_DIR = ''
REACT_APP_DIR = ''
DEBUG = bool 

try:
   from .local_settings import *
except ImportError:
    raise Exception('A local_settings.py file is required to run this project') 


SECRET_KEY = DJANGO_SECRET_KEY
ALLOWED_HOSTS = LOCAL_HOSTS 
CORS_ORIGIN_WHITELIST = LOCAL_WHITELIST 
CSRF_TRUSTED_ORIGINS = LOCAL_TRUSTED_ORIGINS
INSTALLED_APPS = []
MIDDLEWARE = []
ROOT_URLCONF = ''
TEMPLATES = []
WSGI_APPLICATION = ''
DATABASES = LOCAL_DATABASE
AUTH_PASSWORD_VALIDATORS = []
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True
STATIC_URL= ''
STATIC_ROOT= ''
STATICFILES_DIRS = []
WEBPACK_LOADER = []
REST_FRAMEWORK = []
```

**2. local_settings.py**

**Avoid committing `local_settings` to source control**

_A template for local_settings.production.py and local_settings.dev.py is in `/boilerplates`_

_Pay attention to_
```python
import os
import dj_database_url

DJANGO_SECRET_KEY = ''
LOCAL_DATABASE = {}
LOCAL_WHITELIST = ()
LOCAL_TRUSTED_ORIGINS = ()
```

_Standard_
```python 
import os
import dj_database_url

DJANGO_SECRET_KEY = ''
DEBUG = bool
LOCAL_DATABASE = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}
LOCAL_HOSTS = []
LOCAL_WHITELIST = []
LOCAL_TRUSTED_ORIGINS = [] 
```

**3. requirements.txt**

```
pip freeze > requirements.txt 
```

_At minimum, these have to be present_
```
dj-database-url==0.5.0
Django==2.0.5
django-cors-headers==2.2.0
django-webpack-loader==0.6.0
djangorestframework==3.8.2
gunicorn==19.8.1
psycopg2-binary==2.7.4
whitenoise==3.3.1
```

**4. runtime.txt**
```
python-3.6.5
```

**5. Procfile**

_At minimum_
```
web: gunicorn <project dir>.wsgi --preload --log-file -
```

#### Predeploy 

**1. Run `python manage.py check --deploy` before deployment** 


**2. Copy package.json into root**


**3. Root directory needs to contain UPDATED**
- .gitignore 
- manage.py 
- package.json 
- Procfile 
- requirements.txt 
- runtime.txt 
- seeds.py


**4. .gitignore**


**5. For maximum security, make sure database servers only accept connections from your application servers.**


**6. Heroku**

_Create heroku app_
```
heroku create
```

_Disable collecstatic + set environ variables_
```
heroku config:set DISABLE_COLLECTSTATIC=1
heroku config:set WEB_CONCURRENCY=3
heroku config:set DJANGO_DEBUG=False
```

_Set up buildpacks with Node followed by Python_
```
heroku apps 

heroku buildpacks:add --index 1 heroku/nodejs -a <heroku app name>
heroku buildpacks:add --index 2 heroku/python -a <heroku app name>
heroku buildpacks 
```

_Run build and collectstatic_
```
npm run build 
python manage.py collectstatic
python manage.py runserver 
```

_Push to heroku master_
```
git add . 
git commit -am "deploy"
git push heroku master
```

_Migrate + seed + check_	
```
heroku run python manage.py migrate
heroku run python seeds.py
heroku run python manage.py shell 
```

<br>
<br>
<br>


#### Resources 
* ALLOWED_HOSTS
  https://stackoverflow.com/questions/31685688/is-allowed-hosts-needed-on-heroku <br>
  https://github.com/heroku/django-heroku/issues/5 <br>




After finishing django-karuta and django-propensitity with authentication, standardize following files:
- settings.py 
- local_settings.py 
- requirements.txt 
- runtime.txt
- Procfile
- .gitignore