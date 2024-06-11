import "./styles/App.scss";
import Scatter from "./components/Scatter";
import Map from "./components/Map";
import Title from "./components/Title";
import VerticalBar from "./components/VerticalBar";
import DistributionChart from "./components/DistributionChart";
function App() {
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
            This is a story about proving, with data, that  Every breath you
            take by The Police timeless.
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
      </div>
      <div className="chart-wrapper">
        <Scatter />
      </div>
      <div className="text container">
        <p>
          The data visualization reveals a few standout songs with exceptionally
          high playcounts, approaching or even exceeding 2 billion plays,
          indicating their massive popularity on Spotify. The majority of songs,
          however, cluster between 0.9 to 1.8 billion playcounts, highlighting a
          broad base of moderately popular tracks. Interestingly, recent songs,
          particularly those released closer to 2023, are represented by larger
          dots, signifying higher playcounts and suggesting a trend where newer
          releases rapidly accumulate streams.
        </p>
        <p>
          In terms of genre distribution, the predominance of green dots among
          the high-playcount songs suggests a dominant genre, likely pop,
          assuming standard color conventions are applied. This indicates that
          pop music continues to captivate a large audience on the platform.
        </p>
      </div>

      <div className="chart-wrapper">
        {/* <Title
          lines={[
            {
              content: "#1 Songs in 50 states in the US",
              color: "#05E800",
              size: 30,
              alignment: "middle",
            },
          ]}
        /> */}
        <Map />
      </div>
      <div className="text container">
        <p>
          The map provides a detailed view The map provides a detailed view of
          North and South America, with each country uniquely colored to
          represent the top songs listened to in 2020. "Blinding Lights" emerges
          as the most listened song with a staggering 839,625,846 plays. Other
          top tracks, such as "Tusa," "Safaera," and "Liberdade Provisória,"
          follow with significantly lower playcounts. of North and South
          America, with each country uniquely colored to represent the top songs
          listened to in 2020. "Blinding Lights" emerges as the most listened
          song with a staggering 839,625,846 plays. Other top tracks, such as
          "Tusa," "Safaera," and "Liberdade Provisória," follow with
          significantly lower playcounts. The map provides a detailed view of
          North and South America, with each country uniquely colored to
          represent the top songs listened to in 2020. "Blinding Lights" emerges
          as the most listened song with a staggering 839,625,846 plays. Other
          top tracks, such as "Tusa," "Safaera," and "Liberdade Provisória,"
          follow with significantly lower playcounts.
        </p>
        <p>
          The geographical distribution of these songs indicates distinct
          listening preferences across the United States, Canada, and Mexico,
          where "Blinding Lights" dominates. Furthermore, the map underscores
          the regional diversity in musical tastes, showcasing different songs
          that top the charts in various Latin American countries, highlighting
          the varied and rich musical landscape across the Americas.
        </p>
        <p>
          Showing that while global hits exist, regional hits can also achieve
          significant popularity within their locales.
        </p>
      </div>
      <div className="chart-wrapper">
        <Title
          lines={[
            {
              content: "Present-day Popularity of Five Decades of Music",
              color: "#FF6A6A",
              size: 35,
              alignment: "middle",
            },
            {
              content:
                "EVERY BILLBOARD HIT, 1980 - 2020, AND ITS PLAY COUNTS ON SPOTIFY",
              color: "white",
              size: 25,
              alignment: "middle",
            },
          ]}
        />
        {/* <VerticalBarChart /> */}
        <VerticalBar />
      </div>
      <div className="chart-wrapper">
        <Title
          lines={[
            {
              content: "Feature Distribution",
              color: "#05E800",
              size: 35,
              alignment: "middle",
            },
          ]}
        />
        <DistributionChart />
      </div>
    </div>
  );
}

export default App;
