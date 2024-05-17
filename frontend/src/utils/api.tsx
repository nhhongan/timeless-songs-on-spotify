import axios from 'axios';

const PREFIX = process.env.REACT_APP_API_PREFIX;

export const enum Genre {
    ALL = 'all',
    ROCK = 'rock',
    POP = 'pop',
    HIPHOP = 'reggae',
    LATIN = 'latin',
}

export const fetchSongs = async (genre: Genre) => {
  const response = await axios.get(`${PREFIX}/song1723/streamcount?genre=${genre}`);
  return response.data;
};