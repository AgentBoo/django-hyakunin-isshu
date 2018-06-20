## Deployment to Heroku

Start deployment right _after_ create-react-app to test if things will work alright (end of lab-book-4) <br>
Heroku provides an example setup of [django + heroku](https://github.com/heroku/python-getting-started) <br>

<br>

_Check if everything works locally_
```
# one terminal tab 
cd django-karuta/backend 
python manage.py runserver 

# second terminal tab 
cd django-karuta/backend/karuta
npm start 
```

<br>

#### Setting up Postgres for production 

Heroku recommends running Postgres locally to ensure parity between environments 
Export DATABASE_URL env variable for `dj-database-url` to pick up on it. 

The `dj_database_url.config()` method returns a Django database connection dictionary, populated with all the data specified in your URL. There is also a `conn_max_age` argument to easily enable Django's connection pool (recommended by Heroku).

```
pip install dj-database-url

export DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/NAME
```

```python
# settings.py 

import dj_database_url

DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)
```
Resources: <br>
https://github.com/kennethreitz/dj-database-url <br>
https://devcenter.heroku.com/articles/heroku-postgresql#local-setup <br>
https://devcenter.heroku.com/articles/heroku-postgresql#connecting-with-django <br>
https://devcenter.heroku.com/articles/python-concurrency-and-database-connections#persistent-connections

<br>

#### Gunicorn, Procfile, requirements

**1. Gunicorn**<br>

Gunicorn is the recommended HTTP server to use with Django on Heroku. It is a pure-Python HTTP server for WSGI applications that can run multiple Python concurrent processes within a single heroku dyno 

```
pip install gunicorn  
```
Resources:
* deploying apps with gunicorn 
    * with a typical django app memory footprint, you can expect to run 2-4 gunicorn worker processes on a free/hobby/standard-1x dyno 
    * gunicorn automatically honors WEB_CONCURRENCY env variable, which is set automatically by heroku based on processes' Dyno size 
    * gunicorn restarts a worker if it hasn't completed any work within last 30s <br>
    https://devcenter.heroku.com/articles/python-gunicorn

<br>

**2. Create a Procfile** (to explicitly declare what cmd should be executed to start the app) <br>

A `Procfile` declares a single process type (e.g. `web` process type will be attached to the HTTP routing stack of heroku and receive web traffic when deployed) 

```
# Procfile

web: gunicorn backend.wsgi --log-file -

# if slow app boot time 
web:gunicorn backend.wsgi --preload --log-file -

# if using a more complex tree structure, use --pythonpath flag 
web: gunicorn --pythonpath './django/backend' backend.wsgi --preload --log-file -
```

<br>

**3. requirements.txt** <br>

_Gunicorn and whitenoise should already be installed locally (so you can freeze them)_ 
```
pip freeze > requirements.txt
pip install -r requirements.txt
```
Resources: 
* requirements.txt <br>
  https://pip.pypa.io/en/stable/user_guide/#requirements-files <br>
  https://pip.pypa.io/en/stable/reference/pip_install/#requirements-file-format 

* specifying a python runtime (python3 v python2): newly created python applications default to python3 (Python 3.6.4 as of 15 June 18) <br>
  https://devcenter.heroku.com/articles/python-runtimes

<br>

**4. package.json**

Move/copy the package.json from the react app base dir into the root dir when ready for deployment, otherwise Heroku will not detect, that there is a Node app. 

<br>

**5. Deployment** 

  1. Check `settings.py` and change import to `local_settings.prod`
  2. Check `local_settings.prod`
  3. Generate requirements with `pip freeze > requirements.txt` 
  4. Check runtime.txt 
  5. Check path in Procfile
  6. Run `python manage.py check --deploy`
  7. Check `package.json` in root dir 
  8. Check `.gitignore` and comment out sections that belong to dev environment 
  
```
# Generate production bundles by invoking webpack one time with production config 
npm run build 

# Run collectstatic to push compiled staticfiles to master 
python manage.py collectstatic 

# Check everything by starting the server with local_settings.prod.py
python manage.py runserver 

# heroku on ubuntu
sudo snap install heroku --classic
heroku create 

# check all heroku apps 
heroku apps

# buildpacks (last buildpack determines the process type of the app)
heroku buildpacks:add --index 1 heroku/nodejs -a <heroku app name>
heroku buildpacks:add --index 2 heroku/python -a <heroku app name>
heroku buildpacks 

# create config variables BEFORE deployment, especially the collectstatic disable 
heroku config:set DISABLE_COLLECTSTATIC=1
heroku config:set DJANGO_SECRET_KEY='the actual key'
heroku config:set ROOT_URL='https://fierce-hollows-19151.herokuapp.com/'
heroku config:set WEB_CONCURRENCY=3

# DEPLOY
git push heroku master 

# make sure at least 1 instance of app is running 
heroku ps:scale web=1
heroku open

# check logs 
heroku logs --tail

# list config vars for your app 
heroku config 

# additonal local env vars 
heroku config:set SUSHI='sushi'

# for gunicorn configuration
heroku config:set WEB_CONCURRENCY=3

```

<br>

#### Heroku postgresql 
 
```
# check out which addons are used (heroku-postgresql (postgresql-concave-52656) should appear in the list)
heroku addons

# show information about postgres 
heroku pg:info 

# continuously monitor status of db 
watch heroku pg:info 

# connect to the remote db 
heroku pg:psql

# then try to acquire an advisory lock before running a migration
SELECT pg_try_advisory_lock(migration); 

# then check number of active connections
SELECT count(*) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND usename = current_user;

# MIGRATE
heroku run python manage.py migrate 

# SEED 
heroku run python seeds.py 

# check the django shell 
heroku run python manage.py shell 
```

```
# pull remote data from a heroku postgrse db to a newly created local db example (you will be prompted to 
# drop an already existing local db before proceeding) 
heroku pg:pull HEROKU_POSTGRESQL_MAGENTA mylocaldb --app sushi 

# if credentials are needed for new local db example 
PGUSER=postgres PGPASSWORD=password heroku pg:pull HEROKU_POSTGRESQL_MAGENTA mylocaldb --app sushi 

# push local db data to a remote heroku db (remote db must be empty, or you will be prompted to pg:reset a remote db if it's not empty)
heroku pg:push mylocaldb HEROKU_POSTGRESQL_MAGENTA --app sushi 

```

<br>

#### Resources  

**ALLOWED_HOSTS**<br>
https://devcenter.heroku.com/articles/getting-started-with-python#introduction
https://stackoverflow.com/questions/31685688/is-allowed-hosts-needed-on-heroku <br>
https://github.com/heroku/django-heroku/issues/5 <br>

<br>

**Env variables:** <br>

https://devcenter.heroku.com/articles/config-vars#managing-config-vars <br>
https://stackoverflow.com/questions/37473108/how-do-you-add-environment-variables-to-your-django-project <br>
https://godjango.com/blog/working-with-environment-variables-in-python/ <br>
https://docs.djangoproject.com/en/2.0/topics/settings/#the-django-admin-utility <br>

<br>

**Deploying Node.js app:** <br>
https://devcenter.heroku.com/articles/nodejs-support <br>

<br>

**Release phase (not recommended for db migrations)** <br>
https://devcenter.heroku.com/articles/release-phase <br>

Release phase can be useful for tasks such as sending CSS, JS, and other assets from your app's slug to a CDN or S3 bucket or potentially running db schema migrations. <br>
If a release phase task fails, the new release is not deployed, leaving your current release unaffected. <br>
For migrations, it is suggested to use `heroku run` instead. <br>

```
# Procfile
release: python manage.py migrate 
web: gunicorn backend.wsgi --log-file 
```

<br>

**Deploying python apps** <br> 
https://devcenter.heroku.com/articles/deploying-python

<br>

**Tutorials** <br>
[MDN deployment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Deployment) <br>

<br>

#### Issues 
https://www.reddit.com/r/django/comments/2848gb/bad_request_400_on_heroku_where_to_look/

<br>
<br>
<br>