# Timeless Songs on Spotify

This project aims to analyze and present the timeless songs that established in 80s, 90s and still hit until now on Spotify.

## Setup

1. **Connect to Database**: 
   - Navigate to the `backend` directory.
   - Run the following command to start the MySQL database:
     ```
     docker compose -p timeless-song-mysql up -d
     ```

## API Endpoint

### 1. Get Stream Counts Of Hit Songs 2017 - 2023

- **Method**: GET
- **Endpoint**: `/api/v1/song1723/streamcount/genre`
- **Description**: Retrieves the streaming counts of the top 20 hit songs from the years 2017 to 2023.
- **Usage**: Replace `{genre}` with the desired genre parameter (3 common genres: All, pop, hip hop). For example:
  - `/api/v1/song1723/All` will retrieve songs with all genres.
  - `/api/v1/song1723/pop` will retrieve songs with pop genre.
