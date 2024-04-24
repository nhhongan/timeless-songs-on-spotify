import React, { useEffect, useRef } from "react";
import { scaleTime, scaleLinear, max, min, svg, scaleQuantize } from "d3";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import "../styles/Scatter.scss";
import { Song } from "../types/Song";
import ButtonGroup, { Button } from "./ButtonGroup";

interface ScatterProps {
  data: Song[];
}

const Scatter: React.FC<ScatterProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  // Get the width and height of the svg element
  const width = svgRef.current?.getBoundingClientRect().width || 0;
  const height = svgRef.current?.getBoundingClientRect().height || 0;
  const margin = { top: 120, right: 100, bottom: 100, left: 80 };

  // Data preprocessing
  const processedData = data
    .map((d) => ({ ...d, year: new Date(d.year, 0, 1) }))
    .map((d) => ({ ...d, streams: d.streams / 1000000000 }));

  // Add scaling and axis
  const scaledX = scaleTime()
    .domain([
      min(processedData, (d) => new Date(d.year.getFullYear() - 1, 0, 1)) ||
        new Date(),
      max(processedData, (d) => new Date(d.year.getFullYear(), 6)) || new Date(),
    ])
    .range([margin.left, width - margin.right]);

  const scaledY = scaleLinear()
    .domain([0, max(processedData, (d) => d.streams + 1) || 0])
    .range([height - margin.bottom, margin.top]);

  const scaledArea = scaleLinear()
    .domain([
      min(processedData, (d) => d.streams) || 0,
      max(processedData, (d) => d.streams) || 0,
    ])
    .range([2, 20]);
  const xAxis = axisBottom(scaledX).tickSize(0).tickPadding(20);
  const yAxis = axisLeft(scaledY)
    .tickSize(-width + margin.left + margin.right)
    .tickSizeOuter(0)
    .tickPadding(10);

  useEffect(() => {
    if (!processedData.length) return;
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(processedData)
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        return scaledX(d.year) || 0;
      })
      .attr("cy", (d) => scaledY(d.streams) || 0)
      .attr("r", (d) => scaledArea(d.streams) || 0)
      .style("fill", "rgba(232, 232, 232, 1)");
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis as any);
    svg
      .select(".y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis as any);
  });

  const buttons: Button[] = [
    {
      label: 'ALL GENRES',
      onClick: () => {},
      active: true,
    },
    {
      label: 'POP',
      onClick: () => {},
    },
  ];

  return (
    <svg id="scatter-plot" ref={svgRef} viewBox={`0, 0 ${width}, ${height}`}>
      <g className="x-axis axis"></g>
      <g className="y-axis axis"></g>
      <ButtonGroup buttons={buttons} x={width - margin.left - 20} y={margin.top - 50} />
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
