import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import ButtonGroup, { Button } from "./ButtonGroup";
import { max, scaleLinear, select, scaleBand } from "d3";
import { Decade, fetchSongsByDecade } from "../utils/api";

interface BarChartProps {}

const VerticalBar: React.FC<BarChartProps> = ({}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const width = svgRef.current?.getBoundingClientRect().width || 300;
  let height = svgRef.current?.getBoundingClientRect().height || 0;
  const margin = { top: 120, right: 100, bottom: 100, left: 40 };
  if (height < 120) {
    height = 120;
  }
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetchSongsByDecade(Decade.ALL).then((data) => {
      setData(data);
    });
  }, []);

  const buttons: Button[] = [
    { label: "1990s", value: Decade.NINETIES },
    { label: "1980s", value: Decade.EIGHTIES },
    { label: "ALL", value: Decade.ALL, active: true },
  ];

  // Select top 10 songs
  // Sort by Streams ascending

  let preprocessedData = data
    .sort((a, b) => {
      return b.streams - a.streams;
    })
    .slice(0, 10);
  const max_streams = max(preprocessedData, function (d) {
    return d.streams;
  });

  var x = scaleLinear()
    .domain([0, max_streams ? max_streams : 0])
    .range([0, width - margin.left - margin.right - 400]);

  var y = scaleBand()
    .domain(
      preprocessedData.map(function (d) {
        return d.song;
      })
    )
    .range([margin.top, margin.top + 30 * preprocessedData.length])
    .padding(0.1);

  const numberWithCommas = (x: string) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const generateChart = () => {
    const svg = select(svgRef.current);
    // The vertical bar chart is divided by two columns
    // 1. The title containing song name and artist
    // 2. The bar chart containing the number of streams
    
    svg.selectAll(".bar").remove();
    svg.selectAll(".stream-label").remove();
    svg.selectAll(".track").remove();
    svg.selectAll(".title").remove();
    // The columns' title called "Track"
    svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", margin.top + 20)
      .attr("class", "title")
      .text("Track")
      .attr("fill", "white")
      .attr("font-size", "30px")
      .attr("font-weight", "bold");

    // The columns' title called "Streams"
    svg
      .append("text")
      .attr("x", margin.left + 400)
      .attr("y", margin.top + 20)
      .attr("class", "title")
      .text("SPOTIFY PLAYCOUNTS")
      .attr("fill", "white")
      .attr("font-size", "30px")
      .attr("font-weight", "bold");

    // Add the song title
    svg
      .selectAll(".track")
      .data(preprocessedData)
      .enter()
      .append("text")
      .attr("class", "track")
      .attr("x", margin.left)
      .attr("y", function (d) {
        return (y(d.song) || 0) + 50;
      })
      .text(function (d) {
        return d.song;
      })
      .attr("fill", "white")
      .attr("dy", "1.1em");
    svg
      .selectAll(".bar")  
      .data(preprocessedData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", margin.left + 400) // Adjusted position
      .attr("y", function (d) {
        return (y(d.song) || 0) + 50;
      })
      .attr("height", y.bandwidth())
      .attr("fill", "#65D36E")
      .transition()
      .duration(1000)
      .attr("width", function (d) {
        return x(d.streams);
      });
    svg
      .selectAll(".stream-label")
      .data(preprocessedData)
      .enter()
      .append("text")
      .attr("class", "stream-label")
      .attr("x", function (d) {
        return margin.left + 400 + x(d.streams) + 10;
      }) // Adjusted position
      .attr("y", function (d) {
        return (y(d.song) || 0) + 50 + y.bandwidth() / 2;
      })
      .text(function (d) {
        return numberWithCommas(d.streams);
      })
      .attr("fill", "white")
      .attr("dy", ".5em");
      // Add horizontal grid lines
    svg
      .selectAll(".grid")
      .data(preprocessedData)
      .enter()
      .append("line")
      .attr("class", "grid")
      .attr("x1", function (d) {
        return margin.left;
      })
      .attr("x2", function (d) {
        return width - margin.right;
      })
      .attr("y1", function (d) {
        return (y(d.song) || 0) + 50;
      })
      .attr("y2", function (d) {
        return (y(d.song) || 0) + 50;
      })
      .style("stroke", "gray")
      .style("stroke-width", 1);
    
  };

  generateChart();
  return (
    <svg id="vertical-bar" ref={svgRef} viewBox={`0, 0 ${width} ${height}`}>
      {/* <SearchBar x={50} y={10} text="FIND A TRACK" onSearch={() => {}} /> */}
      <ButtonGroup
        x={width - margin.right - 20}
        y={margin.top - 90}
        buttons={buttons}
        onValueChange={(decade) => {
          fetchSongsByDecade(decade).then((data) => {
            setData(data);
          });
        }}
      />
      {/* Add a white horizontal line */}
      <line
        x1={margin.left}
        y1={margin.top - 25}
        x2={width - margin.right}
        y2={margin.top - 25}
        style={{ stroke: "white", strokeWidth: 2 }}
      />
    </svg>
  );
};

export default VerticalBar;
