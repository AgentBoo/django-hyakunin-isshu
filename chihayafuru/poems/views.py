from django.shortcuts import render
from .models import Poem, Jap, Rom, Eng

# Create your views here.
def index(request):
    
    context = {
        'poems': poems_list,
    }

    return render(request, 'poems/index.html', context)
