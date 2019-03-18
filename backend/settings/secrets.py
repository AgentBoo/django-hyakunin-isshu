import os
from .env import DEV_ENV, TEST_ENV

# SECURITY WARNING: keep the secret key used in production secret!

SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

DATABASE_NAME = 'poems'

if DEV_ENV:
	DATABASE_USER = 'poems'
	DATABASE_PASSWORD = 'poems'
	DATABASE_HOST = 'localhost'
	DATABASE_PORT = '5432'
    
elif TEST_ENV:
	DATABASE_USER = 'testuser'
	DATABASE_PASSWORD = 'testpass'
	DATABASE_HOST = 'localhost'
	DATABASE_PORT = '5432'

API_ROOT='https://fierce-hollows-19151.herokuapp.com'