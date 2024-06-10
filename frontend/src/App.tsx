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
            This is a story about proving, with data, that  Every breath you take by
            The Police timeless.
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
        The data visualization reveals a few standout songs with exceptionally high playcounts, 
        approaching or even exceeding 2 billion plays, indicating their massive popularity 
        on Spotify. 

        The majority of songs, however, cluster between 0.9 to 1.8 billion playcounts, 
        highlighting a broad base of moderately popular tracks. Interestingly, recent songs, 
        particularly those released closer to 2023, are represented by larger dots, signifying
        higher playcounts and suggesting a trend where newer releases rapidly accumulate streams. 

        In terms of genre distribution, the predominance of green dots among the high-playcount
        songs suggests a dominant genre, likely pop, assuming standard color conventions are applied. 
        This indicates that pop music continues to captivate a large audience on the platform.
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
        The map provides a detailed view of North and South America, with each country uniquely
        colored to represent the top songs listened to in 2020. "Blinding Lights" emerges as 
        the most listened song with a staggering 839,625,846 plays. Other top tracks, such as
        "Tusa," "Safaera," and "Liberdade Provisória," follow with significantly lower playcounts. 

        The geographical distribution of these songs indicates distinct listening preferences 
        across the United States, Canada, and Mexico, where "Blinding Lights" dominates. 
        Furthermore, the map underscores the regional diversity in musical tastes, showcasing
        different songs that top the charts in various Latin American countries, highlighting 
        the varied and rich musical landscape across the Americas.

        Showing that while global hits exist, regional hits can also achieve significant popularity
        within their locales.
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
      <div className="text container">
        <p>
          40 years have passed since <b>Every breath you take</b>'s release. 
          Its popularity on Spotify, relative to every other song from the 80s, 
          is a strong signal for whether it will be remembered by our children’s children. 
        </p>
        <p>
          Following far behind are classics like "I Wanna Dance with Somebody (Who Loves Me)"
          and "Billie Jean," with 28,893,046 and 21,103,413 plays, respectively. 
          Other notable entries include "Iris", "Sweet Child O' Mine" and "Everybody Wants to Rule the World", 
          each with playcounts ranging between approximately 11 to 17 million. 
        
          The inclusion of songs like "No Scrubs" and "You're Still the One" 
          further emphasizes the broad spectrum of popular music from the past several 
          decades that continues to resonate with today's listeners on Spotify.
        </p>
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
          ]} />
        <DistributionChart />
      </div>
      <div className="text container">
        <p>
          The "danceability" histogram shows a concentration around the mid-range values (0.4 to 0.7), 
          indicating that most of the hits possess moderate danceability, making them suitable for both 
          casual listening and dancing. The "energy" feature is also centered around mid to high values 
          (0.4 to 0.8), suggesting that the hits are generally energetic and lively. The "loudness" 
          distribution peaks between -15 dB and -5 dB, reflecting a preference for relatively loud and 
          impactful tracks.

          "Speechiness" shows a steep decline, with most values clustering below 0.1, indicating that 
          the hits contain minimal spoken word content and are more musically focused. "Acousticness" 
          is predominantly low (0.0 to 0.2), highlighting a trend towards electronic or digitally produced 
          sounds rather than acoustic elements. Finally, "liveness" is concentrated at the lower end 
          (0.0 to 0.2), implying that most tracks are likely studio recordings rather than live performances. 
          
          Overall, these distributions provide a snapshot of the characteristics that define current popular 
          music, emphasizing energetic, electronically produced, and moderately danceable tracks.
        </p>
      </div>
    </div>
  );
}

export default App;
