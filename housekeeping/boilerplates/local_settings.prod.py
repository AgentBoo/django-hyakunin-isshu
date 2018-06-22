# Specific environment-dependent configuration options

# For production, see https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

# SECURITY WARNING: keep the secret key used in production secret!
# SECURITY WARNING: don't run with debug turned on in production!

import os
import dj_database_url

# PRODUCTION
# if not DEBUG:

DJANGO_SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

LOCAL_DATABASE = {
    'default': dj_database_url.config(conn_max_age=600)
}

LOCAL_HOSTS = ('*',)

LOCAL_WHITELIST = (
    'https://fierce-hollows-19151.herokuapp.com/',
)

LOCAL_TRUSTED_ORIGINS = (
    'https://fierce-hollows-19151.herokuapp.com/',
)


