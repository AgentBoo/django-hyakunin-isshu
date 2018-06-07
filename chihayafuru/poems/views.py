from django.shortcuts import render

# Create your views here.
def index(request):
	context = { 'poems': 'Hello world' }
	return render(request, 'poems/index.html', context)