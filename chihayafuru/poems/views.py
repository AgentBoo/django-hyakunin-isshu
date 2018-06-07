from django.shortcuts import render
from .models import Poem 

# Create your views here.
def index(request):
	poems_list = Poem.objects.order_by('numeral')
	context = { 'poems': poems_list }
	return render(request, 'poems/index.html', context)