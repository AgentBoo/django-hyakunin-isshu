from .paths import TEMPLATE_DIR

# List of callables that know how to import 
# templates from various sources.
TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
)

# List of settings options for individual template 
# engines to be used with Django. Default configuration 
# loads templates from a template subdirectory inside 
# each installed application.
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [ TEMPLATE_DIR ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Extra locations (absolute paths) of templates.
# Example: "/home/html/django_templates" or "C:/www/django/templates"
TEMPLATE_DIRS = ()