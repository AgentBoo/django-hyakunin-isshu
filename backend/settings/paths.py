import os

# Build paths inside the project like this: 
# os.path.join(BASE_DIR, ...)

# backend package
PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

BASE_DIR = os.path.dirname(PROJECT_DIR)

TEMPLATE_DIR = os.path.join(BASE_DIR, 'templates')

REACT_APP_DIR = os.path.join(BASE_DIR, 'karuta')
