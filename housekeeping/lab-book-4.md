## Integrating React app in dev and production environments

#### Setup

```
pip install django-cors-headers
pip install django-webpack-loader
pip install whitenoise

npm i -S react-app-rewired 
npm i -S webpack-bundle-tracker
npm i -S js-cookie
``` 

React's dev server will be sending `cors` requests from React's webpack dev server localhost:3000 to Django's localhost:8000.

There are two ways you can go about it: 
1. One simple solution is to include `'proxy': http://127.0.0.1:8000'` in the react app's `package.json`, and then use relative urls throughout the react app. 
2. If `django-cors-headers` or other `cors` middleware is installed on django's side, absolute urls can be used throughout the react app.

The thought process behind this particular way of integrating react with django-DRF is described further [below]() 

<br>

#### CORS

**11. backend/backend/settings.py** <br>

[django-cors-headers] adds CORS headers to http responses.
Cors middleware should be placed as high as possible before any middleware that can generate responses such as Django's `CommonMiddleware` or `WhiteNoiseMiddleware` 

```python 
# backend/settings.py 
INSTALLED_APPS = (
    ...
    'corsheaders',
    ...
)

MIDDLEWARE = [  
    ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

# list of origin hostnames authorized to make cross-site http requests 
CORS_ORIGIN_WHITELIST = (
    'read.only.com',
    'change.allowed.com',
)

# for integration with csrf 
CSRF_TRUSTED_ORIGINS = (
    'change.allowed.com',
)

```
Resources: <br>
https://github.com/ottoyiu/django-cors-headers

<br>

#### CSRF

**12. backend/backend/karuta_app/views.py** <br>

I do not want to pollute karuta_api `views.py` and `urls.py` with React App stuff, so a separate app, called `karuta_app` is created.
All the views and urls associated with serving the react app will be there.

React app view must be on a catch-all urlpattern in order for CRA's (create-react-app) `pushState()` routing to work 

CSRF protection is by default enabled in Django.
If not, enable it by including `django.middleware.csrf.CsrfViewMiddleware` in `settings.py` `MIDDLEWARE`)

In a Django environment, including a template tag `{% csrf_token %}`  in a POST form would suffice. 
In the views, `render()`, `generic` views, or `contrib` apps add `RequestContext` function take care of handling csrf_tokens.

1. If CSRF_USE_SESSIONS is False (aka it is not mentioned in `settings.py`) <br>
   > If your view is not rendering a template containing a `{% csrf_token %}` template tag, Django might not set the CSRF token cookie (this is common in cases `<form>` elements are added dynamically to the page). To address this, Django provides a view decorator `@ensure_csrf_cookie` to force set a cookie
2. CSRF_USE_SESSIONS is True, do something else... <br>

_Django provides `@ensure_csrf_cookie` that forces the serving of a csrf token_
```python 
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


# Create your views here.
# ensure_csrf_cookie decorator only works with function based views 
# for an ensure_csrf_cookie decorator and class based views, check the Django docs 
@ensure_csrf_cookie
def reactKarutaApp(request):
  return render(request, 'index.html')
```

In a frontend environment, set a custom `X-CSRFToken` header on an http request to the value of the CSRF token in AJAX calls. 

_Frontend side_ 
```javascript
// example from django-docs
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

# inside some component method
fetch(url, {
    credentials: 'include',
    method: 'POST',
    mode: 'same-origin', ???
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': 'origin site name'
      'X-CSRFToken': csrftoken
    },
    body: {}
   }) 
```
Resources: <br>
* csrf docs 
  https://docs.djangoproject.com/en/2.0/ref/csrf/#acquiring-the-token-if-csrf-use-sessions-is-false <br>
  https://docs.djangoproject.com/en/2.0/ref/csrf/#module-django.views.decorators.csrf <br>
  https://docs.djangoproject.com/en/2.0/ref/settings/#csrf-cookie-age <br>
* ensure_csrf_cookie
  https://stackoverflow.com/questions/20122891/how-do-i-use-ensure-csrf-cookie <br>
  https://docs.djangoproject.com/en/2.0/ref/csrf/#django.views.decorators.csrf.ensure_csrf_cookie <br>
  https://docs.djangoproject.com/en/2.0/_modules/django/views/decorators/csrf/ <br>
* js-cookie 
  https://github.com/js-cookie/js-cookie/ <br>
  https://www.techiediaries.com/django-react-forms-csrf-axios/
* function based views in django  
  https://docs.djangoproject.com/en/2.0/topics/http/views/
* csrf with redux

<br>

**13. backend/backend/karuta_app/urls.py** <br>

_Create a `urls.py` file in `/karuta_app`_ 

React app view must be on a catch-all urlpattern in order for CRA's (create-react-app) `pushState()` routing to work

```python 
from django.urls import path
from .views import reactKarutaApp


urlpatterns = [
  path('', reactKarutaApp, name='karuta-app'),
]
```

<br>

**14. backend/urls.py** <br>

```python 
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('backend.karuta_api.urls')),
    path('', include('backend.karuta_app.urls')),
]
```

<br>

#### Using custom template tags to inject a React app into Django templates 

**15. backend/backend/karuta_app/templates/index.html** <br> 

_At this point, there is only a karuta app with the default create-react-app output, so that will be rendered (lab-book-1)_

_Create a `karuta_app/templates` directory with an `index.html` file_  

(Django will look for templates inside individual apps' template directories because Django does that by default `TEMPLATES[0]['APP_DIRS'] = True` in `settings.py`)

```html
# index.html

{% load render_bundle from webpack_loader %}

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title> Karuta React App </title>
  </head>
  <body>
    <div id="root">
    </div>

      {% render_bundle 'main' %}

  </body>
</html>
```

`webpack` outputs this condensed `index.html` inside `/build` upon `npm run build`

```html 
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="/manifest.json">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>React App</title>
    <link href="/static/css/main.c17080f1.css" rel="stylesheet">
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="text/javascript" src="/static/js/main.a0b7d8d3.js"></script>
  </body>
</html>
```
Resources: <br>
* django-webpack-loader <br>
  https://github.com/owais/django-webpack-loader/#templates <br>

<br>

### Static files configuration for production environment

Django provides a `collectstatic` tool to collect static files (css, javascript, media) for deployment (`STATIC_ROOT` is a settings variable that defines where the files should be collected when collecstatic is run). When `collectstatic` is called, static files will be copied and put into `STATIC_ROOT`. Heroku automatically calls collectstatic after it uploads a web app.

> Django templates refer to the hosting location of the static files relative to a settings variable `STATIC_URL` so that this can be changed if the static files are moved to another host/server

`STATIC_URL` is the base URL location from which static files will be served 
`STATIC_ROOT` is the abs path to a directory where collectstatic will gather any static files referenced in templates 
`STATICFILES_DIRS` is a list of additional directories that collectstatic should look at 

<br>

When you run `yarn run build` (or `npm run build`), they will output their build artifacts into `<react-app-name>/build`

> Note: Serving static files via Django/web application is inefficient because the requests have to pass through unnecessary additional code (Django) rather than being handled directly by the web server or a completely separate CDN. While this doesn't matter for local use during development, it would have a significant performance impact if we were to use the same approach in production. (Note: and so the author made a django-webpack-loader and webpack-bundle-tracker) 

<br>

**16. backend/backend/settings.py** 

Declare `STATIC_ROOT` and `STATICFILES_DIRS` for [WhiteNoise]

```python
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

STATIC_URL = '/static/'

# WhiteNoise requires specifying the staticfiles dir
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Extra places for collectstatic to find static files.
# Webpack outputs a /build/static folder alongside with other files in /build, but I do not want those 
STATICFILES_DIRS = [
    os.path.join(REACT_APP_DIR,'build','static'),
]
```

<br>

**17. settings.py and whitenoise** <br> 

Django does not support serving static files in production, so Heroku recommends [WhiteNoise] for serving static assets directly from [Gunicorn] in production.  

> For performance and security reasons WhiteNoise does not check for new files after startup (unless using Django DEBUG mode). As such, all static files must be generated in advance. If you’re using Django Compressor, this can be performed using its offline compression feature.

_Note: Before deployment, disable Heroku's default run of `collectstatic` immediately after successful build_ 

```python 
# settings.py 

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
Resources:
* whitenoise docs <br>
  http://whitenoise.evans.io/en/stable/django.html

<br>

### Configuring a create-react-app (CRA) karuta_react app

_Make sure these two packages are installed_
```
npm i -S react-app-rewired 
npm i -S webpack-bundle-tracker
```

<br>

**18. backend/_** <br>
```
create-react-app karuta (should already be there if steps were reproduced using lab-book-1.md)
```

<br>

**19. backend/karuta/package.json** <br>

Change `react-scripts` to `react-app-rewired` to utilize the new package  

```javascript
{
  "name": "karuta",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.4.1",
    "react-dom": "^16.4.1",
    "react-scripts": "1.1.4",
    "react-app-rewired": "^1.5.2",
    "webpack-bundle-tracker": "^0.3.0"
  },
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
  },
  "engines": {
    "node": "^8.11.3", 
    "npm": "^3.10.10"
  }
}
```
Resources: <br>
* package.json and semver syntax <br>
  https://michaelsoolee.com/npm-package-tilde-caret/ <br>

<br>

**20. backend/karuta/config-overrides.js** <br>

[react-app-rewired] lets you modify the create-react-app's (CRA) webpack config without using `npm run eject`. It has a pretty specific syntax for custom configuration of the CRA's webpack config, so check out their docs.

> By doing this you're breaking the "guarantees" that CRA provides. That is to say you now "own" the configs. No support will be provided. Proceed with caution.

Create a `config-overrides.js` file for [react-app-rewired] and add [webpack-bundle-tracker] configuration to the webpack config plugins

The `BundleTracker` creates a `webpack-stats.json` file that is picked up by the [django-webpack-loader] to provide the react specific custom template tags in django.

```javascript
module.exports = {
  webpack: (config, env) => {
    const BundleTracker = require('webpack-bundle-tracker');
    
    // I do not want to mutate the original plugins, so instead of .push(), I am concatenating to the config['plugins']
    config.plugins = config.plugins.concat([ 
      new BundleTracker({ filename: './webpack-stats-prod.json'})
    ])

    return config;
  }
};
```
Resources:
* extended configuration options <br>
  https://github.com/timarney/react-app-rewired#extended-configuration-options <br>
* webpack-bundle-tracker configuration <br>
  https://github.com/owais/webpack-bundle-tracker#usage
   
<br>

**21. backend/backend/settings.py** <br>

Set up configuration for `django-webpack-loader`

```python 
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(REACT_APP_DIR, 'webpack-stats-prod.json'),
        'CACHE': False,
    }
}
```

<br>

**22. cli**

Run `npm run build` inside the `backend/karuta` (react app) directory

_A `/build` directory and a `webpack-stats-prod.json` will be generated inside react app's base directory, next to `/src`, so check them out to see if the build was successful_ 

Run `python manage.py collectstatic` from the `/backend` directory 

_staticfiles should now be populated with static assets_

Run `python manage.py runserver` and check the root url to see if the react app was rendered and served

<br>

#### Notes: 

Because `WhiteNoise` is used in both the dev and production environments, any changes made to the React app have to be ran through `npm run build` and collected with `python manage.py collectstatic` before `python manage.py runserver`. 

Either use the CRA's webpack dev server to use hot reloading or disable `WhiteNoise` in the dev mode to see instant changes.

<br>

#### Resources: 

<br>

#### Issues 
https://github.com/facebook/create-react-app/issues/2534
https://github.com/facebook/create-react-app/releases?after=create-react-app%401.5.2
https://github.com/facebook/jest/issues/3254
https://stackoverflow.com/questions/22475849/node-js-error-enospc/32600959#32600959
https://github.com/facebook/create-react-app/issues/2549

<br>
<br>
<br>

<!-- Links index -->
[Using Webpack transparently with Django + hot reloading React components as a bonus]: https://owais.lone.pw/blog/webpack-plus-reactjs-and-django/
[Why I love Create React App]: https://medium.com/@tuchk4/why-i-love-create-react-app-e63b1be689a3
[merits of CRA]: https://twitter.com/dan_abramov/status/802582517173944320?lang=en
[Deploying Python and Django Apps on Heroku]: https://devcenter.heroku.com/articles/deploying-python
[Configuring Django Apps for Heroku]: https://devcenter.heroku.com/articles/django-app-configuration
[Django and Static Assets]: https://devcenter.heroku.com/articles/django-assets
[django-webpack-loader]: https://github.com/owais/django-webpack-loader/
[webpack-bundle-tracker]: https://github.com/owais/webpack-bundle-tracker
[create-react-app]: https://github.com/facebook/create-react-app#create-react-app-
[Django]: https://docs.djangoproject.com/en/2.0/
[DRF]: http://www.django-rest-framework.org/#api-guide
[django-cors-headers]: https://github.com/ottoyiu/django-cors-headers
[WhiteNoise]: https://github.com/evansd/whitenoise/blob/9238341a348c57e20a0f4bab34fb93b86c7d59be/docs/index.rst
[Gunicorn]: https://devcenter.heroku.com/articles/python-gunicorn
[react-app-rewired]: https://github.com/timarney/react-app-rewired
[TemplateView]: https://docs.djangoproject.com/en/2.0/ref/class-based-views/base/#templateview
[npm run eject]: https://github.com/AgentBoo/django-hyakunin-isshu/blob/master/housekeeping/lab-book-4.md#modern-django-part-1-setting-up-django-and-react-created-05-10-2017-accessed-16-05-2018
[extend the CRA webpack configuration using hacks]: https://github.com/AgentBoo/django-hyakunin-isshu/blob/master/housekeeping/lab-book-4.md#extending-cra-webpack-config
[sundayguru]: https://github.com/sundayguru/django-react-heroku


