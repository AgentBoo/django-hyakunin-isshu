# Specific environment-dependent configuration options

# For production, see https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

# SECURITY WARNING: keep the secret key used in production secret!
# SECURITY WARNING: don't run with debug turned on in production!


import os


# DEVELOPMENT 

DJANGO_SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'xw9s+3ykue_)evq%4r=y=!h$7m^_(0%x0n7413xte=z56m)uiyhahaheeheehohorose2018')

LOCAL_DATABASE = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'poems',
        'USER': 'poems',
        'PASSWORD': 'poems',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

LOCAL_HOSTS = ['*']

LOCAL_WHITELIST = (
    'localhost:3000',
    'localhost:8000'
)

LOCAL_TRUSTED_ORIGINS = (
    'localhost:3000',
    'localhost:8000'
)

