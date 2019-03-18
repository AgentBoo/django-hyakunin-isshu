import os
from .paths import BASE_DIR, REACT_APP_DIR


# Media files

# Absolute path to the location of user-uploaded files.

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# URL prefix for media files served from MEDIA_ROOT.
# Example: "http://localhost:8000/media/"

MEDIA_URL = '/media/'


# Static files (CSS, JavaScript, images).
# https://docs.djangoproject.com/en/2.0/howto/static-files/

# Absolute path to the location of static files 
# collected by `collectstatic`. Don't put anything 
# in this directory yourself. Store your static 
# files in individual apps' `static/` subdirectories 
# or in STATICFILES_DIRS. 
# WhiteNoise requires that static files are collected 
# to 'staticfiles'. 

STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# URL prefix for static files served from STATIC_ROOT.
# Example: "http://localhost:8000/static/"

STATIC_URL = '/static/'

# Extra locations (absolute paths) of static files 
# for `collectstatic`.
# Example: "/home/html/static" or "C:/www/django/static"

STATICFILES_DIRS = [
    os.path.join(REACT_APP_DIR, 'build', 'static'),
]


# Webpack loader 

# django-webpack-loader 

WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': os.path.join(REACT_APP_DIR, 'webpack-stats-production.json'),
        'CACHE': False,
    }
}
