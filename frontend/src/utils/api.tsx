import axios from 'axios';

const PREFIX = process.env.REACT_APP_API_PREFIX;

export const enum Genre {
    ALL = 'All',
    ROCK = 'rock',
}

export const fetchSongs = async (genre: Genre) => {
  const response = await axios.get(`${PREFIX}/song1723/streamcount/?Genre=${genre}`);
  return response.data;
};