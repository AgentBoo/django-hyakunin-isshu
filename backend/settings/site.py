# Application settings
# https://docs.djangoproject.com/en/2.1/ref/settings/

from decouple import config, Csv
from .env import DEV_ENV, TEST_ENV, PROD_ENV

SITE_ID = 1
ROOT_URLCONF = 'backend.urls'

# CSRF integration 
# https://github.com/ottoyiu/django-cors-headers#csrf-integration

if DEV_ENV:
	ALLOWED_HOSTS = ['*'] 
	CSRF_TRUSTED_ORIGINS = ALLOWED_HOSTS
	CORS_ORIGIN_ALLOW_ALL = True
	DEBUG_PROPAGATE_EXCEPTIONS = True

elif TEST_ENV:
	ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())  
	CSRF_TRUSTED_ORIGINS = ALLOWED_HOSTS
	CORS_ORIGIN_WHITELIST = ALLOWED_HOSTS

elif PROD_ENV:
	ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())  
	CSRF_TRUSTED_ORIGINS = ALLOWED_HOSTS
	CSRF_COOKIE_SECURE = True
	CORS_ORIGIN_WHITELIST = ALLOWED_HOSTS

	SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
	SECURE_CONTENT_TYPE_NOSNIFF = True
	SECURE_BROWSER_XSS_FILTER = True
	SECURE_SSL_REDIRECT = False
	X_FRAME_OPTIONS = 'DENY'
