from django.contrib import admin
from .models import Source, Media, Poem, Translation

# Register your models here.

# See https://docs.djangoproject.com/en/2.1/intro/tutorial02/#creating-an-admin-user

admin.site.register(Source)
admin.site.register(Media)
admin.site.register(Poem)
admin.site.register(Translation)