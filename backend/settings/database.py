# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

from .env import PROD_ENV

if PROD_ENV:
	import dj_database_url
    
    # dj_database_url will look for a DATABASE_URL environ variable
	DATABASES = {
	    'default': dj_database_url.config(conn_max_age=600)  
	}

else:
    from .secrets import DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': DATABASE_NAME,
            'USER': DATABASE_USER,
            'PASSWORD': DATABASE_PASSWORD,
            'HOST': DATABASE_HOST,
            'PORT': DATABASE_PORT,
        }
    } 
