# Problem statement and design of solution

There are quite a bit of tutorials online, which walk a reader through setting up Django and React. However, many of them are incomplete, or are only good for 'proof-of-concept' projects, or are not configured for potential production builds. Moreover, the more comprehensive tutorials use older and distinctly different versions of Django or React, or use technologies I would rather avoid. 

As such, my current project's configuration is based on parts from multiple resources, in the following order:

### Django <script> tags in templates
#### Using Webpack transparently with Django + hot reloading React components as a bonus (created 23-05-2015, accessed 16-05-2018)

Resources: <br>
https://owais.lone.pw/blog/webpack-plus-reactjs-and-django/ <br>
https://github.com/owais/webpack-bundle-tracker <br>
https://github.com/owais/django-webpack-loader/ <br>

_NOTE: I do not think the author of the article mentioned his Django and React versions, but they seem like older versions based on the code snippets that he uses_

This [article](https://owais.lone.pw/blog/webpack-plus-reactjs-and-django/) is an accompaniment to the [django-webpack-loader] package and has been often referred to by other tutorials (e.g. [here](https://www.youtube.com/watch?v=kxzg_QXrV_k). The article is primarily relying on [webpack-bundle-tracker], to extract information from webpack, and [django-webpack-loader], which uses this extracted information for react-django integration in the django templates. Both packages were created by the author of this article.

In the 'Create webpack config' section of the article, the author is creating his own webpack config files, which is not really something I want to do, because I generated my React app using [create-react-app], abbreviated CRA. CRA ships with a CRA supported webpack.config.js files and webpackDevServer.js configuration (check out /node_modules/react-scripts/config in your CRA app) and compiles webpack bundles for you.

Googling around, I more or less found two ways of dealing with the webpack files that are shipped with CRA:  
1. [npm run eject] 
2. [extend the CRA webpack configuration using hacks]

_The webpack configuration is described further below._ 

The section 'Usage' talks about adding template tags for static files in a django template. [django-webpack-loader] provides you with a custom template tag set for blocks `render_bundle`. `render bundle` renders the required `<script>` and `<link>` tags for the bundled react app. It also raises exceptions when webpack fails to build a bundle in the target directory and can show  you some useful information to help debug problems.

Section 'Production environments' talks about having a different webpack configuration for production and generating bundles locally, syncing them to their static file server, and commiting his `webpack-stats.json` to source, so that all files committed to the code base are already compiled. The author treats the bundles as source code because he prefers not to build bundles on production or have production systems depend on dev dependencies. 

> That said, you are completely free to handle them the opposite way. You can tell git to ignore the generated bundles and stats file so they are not pushed to production and then run webpack on production just before running `collectstatic`. You’ll need all your npm dependencies on production as well obviously.

Local dev stats files and bundles should be added to .gitignore.

<br> 

I am going to be using the following parts from this tutorial:
```python 
# example settings.py 

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

STATICFILES_DIRS = (
    # We do this so that django's collectstatic copies or our bundles to the STATIC_ROOT 
    # or syncs them to whatever storage we use.
    os.path.join(BASE_DIR, 'assets'), 
)

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}

INSTALLED_APPS = (
 ...
 'webpack_loader',
)
```

`render_bundle` will render the required `<script>` and `<link>` tags in the template

```html
{% load render_bundle from webpack_loader %}

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Example</title>
  </head>

  <body>
    <div id="react-app"></div>

    {% render_bundle 'main' %}

  </body>
</html>
```

<br>

### Webpack config
#### Using Webpack transparently with Django + hot reloading React components as a bonus (created 23-05-2015, accessed 16-05-2018)

Resources: <br>
https://owais.lone.pw/blog/webpack-plus-reactjs-and-django/ <br>
https://github.com/owais/webpack-bundle-tracker <br>
https://github.com/owais/django-webpack-loader/ <br>

This is a continuation of the previous article. 

Going through the webpack config files in the article, the only thing I actually need is (I think :D) 
```javascript
plugins: [
    new BundleTracker({filename: './webpack-stats.json'})
  ]
```

> Before production, generate a new bundle using production config and commit the new stats file and bundle remotely. Store the stats file and bundles in a directory that is added to the `STATICFILES_DIR`

Dev environment 
```
# dev setup (everything else is installed via CRA if you check node_modules)
npm i --save-dev webpack-bundle-tracker 
```
```
# makes root/assets/js
mkdir -p assets/js
touch webpack.config.js

# compile bundles automatically in watch mode
./node_modules/.bin/webpack --config webpack.config.js --watch

# generate production bundles locally in ./assets/bundles and stats file in ./webpack-stats-prod.json and commit them remotely
./node_modules/.bin/webpack --config webpack.prod.config.js

# collectstatic will automatically pick up the newly created bundles
python manage.py collectstatic 
python manage.py runserver

pip install django-webpack-loader
```
```javascript
# ./webpack.config.js && webpack.production.config.js 
var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,
  entry: './assets/js/index',
  output: {
      path: path.resolve('./assets/webpack_bundles/'),
      filename: "[name]-[hash].js"
  },

  plugins: [
    new BundleTracker({filename: './webpack-stats.json'})
  ]
}

# for production
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

var config = require('./webpack.base.config.js')

config.output.path = require('path').resolve('./assets/dist')

config.plugins = config.plugins.concat([
  new BundleTracker({filename: './webpack-stats-prod.json'}),

  // removes a lot of debugging code in React
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
  }}),

  // keeps hashes consistent between compilations
  new webpack.optimize.OccurenceOrderPlugin(),

  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
])

// Add a loader for JSX files
config.module.loaders.push(
  { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' }
)

module.exports = config
```
```python
# settings.py
import sys
import os

# important for django-webpack-loader
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# have assets dir created
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'assets'), # We do this so that django's collectstatic copies or our bundles to the STATIC_ROOT or syncs them to whatever storage we use.
)

# defaults to 'cache': not DEBUG, which means web workers will have to be restarted in order to pick up any changes made to the stats files
WEBPACK_LOADER = {
    'DEFAULT': {
    	# where webpack outputs the bundles (do not use full path)
    	# if ./assets is one of staticfiles dirs, and webpack generates bundles in ./assets/output/bundles, use '/output/bundles'
        'BUNDLE_DIR_NAME': 'bundles/',
        # if you initialize webpack-bundle-tracker plugin with a filename './webpack.config.js', then the value of STATS_FILE should be /home/src/webpack-stats.json 
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.json'),
    }
}

if not DEBUG:
    WEBPACK_LOADER['DEFAULT'].update({
        'BUNDLE_DIR_NAME': 'dist/',
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-prod.json'
    })


INSTALLED_APPS = (
 ...
 'webpack_loader',
) 
```

<br>

#### Modern Django: Part 1: Setting up Django and React (created 05-10-2017, accessed 16-05-2018)

Resources: <br>
http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/ <br>
https://docs.djangoproject.com/en/2.0/ref/class-based-views/base/#templateview <br>

_NOTE: Non specific Django version. React is created using create-react-app_

This [tutorial](http://v1k45.com/blog/modern-django-part-1-setting-up-django-and-react/) uses [Django] + [DRF], [create-react-app], and [django-webpack-loader], but runs `npm run eject` to modify webpack configuration to enable the use of [webpack-bundle-tracker] whose output is used by [django-webpack-loader]. Given the [merits of CRA], I did not really want to use `npm run eject` even though I do not see a problem with it otherwise.  

This tutorial basically uses the [previous article] for most of it. The major difference is in how the author builds upon the ejected webpack config files and routing and redux in React (eventually, I do not think the author ever wrote those parts of the tutorial).  

For the ejected webpack config files, the author is just trying to accomodate for the parts from the [Using Webpack transparently with Django + hot reloading React components as a bonus] article, so it is basically a duplicate inside preconfigured webpack config files. 

It still seems that the only part that I need is:
```javascript
plugins: [
    new BundleTracker({filename: './webpack-stats.json'})
  ]
```

```javascript
# /config/paths.js 
# in dev 
module.exports = {
  // ... other values
  statsRoot: resolveApp('../'),
}

# in production 
module.exports = {
  // .. KEEP OTHER VALUES
  appBuild: resolveApp('../assets/bundles/'),
};


# config/webpackDevServer.config.js
// allow the server to accept requests from external origins 
// put headers in the object returned by the exported function (this object will be placed at the same level as https and host properties)
headers: {
  'Access-Control-Allow-Origin': '*'
},


# /config/webpack.config.dev.js 
const publicPath = 'http://localhost:3000/';
const publicUrl = 'http://localhost:3000/';
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: [
    // ... KEEP OTHER VALUES
    // this will be found near line 30 of the file
    require.resolve('webpack-dev-server/client') + '?http://localhost:3000',
    require.resolve('webpack/hot/dev-server'),
    // require.resolve('react-dev-utils/webpackHotDevClient'),
  ],
  plugins: [
    // this will be found near line 215-220 of the file.
    // ... other plugins
    new BundleTracker({path: paths.statsRoot, filename: 'webpack-stats.dev.json'}),
  ],
}

# config/webpack.config.prod.js 
const BundleTracker = require('webpack-bundle-tracker');
const publicPath = "/static/bundles/";
const cssFilename = 'css/[name].[contenthash:8].css';

module.exports = {
  // KEEP OTHER VALUES
  output: {
    // NEAR LINE 67

    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  },
  module: {
    // .. KEEP OTHER VALUES, ONLY UPDATE THE FOLLOWING VALUES
    rules: [
      {
        oneOf: [
          // LINE 140
          {
            options: {
              limit: 10000,
              name: 'media/[name].[hash:8].[ext]',
            },
          },
          {
            // LINE 220
            options: {
              name: 'media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // KEEP OTHER VALUES
    // LINE 320
    new BundleTracker({path: paths.statsRoot, filename: 'webpack-stats.prod.json'}),
  ],
}

```
In the above code, the author commented out the use of `webpackHotDevClient`, and changed `publicPath` and `publicUrl` because the webpack dev server's bundle will be served in a django template, and because webpack hot loader would otherwise send requests to the wrong url/host.

For production, webpack sets `static/bundles/` as `publicPath` because the build files will be stored in `assets/bundles` and `/static/` url points to the assets directory. `static` prefixes from filenames and path are removed to prevent unneccessary nesting of build files, so webpack can build all files directly into `assets/bundles` without creating an additional `static` directory inside it.

In the section 'Integrating React and Django', the author uses [TemplateView] to serve the `index.html` file of his ReactApp and adds it directly in a URLconf file. Looks nifty.

```python
# settings.py 
TEMPLATE_DIR = os.path.join(BASE_DIR,'templates')

TEMPLATES = [
	{	
		# ...
		'DIRS': [TEMPLATE_DIR],
		# ...
	},
]
```
```python
# urls.py
from django.views.generic import TemplateView 

urlpatterns = [
	# ... 
	path('', TemplateView.as_view(template_name='index.html')),
	#...
]

```

<br>

#### Extending CRA webpack config

Resources: <br>
https://medium.com/@tuchk4/why-i-love-create-react-app-e63b1be689a3 <br>
https://github.com/timarney/react-app-rewired <br>
https://github.com/timarney/react-app-rewired#extended-configuration-options <br>

**Why I love Create React App article (created 23-01-2017, accessed 16-05-2018)** <br>
First hacky approach from [Why I love Create React App] is to create your own webpack config and use the ES6 spread operator to pass in the original CRA webpack config and just append things to it + run bundling from there:

```javascript
# src/scripts/webpack.js
const webpack = require('react-scripts/node_modules/webpack');
const craWebpackConfig = require('react-scripts/config/webpack.config.prod');
const OfflinePlugin = require('offline-plugin');

const config = {
  ...craWebpackConfig,
  plugins: [
     ...craWebpackConfig.plugins,
     new OfflinePlugin()
  ],
  entry: [
    craWebpackConfig.entry[0], // pollyfils
    path.resolve('src', 'awesome-component.js')
  ],
  output: {
    ...craWebpackConfig.output,
    path: path.resolve('pf-build')
  }
};

webpack(config).run(function(err, stats) {
  if (err !== null) {
    console.log('done');
  } else {
    console.log(err);
  }
});


# package.json
"scripts": {
  "build:custom": "node scripts/webpack"
}
```

**react-app-rewired** <br>
[react-app-rewired] tweaks the create-react-app webpack configs without using `npm run eject` and without creating a fork of CRA's react-scripts. I have not checked how it works under the hood, but there is a pretty good amount of contributors and maintainers that take care of their repo and they seem up-to-date on create-react-app changes. 

They require the creation of a `config-overrides.js` in the base directory of the react app
```javascript 
# config-overrides.js

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function(config, env) {
    // ...add your webpack config customisation, rewires, etc...
    // Example: add less support to your app.
    const rewireLess = require('react-app-rewire-less');
    config = rewireLess(config, env);

    return config;
  },
}

``` 

> Webpack configuration - Development & Production: The webpack field is used to provide the equivalent to the single-function exported from config-overrides.js. This is where all the usual rewires are used. It is not able to configure compilation in test mode because test mode does not get run through Webpack at all (it runs in Jest). It is also not able to be used to customise the Webpack Dev Server that is used to serve pages in development mode because create-react-app generates a separate Webpack configuration for use with the dev server using different functions and defaults (agentboo note: this is what their jest: function(config){} and devServer: function(configFunction){} in module.exports are for)

_Maintainers' note_
> By doing this you're breaking the "guarantees" that CRA provides. That is to say you now "own" the configs. No support will be provided. Proceed with caution.

<br>

### WhiteNoise handling static files
#### Django-React boilerplate and user authentication implemented by sundayguru 
Resources: <br>
https://github.com/sundayguru/django-react-heroku <br>

_NOTE: Repo was last updated in 2017_

I found this on accident. 
This dev is using the approach refuted by owais in [Using Webpack transparently with Django + hot reloading React components as a bonus] mentioned earlier, where the static files used by a React App are housed in both the React App dir and the Django staticfiles directory. That might actually be quite alright, though.
His [repo](https://github.com/sundayguru/django-react-heroku) has a django-react app configured for heroku deployment without the use of `npm run eject` or [webpack-bundle-tracker] + [django-webpack-loader]. He just uses [WhiteNoise] to take care of staticfiles and his own script tags in templates <br>
His production [settings.py](https://github.com/sundayguru/django-react-heroku/blob/master/backend/settings/production.py) simply points at the /build directory created by `npm run build` from CRA. 

<br>

### My approach 
I knew beforehand that I wanted to deploy to Heroku, so I started with the requirements for the deployment of Django apps on Heroku <br>

[Deploying Python and Django Apps on Heroku] <br>
[Configuring Django Apps for Heroku] <br>
[Django and Static Assets]<br>

1. Heroku recommends using [WhiteNoise] for deployment 
   [Configuring WhiteNoise for Django](http://whitenoise.evans.io/en/stable/django.html) entails the creation of a `staticfiles` directory and setting the `STATIC_ROOT` to `staticfiles`. WhiteNoise and `collectstatic` will look for any additional static files sources in the `STATICFILES_DIRS` list and will copy them into `STATIC_ROOT` (or will sync them with whatever WhiteNoise storage is declared). 
  
   ```python 
   # settings.py 
   WEBPACK_LOADER = {
    'DEFAULT': {
        # BUNDLE_DIR_NAME refers to the dir in which webpack outputs the bundles 
        # it should not be the full path, because the BUNDLE_DIR_NAME will be appended 
        # to the path in STATICFILES_DIRS
        'BUNDLE_DIR_NAME': '',
        # there will only be one webpack-stats.json file because I will only generate it upon 
        # npm run build (which runs in NODE_ENV=production)
        'STATS_FILE': os.path.join(REACT_APP_DIR, 'webpack-stats-production.json'),
     }
   }
   ```

   Both of the previously mentioned tutorials use the `/assets/` directory and have a webpack-loader output the build files inside `/assets/bundles`. 

   I do not think that creating my own `/assets/` directory is necessary because I will not be serving any other static files than bundled React.js scripts (and whichever React's own static files are bundled with it) using webpack. This is why it should be fine to follow the configuration of WhiteNoise-Django and create `staticfiles` for `STATIC_ROOT`.

   Running the CRA's `npm run build` outputs the build files in a `/build/` directory inside react app's base directory, so I will be pointing to `/build/static` in the `STATICFILES_DIRS`


   ```python
   # settings.py
    REACT_APP_DIR = os.path.join(BASE_DIR,'karuta_react')
    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATICFILES_DIRS = [
      # collectstatic will ransack these directories and copy those files inside staticfiles  
      # without defining the path this way, 
      # this is not entirely correct in combination with django-webpack-loader docs, that seems to use the 
      # STATICFILES_DIRS for WEBPACK_LOADER settings variable that is asking for a BUNDLE_DIR_NAME relative path static/ 
      os.path.join(REACT_APP_DIR, 'build','static'),
    ]
   ```

2. [django-webpack-loader] and [webpack-bundle-tracker]
   To inject the bundled react app inside a django template in the form of `<script>` and `<link>` tags, I added configuration for [django-webpack-loader] and [webpack-bundle-tracker] as described in their own docs. 
   
   ```python 
   
   ```

   In the django template, put the `{% render_bundle 'main' %}` at the bottom of the `<body>` because `render_bundle` generates/renders `<script>` tags. A `<div id=root></div>` is also added for React to hook into. 

   [Bootstrap 4's html boilerplate]()

   ```html
   # django template based on bootstrap 4 html template 

   {% load render_bundle from webpack_loader %}
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <title> Karuta React App </title>
      </head>
      <body>
        <div id="root"></div>

          {% render_bundle 'main' %}
      
      </body>
    </html>

   ```  

3. [react-app-rewired]
   It seems that the only thing that needs changed about the webpack config is the addition of the `BundleTracker` to obtain a `stats` file. 

   ```javascript
   module.exports = {
      webpack: (config, env) => {
        const BundleTracker = require('webpack-bundle-tracker');
        
        // I only want one webpack-stats.json file because I do not care about overrides and 
        // I will only use npm run build which uses NODE_ENV=production 
        config.plugins = config.plugins.concat([ 
          new BundleTracker({ filename: './webpack-stats-production.json'})
        ])

        return config;
      }
    };
   ```

4. `npm run build` and `NODE_ENV=production npm start`
   
   `npm run build` is preconfigured to run with NODE_ENV set to `NODE_ENV=production` 

   There are some tutorials out there that add `npm run build` as a `postinstall` script in the react app's `package.json`, but previously mentioned tutorials `npm run build` locally with their webpack production config, so I will be doing that. 

   `npm run build` should generate the `/build` directory and `webpack-stats.json` in the react app's base directory.

```
   # cli output

   The project was built assuming it is hosted at the server root.
   You can control this with the homepage field in your package.json.
   For example, add this to build it for GitHub Pages:

  "homepage" : "http://myname.github.io/myapp",

   The build folder is ready to be deployed.
   You may serve it with a static server:

  yarn global add serve
  serve -s build
 
```

<br>

5. Check `backend/staticfiles` and `karuta_react/build/` dirs  
   Move `asset-manifest.json` and `manifest.json` inside the `staticfiles` manually, if you really need them. This is a clumsy solution, but if `STATICFILES_DIRS` point to `os.path.join(REACT_APP_DIR, 'build')`, then `collectstatic` takes everything inside the `/build/` as is, but django-webpack-loader gets confused that it needs to look for a `static/` folder inside of it because it thinks the files are directly in staticfiles because STATIC_URL is '/static/', and shows `No Content` headers for those assets. 

   If `STATICFILES_DIRS` point to `os.path.join(REACT_APP_DIR, 'build','static')`, `collecstatic` only takes everything inside `/build/static` (js, css, media) and outputs `/js`, `/css`, `/media` directly into `staticfiles`, which can be picked up on by django-webpack-loader, but that means that if django-specific js,css,media directories and files need to exist, they will have to be put in a special directory inside `staticfiles` and referred to in django-templates.  

<br>

6. Django split settings 
   I wanted a way to have 2 different settings.py, one for dev and one for production, and used this [approach](https://www.agileleaf.com/blog/a-better-way-to-manage-settings-py-in-your-django-projects/) and now have a settings.py and importable local_settings.py file. 

<br>

7. workflow 
  1. `create-react-app` 
  2. config-overrides.js 
  3. `npm run build`
  4. check `/build` inside react app  
  5. `python manage.py collectstatic` 
  6. check `/staticfiles`
  7. `python manage.py runserser`
  8. empty the `/staticfiles` before deployment  


_NOTE: Heroku runs `collectstatic` upon deployment for you, so there is no need to populate `STATIC_ROOT` before that_
 
<br>

### Misc
####Environment configs

CRA supports .env out of the box via dotenv for the react app  

Resources: <br>
https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables <br>

<br>

#### Absolute imports

Resources:<br>
https://github.com/facebook/create-react-app/issues/1065 <br>

<br>

#### Django static files with django-heroku 

`django-heroku` configures static files using WhiteNoise, provides logging configuration and test runner (important for heroku cli)
It automatically configures django app to work on heroku (from docs: 'automatically configures staticfiles to 'just work'')

Note: `django-heroku` creates a very specific static files settings and outputs, which are not exactly what you need with a React App's files

```
# installs whitenoise for you

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
  https://github.com/heroku/django-heroku/blob/master/test/test_django_heroku.py <br>
  https://github.com/heroku/django-heroku <br>
  https://devcenter.heroku.com/articles/deploying-python <br>
  https://devcenter.heroku.com/articles/django-memcache
