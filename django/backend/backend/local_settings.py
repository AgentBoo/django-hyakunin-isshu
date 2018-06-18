# Specific environment-dependent configuration options


# SECURITY WARNING: keep the secret key used in production secret!
# SECURITY WARNING: don't run with debug turned on in production!

import os

# DEVELOPMENT 
# DEBUG = True

# DJANGO_SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'xw9s+3ykue_)evq%4r=y=!h$7m^_(0%x0n7413xte=z56m)uiyhahaheeheehohorose2018')

# DATABASE_NAME = 'poems'
# DATABASE_ROLE = 'poems'
# DATABASE_PASSWORD = 'poems'
# DATABASE_PORT = '5432'


# LOCAL_HOSTS = []

# LOCAL_WHITELIST = (
#     'localhost:3000',
# )

# LOCAL_TRUSTED_ORIGINS = (
#     'localhost:3000',
# )


# Superuser 
# --email chibi.chan@seznam.cz 
# --username admin 
# --password hakuoro++++

# URL 
# https://fierce-hollows-19151.herokuapp.com/
# https://git.heroku.com/fierce-hollows-19151.git

# List of env variables: DJANGO_DEBUG, DJANGO_SECRET_KEY, APP_URL, REACT_APP_DJANGO_API_URL(for React)
# In react, only variables starting with REACT_APP_ are imported from .env files
# Because I am running npm run build locally, I need to make sure REACT_APP_DJANGO_API_URL is exported


# PRODUCTION
# For production, see https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/

if not DEBUG:
	import dj_database_url

	DJANGO_SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'cg#p$g+j9tax!#a3cup@1$8obt2_+&k3q+pmu)5%asj6yjpkagbboombboommomoland2018')

	DATABASES['default'] = dj_database_url.config(conn_max_age=600)

	LOCAL_HOSTS = [ os.environ['APP_URL'] ]

	LOCAL_WHITELIST = os.getenv('APP_URL', 'localhost:3000')

	LOCAL_TRUSTED_ORIGINS = os.getenv('APP_URL', 'localhost:3000')
