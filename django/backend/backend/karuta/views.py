# from django.shortcuts import render
from backend.karuta.models import Poem
from backend.karuta.serializers import PoemSerializer 
from rest_framework import viewsets 

# Create your views here.
class PoemViewSet(viewsets.ModelViewSet):
	'''
	API endpoint that allows poems to be viewed or edited
	''' 
	queryset = Poem.objects.all().order_by('numeral')
	serializer_class = PoemSerializer