import React, { useEffect, useRef, useState } from "react";
import { scaleTime, scaleLinear, max, min, svg, scaleQuantize, scaleOrdinal } from "d3";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import "../styles/Scatter.scss";
import ButtonGroup, { Button } from "./ButtonGroup";
import { Genre, fetchSongs } from "../utils/api";
import { Song } from "../types/Song";

interface ScatterProps {}

const Scatter: React.FC<ScatterProps> = ({}) => {
  const [data, setData] = useState<Song[]>([]);
  const [genre, setGenre] = useState<Genre>(Genre.ALL);
  
  useEffect(() => {
    fetchSongs(Genre.ALL).then((data) => {
      setData(data);
    });
  }, []);

  const svgRef = useRef<SVGSVGElement | null>(null);
  // Get the width and height of the svg element
  const width = svgRef.current?.getBoundingClientRect().width || 0;
  let height = svgRef.current?.getBoundingClientRect().height || 0;
  // if height < 10, set height to 500
  if (height < 800) {
    height = 800;
  }
  const margin = { top: 120, right: 100, bottom: 100, left: 80 };

  // Data preprocessing
  const processedData = data
    // The month is in the format "Jan", "Feb", etc. We need to convert it to a number
    // Also add the date to the data
    .map((d) => ({ ...d, date: new Date(d.Month + " 1, " + d.Year) }))
    .map((d) => ({ ...d, streams: d.Streams / 1000000000 }));

  // Add scaling and axis
  const scaledX = scaleTime()
    .domain([
      min(processedData, (d) => new Date(2016, 0)) ||
        new Date(),
      max(
        processedData,
        (d) => new Date(2024, 6)
      ) || new Date(),
    ])
    .range([margin.left, width - margin.right]);

  const scaledY = scaleLinear()
    .domain([0, 5])
    .range([height - margin.bottom, margin.top]);

  const scaledArea = scaleLinear()
    .domain([
      min(processedData, (d) => d.streams) || 0,
      max(processedData, (d) => d.streams) || 0,
    ])
    .range([2, 20]);
  const scaledColor = scaleOrdinal<string, string>()
    .domain([Genre.ROCK, Genre.POP, Genre.HIPHOP, Genre.LATIN])
    .range(["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]);

  const xAxis = axisBottom(scaledX).tickSize(0).tickPadding(20);
  const yAxis = axisLeft(scaledY)
    .tickSize(-width + margin.left + margin.right)
    .tickSizeOuter(0)
    .tickPadding(10);
  
  const filteredDataByGenre = () => {
    if (genre === Genre.ALL) {
      return processedData;
    }
    return processedData.filter((d) => d.Genre === genre);
  }
  
  const generateChart = () => {
    const svg = select(svgRef.current);
    svg.selectAll("circle").remove();
    svg
      .selectAll("circle")
      .data(filteredDataByGenre())
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        return scaledX(d.date) || 0;
      })
      .attr("cy", (d) => scaledY(d.streams) || 0)
      .attr("r", 0)
      .style("fill", "rgba(232, 232, 232, 1)")
      .transition()
      .duration(1000)
      .attr("r", (d) => scaledArea(d.streams) || 0)
      .style("fill", (d) => {
        return scaledColor(d.Genre)
      })
      .style("opacity", 0.7);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis as any);
    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis as any);
  }
  
  generateChart();

  const buttons: Button[] = [
    { label: "All", value: Genre.ALL, active: true, color: scaledColor(Genre.ALL) },
    { label: "Rock", value: Genre.ROCK, color: scaledColor(Genre.ROCK)},
    { label: "Pop", value: Genre.POP, color: scaledColor(Genre.POP)},
    { label: "Hip Hop", value: Genre.HIPHOP, color: scaledColor(Genre.HIPHOP)},
    { label: "Latin", value: Genre.LATIN, color: scaledColor(Genre.LATIN)},
  ];

  return (
    <svg id="scatter-plot" ref={svgRef} viewBox={`0, 0 ${width}, ${height}`}>
      <g className="x-axis axis"></g>
      <g className="y-axis axis"></g>
      <ButtonGroup
        buttons={buttons.reverse()}
        x={width - margin.left - 20}
        y={margin.top - 50}
        onValueChange={(genre: Genre) => {
          setGenre(genre);
          generateChart();
        }}
      />
      {/* Add title */}
      <text
        className="title"
        transform={`translate(${margin.left}, 40)`}
        fontSize={30}
        fontWeight={500}
      >
        <tspan x="0" y="0" fontSize={40}>
          <tspan fill="rgba(5, 232, 0, 1)">MOST-PLAYED </tspan>
          HITS ON SPOTIFY (2014 - 2023)
        </tspan>
        <tspan x="0" y="1.2em">
          SPOTIFY PLAYCOUNTS IN 2023
        </tspan>
      </text>
      {/* Add y axis label */}
      <text
        className="axis-label"
        transform={`translate(20, ${height / 2}) rotate(-90)`}
        textAnchor="middle"
        fill="white"
        fontSize={20}
        fontWeight={500}
      >
        SPOTIFY PLAYCOUNTS (BILLIONS)
      </text>
    </svg>
  );
};

export default Scatter;
