import axios from "axios";

const PREFIX = process.env.REACT_APP_API_PREFIX;

export const enum Genre {
  ALL = "all",
  ROCK = "rock",
  POP = "pop",
  HIPHOP = "reggae",
  LATIN = "latin",
}

export const enum Decade {
  ALL = "all",
  EIGHTIES = "80",
  NINETIES = "90",
}

export const fetchSongs = async (genre: Genre) => {
  const response = await axios.get(
    `${PREFIX}/song1723/streamcount?genre=${genre}`
  );
  return response.data;
};

export const fetchSongsByDecade = async (decade: Decade): Promise<any> => {
  if (decade === Decade.ALL) {
    const eigthties = fetchSongsByDecade(Decade.EIGHTIES);
    const nineties = fetchSongsByDecade(Decade.NINETIES);
    // Concatenate the two arrays
    return Promise.all([eigthties, nineties]).then((values) => {
      return values[0].concat(values[1]);
    });
    
  } else if (decade === Decade.EIGHTIES) {
    const response = await axios.get(`${PREFIX}/top80/get_song_top80?song=all`);
    return response.data;
  } else if (decade === Decade.NINETIES) {
    const response = await axios.get(`${PREFIX}/top90/get_song_top90?song=all`);
    return response.data;
  }
  return null;
};
