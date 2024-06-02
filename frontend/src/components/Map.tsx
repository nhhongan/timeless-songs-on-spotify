import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/Map.scss";
import { geoAlbersUsa, geoMercator } from "d3";
import ButtonGroup, { Button } from "./ButtonGroup";
import { Decade, fetchSongforMap, numberWithCommas } from "../utils/api";

type SongByCountry = {
  Country: string;
  Song: string;
  StreamCount: number;
  Years: string;
};

const Map: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  let width = svgRef.current?.getBoundingClientRect().width || 1000;
  let height = svgRef.current?.getBoundingClientRect().height || 0;
  if (height < 700) {
    height = 600;
  }
  if (width < 10) {
    width = 800;
  }
  const [year, setYear] = React.useState<number>(2020);
  const [data, setData] = React.useState<SongByCountry[]>([]);

  // Create projection
  const projection = geoMercator().translate([200, 150]).scale(170);
  // Create a new path generator
  const path = d3.geoPath().projection(projection);
  const json_link =
    "https://raw.githubusercontent.com/chauanphu/dataset/master/america.geo.json";

  useEffect(() => {
    // Fetch the data
    fetchSongforMap(year).then((data) => {
      setData(data);
    });

  }, []);

  const drawMap = (data: SongByCountry[]) => {
    if (!data) {
      return;
    }

    d3.select("#tooltip").remove();

    // Add tooltip
    d3.select("body")
      .append("div")
      .attr("id", "tooltip")
      .style("display", "none")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    d3.json(json_link).then((geoData: any) => {
      const svg = d3.select(svgRef.current);
      // Clear the svg map
      svg.selectAll(".table").remove();
      svg.selectAll(".map").remove();
      
      const map = svg
        .append("g")
        .attr("class", "map")
        // Center the map in the middle of the container
        .attr("transform", `translate(${width / 2 + 200}, ${height / 2})`);

      // Group the data by country
      const countries = d3.group(
        geoData.features,
        (d: any) => d.properties.name
      );

      // Merge the topSongofContries with the countries
      countries.forEach((value: any, key) => {
        const country = data.find((d: SongByCountry) => d.Country === key);
        if (country) {
          value[0].properties.Song = country.Song;
          value[0].properties.StreamCount = country.StreamCount;
        }
      });

      // Color for each song
      const colorScale = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.Song))
        .range(d3.schemeCategory10);

      
      // For each country, draw the map
      map
        .selectAll("path")
        .attr("class", "country")
        .data(countries)
        .enter()
        .append("path")
        .attr("d", (d: any) => path(d[1][0]))
        .on("mouseover", (event: any, d: any) => {
          const song = d[1][0].properties.Song;
          const streamCount = d[1][0].properties.StreamCount;
          const country = d[1][0].properties.name;
          if (!song) {
            return;
          }
          const currentElement = d3.select(event.currentTarget);
          currentElement
            .attr("stroke-width", 2);
          d3.select("#tooltip")
            .style("display", "block")
            .style("left", `${event.pageX}px`)
            .style("top", `${event.pageY}px`)
            .html(
              `<div><b>${country}</b></div><div>${song}</div><div>${numberWithCommas(streamCount)} streams</div>`
            );
        })
        .on("mouseout", (event) => {
          const currentElement = d3.select(event.currentTarget);
          currentElement.attr("stroke-width", 0.5);
          d3.select("#tooltip").style("display", "none");
        })
        .attr("fill", "gray") // start with white color
        .transition()
        .duration(1000)
        .attr("fill", (d: any, i: number) => {
          const song = d[1][0].properties.Song;
          if (!song) {
            return "gray";
          }
          return colorScale(song) as string;
        })
        .attr("stroke", "black")
        .attr("stroke-width", 0.5)
      // Draw the table of top songs
      const groupedBySong = d3.group(data, (d) => d.Song);
      // Sort the songs by stream count
      groupedBySong.forEach((value, key) => {
        value.sort((a, b) => b.StreamCount - a.StreamCount);
      });
      const table = d3.select("#map-chart").append("g").attr("class", "table");
      table.attr("transform", `translate(${30}, ${height / 2})`);
      table
        .selectAll("rect")
        .data(groupedBySong)
        .enter()
        .append("rect")
        .attr("x", 10)
        .attr("y", (d, i) => 30 + i * 20 + 12)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", (d) => colorScale(d[0]) as string)
        .on("mouseover", function(event: any, d: any) {
          const song = d[1][0].Song; // get the song of the legend item
          // Select all paths and change their opacity
          map.selectAll("path")
            .transition()
            .duration(200)
            .style("opacity", (d: any) => {
              const pathSong = d[1][0].properties.Song; // get the song of the path
              return pathSong === song ? 1 : 0.3; // if the songs match, set opacity to 1, otherwise set it to 0.3
            });
        })
        .on("mouseout", function(event: any, d: any) {
          // On mouseout, reset all paths to full opacity
          map.selectAll("path")
            .transition()
            .duration(200)
            .style("opacity", 1);
        });
      
      table
        .selectAll("text")
        .data(groupedBySong)
        .enter()
        .append("text")
        .attr("x", 30)
        .attr("y", (d, i) =>30 + i * 20 + 25)
        .style("font-size", 15)
        .style("fill", "white")
        .text((d, i:number) => {
          return `${i + 1}. ${d[0]}`;
        });

        table
        .append("text")
        .attr("x", 0)
        .attr("y", 10)
        .text("Top songs")
        .style("font-size", 25)
        .style("font-weight", "bold")
        .style("fill", "white")
        .style("transform", "translate(40px, 0)");
        
        // Add border to the table
        // table
        // .append("rect")
        // .attr("x", 0)
        // .attr("y", -20)
        // .attr("z-index", -1)
        // .attr("width", 200)
        // .attr("height", height / 2)
        // .attr("fill", "rgba(0, 0, 0, 0.1)")
        // .attr("stroke", "darkgreen")
        // .attr("stroke-width", 1)
        // .attr("rx", 5)
        // .attr("ry", 5);
        
        
    });
  };

  drawMap(data);

  const button: Button[] = [
    {
      label: "2020",
      value: 2020,
      fontSize: 15,
      width: 65,
      height: 30,
      active: true,
    },
    { label: "2019", value: 2019, fontSize: 15, width: 65, height: 30 },
    { label: "2018", value: 2018, fontSize: 15, width: 65, height: 30 },
  ];
  return (
    <svg id="map-chart" ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      <ButtonGroup
        buttons={button}
        x={170}
        y={height / 2 - 70}
        onValueChange={(value) => {
          setYear(value);
          fetchSongforMap(value).then((data) => {
            drawMap(data);
          });
        }}
      />      
      {/* Title */}
      <text
        className="title"
        transform={`translate(${0}, 40)`}
        fontSize={30}
        fontWeight={500}
      >
        <tspan x="0" y="0" fontSize={40} fill={"lightgreen"}>
          GEOGRAPHICAL CONTRIBUTION
        </tspan>
        <tspan x="0" y="1.2em">
          TO THE TOP LISTENED SONGS IN AMERICA
        </tspan>
      </text>
    </svg>
  );
};

export default Map;
