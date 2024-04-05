import os

config = {
    'user': os.environ.get('DB_USERNAME', 'root'),
    'password': os.environ.get('DB_PASSWORD', '020521'),
    'host': os.environ.get('DB_HOST', 'localhost'),
    'database': os.environ.get('DB_DATABASE_NAME', 'timeless_song_spotify'),
    'port': os.environ.get('DB_PORT', '3307')
}
