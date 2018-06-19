# Specific environment-dependent configuration options


# SECURITY WARNING: keep the secret key used in production secret!
# SECURITY WARNING: don't run with debug turned on in production!

import os

'''
# DEVELOPMENT 
DEBUG = True

DJANGO_SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'xw9s+3ykue_)evq%4r=y=!h$7m^_(0%x0n7413xte=z56m)uiyhahaheeheehohorose2018')

DATABASE_NAME = 'poems'
DATABASE_ROLE = 'poems'
DATABASE_PASSWORD = 'poems'
DATABASE_PORT = '5432'

LOCAL_DATABASE = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': DATABASE_NAME,
        'USER': DATABASE_ROLE,
        'PASSWORD': DATABASE_PASSWORD,
        'HOST': 'localhost',
        'PORT': DATABASE_PORT,
    }
}

LOCAL_HOSTS = []

LOCAL_WHITELIST = (
    'localhost:3000',
    'localhost:8000'
)

LOCAL_TRUSTED_ORIGINS = (
    'localhost:3000',
    'localhost:8000'
)
'''


# PRODUCTION
# For production, see https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

# if not DEBUG:
import dj_database_url 


DJANGO_SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

LOCAL_DATABASE = {
    'default': dj_database_url.config(conn_max_age=600)
}

LOCAL_HOSTS = [ os.getenv('ROOT_URL', '*'), ]

LOCAL_WHITELIST = [ os.getenv('ROOT_URL', 'localhost:3000'), ]

LOCAL_TRUSTED_ORIGINS = [ os.getenv('ROOT_URL', 'localhost:3000'), ]


