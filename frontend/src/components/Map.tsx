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
      // Add
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
        y={height / 2 - 100}
        onValueChange={(value) => {
          setYear(value);
          fetchSongforMap(value).then((data) => {
            drawMap(data);
          });
        }}
      />
    </svg>
  );
};

export default Map;
