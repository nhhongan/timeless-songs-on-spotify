import React, { useEffect, useRef } from "react";
import { scaleTime, scaleLinear, max, min, svg } from "d3";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import "../styles/Scatter.scss";
import { Song } from "../types/Song";

interface ScatterProps {
  data: Song[];
}

const Scatter: React.FC<ScatterProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  // Get the width and height of the svg element
  const width = svgRef.current?.getBoundingClientRect().width || 0;
  const height = svgRef.current?.getBoundingClientRect().height || 0;
  const margin = { top: 20, right: 20, bottom: 20, left: 40 };
  
  // Data preprocessing
  const processedData = data
  .map(d => ({ ...d, year: new Date(d.year, 0, 1) }))
  .map(d => ({ ...d, streams: d.streams / 1000000 }));

  // Add scaling and axis
  const scaledX = scaleTime()
  .domain([
    min(processedData, (d) => new Date(d.year.getFullYear() - 1, 0, 1))  || new Date(),
    max(processedData, (d) => d.year) || new Date(),
  ])
  .range([margin.left, width - margin.right]);
  
  const scaledY = scaleLinear()
  .domain([0, max(processedData, (d) => d.streams) || 0])
  .range([height - margin.bottom, margin.top]);
  const xAxis = axisBottom(scaledX);
  const yAxis = axisLeft(scaledY);

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
      .attr("r", 5)
      .style("fill", "rgba(232, 232, 232, 1)");
    svg.select(".x-axis")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis as any);
    svg.select(".y-axis")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(yAxis as any);

  });
  return <svg id="scatter-plot" ref={svgRef}>
    <g className="x-axis"></g>
    <g className="y-axis"></g>
  </svg>;
};

export default Scatter;
