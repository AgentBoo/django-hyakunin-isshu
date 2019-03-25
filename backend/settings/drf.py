from .env import DEV_ENV

# Django Rest Framework
# https://www.django-rest-framework.org/api-guide/settings/

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ]
}

if DEV_ENV:
	REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] += [
		'rest_framework.renderers.BrowsableAPIRenderer'
	]
