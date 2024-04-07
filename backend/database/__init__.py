import os
from decouple import config

CONFIGS = {
    'user': config('DB_USERNAME'),
    'password': config('DB_PASSWORD'),
    'host': config('DB_HOST'),
    'database': config('DB_DATABASE_NAME'),
    'port': config('DB_PORT')
}

print(CONFIGS)