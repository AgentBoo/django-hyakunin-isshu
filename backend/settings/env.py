import os 

ENV      = os.getenv('DJANGO_ENVIRONMENT', 'production')
DEV_ENV  = ENV == 'development'
TEST_ENV = ENV == 'staging'
PROD_ENV = ENV == 'production'
print(f'DJANGO_ENV: {ENV}')