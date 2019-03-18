from .env import DEV_ENV

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'webpack_loader',
    'backend.api',
    'backend.app',
)

if DEV_ENV:
	INSTALLED_APPS += (
		'django_extensions',
	)