from decouple import config, Csv
from .env import DEV_ENV, TEST_ENV, PROD_ENV

# Application settings
# https://docs.djangoproject.com/en/2.1/ref/settings/

# CSRF integration 
# https://github.com/ottoyiu/django-cors-headers#csrf-integration

SITE_ID = 1

ROOT_URLCONF = 'backend.urls'

if DEV_ENV:
	DEBUG_PROPAGATE_EXCEPTIONS = True

	ALLOWED_HOSTS = ['*']

	CORS_ORIGIN_ALLOW_ALL = True 

	CSRF_TRUSTED_ORIGINS = ALLOWED_HOSTS
   
elif TEST_ENV:
	ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv()) 

	CORS_ORIGIN_WHITELIST = ALLOWED_HOSTS
	
	CSRF_TRUSTED_ORIGINS = ALLOWED_HOSTS

elif PROD_ENV:
	# List of hosts/domain names served by a Django project.
	ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())

	CORS_ORIGIN_WHITELIST = ALLOWED_HOSTS

	# List of hosts/domain names, which are trusted origins for unsafe requests.
	CSRF_TRUSTED_ORIGINS = ALLOWED_HOSTS

	# If False, browsers may not ensure that a CSRF cookie 
	# is only sent with an HTTPS connection.
	CSRF_COOKIE_SECURE = True

	# If False, CSRF token is stored in a cookie instead of a session.  
	CSRF_USE_SESSIONS = True
	
	# If False, browsers may not ensure that a session cookie 
	# is only sent with an HTTPS connection.
	SESSION_COOKIE_SECURE = True

	# If False, the SecurityMiddleware will not set the 
	# X-XSS-Protection: 1; mode=block header on all 
	# responses that do not already have it.
	SECURE_BROWSER_XSS_FILTER = True

	# If False, the SecurityMiddleware will not set the 
	# X-Content-Type-Options: nosniff header on all 
	# responses that do not already have it.
	SECURE_CONTENT_TYPE_NOSNIFF = True

	# This tells Django to trust the X-Forwarded-Proto header 
	# that comes from our proxy; any time its value is 'https',
	# the request is guaranteed to be secure (i.e., it originally came in via HTTPS).
	# You should only set this setting if you control your proxy 
	# or have some other guarantee that it sets/strips this header appropriately.
	SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

	# If False, Django will not redirect all non-HTTPS requests to HTTPS
	SECURE_SSL_REDIRECT = True

	X_FRAME_OPTIONS = 'DENY'
