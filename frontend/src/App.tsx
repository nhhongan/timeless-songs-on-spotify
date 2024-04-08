import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import Scatter from "./components/Scatter";

function App() {
  const [data, setData] = useState<object[]>([]);
  const apiPrefix = process.env.REACT_APP_API_PREFIX;
  useEffect(() => {
    console.log(apiPrefix)
  });

  return (
    <div className="App">
      <div className="header container">
        <h1>The Greatest</h1>
        <h1 id="highlight">Classical Songs</h1>
        <h1>of All Time</h1>
        <p>
          USING <a href="https://open.spotify.com/">SPOTIFY</a> TO MEASURE THE
          POPULARITY OF OLDER MUSIC
        </p>
      </div>
      <div className="text container">
        <p>
          <b>
            This is a story about proving, with data, that  No Diggity by
            Blackstreet is timeless.
          </b>
        </p>
        <p>
          Until recently, it was impossible to measure the popularity of older
          music. Billboard charts and album sales only tell us about a song’s
          popularity at the time of its release.
        </p>
        <p>
          But now we have Spotify, a buffet of all of music, new and old. Tracks
          with fewer plays are fading into obscurity. And those with more plays
          are remaining in the cultural ether.
        </p>
        <p>
          20 years have passed since No Diggity's release. Its popularity on
          Spotify, relative to every other song from the 90s, is a strong signal
          for whether it will be remembered by our children’s children. So let's
          examine every song that ever charted, 1990 - 1999, and rank them by
          number of plays on Spotify, today.
        </p>
      </div>
      {/* <Scatter data={[]}>
        
      </Scatter> */}
    </div>
  );
}

export default App;
