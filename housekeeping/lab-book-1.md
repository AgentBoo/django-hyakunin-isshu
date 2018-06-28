## Django project setup 

The current repository can be cloned from: 
```
git clone https://github.com/AgentBoo/django-hyakunin-isshu.git
```

[kuma](https://github.com/mozilla/kuma) will serve as an example for file tree structure:
1. backend related apps are placed inside the backend project  
2. frontend app is placed next to the backend project 

<br>

#### Current tree 

```
| django-karuta 
|-- backend
    |-- karuta_api
    |-- karuta_app 
|-- housekeeping
|-- karuta 
|-- staticfiles 
|-- templates 
|-- .gitignore
|-- manage.py   
|-- package.json 
|-- Procfile   
|-- README.md
|-- requirements.txt 
|-- runtime.txt 
|-- seeds.py

# karuta project specific directories 
|-- scraper 
|-- seeds  
```

_NOTE: Exact heroku cli commands in heroku docs rely on the fact that your project actually starts at `/<django_project>`, so initialize `.git` repo inside the django project to make things easier in the long run, not outside. However, a more complex structure can be worked with_

<br>

#### Setup and file tree 

_Environment_
```
conda create --name chihayaenv django 
source activate chihayaenv 
```

<br>

_Initial dependencies_
```python 
pip install djangorestframework
pip install django-cors-headers 
pip install django-webpack-loader 
pip install psycopg2-binary 
pip install whitenoise 
pip install gunicorn 
pip install dj-database-url
``` 

```javascript 
npm i -S react-app-rewired 
npm i -S webpack-bundle-tracker
```

<br>

_Protocol_
```
# makes backend/ 
django-admin startproject backend . && cd backend 

# makes backend/scraper: put scripts for scraping the ogura-hyakunin-isshu resource here  
mkdir scraper

# makes backend/seeds: put csv files with scraper poem outputs here   
mkdir seeds 

# makes backend/staticfiles: register staticfiles in settings.py  
mkdir staticfiles 

# makes backend/templates: register templates in settings.py  
mkdir templates 

# makes backend/housekeeping: optional directory for lab-books etc. 
mkdir housekeeping
```

```
# put backend-related apps inside a backend project directory, next to settings.py and wsgi.py files
# makes backend/backend/karuta_api and karuta_app 
cd backend/backend  

django-admin startapp karuta_api 
django-admin startapp karuta_app  
```

```
# if you have npm 5.2+ and create-react-app is (or is not) already installed via yarn or npm: npx create-react-app karuta
# makes backend/karuta:  react app

sudo npm i -g create-react-app 
create-react-app karuta 
```

```
createdb poems 
psql poems 

CREATE USER poems WITH PASSWORD 'poems';
ALTER ROLE poems SET client_encoding TO 'utf8';
ALTER ROLE poems SET default_transaction_isolation TO 'read committed';
ALTER ROLE poems SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE poems TO poems;
\q
```

#### Environ variables 

```
export DATABASE_URL=postgres://%2Fvar%2Flib%2Fpostgresql/dbname or postgres://USER:PASSWORD@HOST:PORT/NAME
export DJANGO_SECRET_KEY=boomshakalaka
export DJANGO_DEBUG=True
```

<br>

#### Resources: 
* create-react-app <br>
  https://github.com/facebook/create-react-app <br>
  https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f <br>
* dj-database-url db url schema 
  https://github.com/kennethreitz/dj-database-url#url-schema

<br>
<br>
<br>