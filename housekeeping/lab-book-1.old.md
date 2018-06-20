## Django project setup 

_Originally, there was a chihayafuru django project, but the project was moved to a different folder_

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
|-- django
    |-- backend
        |-- backend 
            |-- karuta_api
            |-- karuta_app 
        |-- karuta_react 
        |-- staticfiles 
        |-- templates 
        |-- manage.py
        |-- seeds.py
    |-- poems  
|-- scraper 
|-- .gitignore   
|-- README.md 
```

_NOTE: Heroku cli commands rely on the fact that your project actually starts at /backend, making manage.py available from root directory. Keeping Procfile, requirements, .gitignore and everything else there is also more helpful for deployment, but a more complex structure can be worked with_


<br>

#### Setup and file tree 

Protocol
```
conda create --name chihayaenv django 
source activate chihayaenv 
```

```
# makes django-karuta
mkdir django-karuta && cd django-karuta  

# makes django-karuta/scraper: put scripts for scraping the ogura-hyakunin-isshu resource here  
mkdir scraper

# makes django-karuta/django 
mkdir django && cd django

# makes django-karuta/django/poems: put csv files with poems here   
mkdir poems 

# makes django-karuta/django/backend: start django project here 
django-admin startproject backend .
```

```
# makes django-karuta/django/backend/backend/karuta_api and karuta_app 
cd backend/backend  

django-admin startapp karuta_api 
django-admin startapp karuta_app  
```

```
# makes django-karuta/django/backend/karuta_react 

# if you have npm 5.2+ and create-react-app isn't already installed via yarn or npm: npx create-react-app karuta_react  
sudo npm i -g create-react-app 
create-react-app karuta_react 
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
<br>

#### Resources: 
* create-react-app <br>
  https://github.com/facebook/create-react-app <br>
  https://gist.github.com/gaearon/4064d3c23a77c74a3614c498a8bb1c5f <br>

<br>

### All dependencies (requirements.txt and package.json copypasta):