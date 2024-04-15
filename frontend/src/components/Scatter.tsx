import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/Scatter.scss";

interface ScatterProps {
  data: any[];
}

const Scatter: React.FC<ScatterProps> = ({ data }) => {
  const scaledX = d3.scaleLinear().domain([0, data.length]).range([0, 800]);
  const scaledY = d3.scaleLinear().domain([0, 100]).range([0, 400]);
  var xAxis = d3.axisBottom(scaledX);
  var yAxis = d3.axisLeft(scaledY);
  return (
    <svg id="scatter-plot">
      <g
        className="x-axis"
        ref={(el) => {
          if (el) {
            const svg = d3.select(el);
            svg.call(xAxis);
          }
        }}
      />
      <g
        className="y-axis"
        style={{ transform: "translateX(50px)" }}
        ref={(el) => {
          if (el) {
            const svg = d3.select(el);
            svg.call(yAxis);
          }
        }}
      />
      {data.map((d, i) => (
        <circle
          key={i}
          cx={scaledX(i)}
          cy={scaledY(d.popularity)}
          r={5}
          fill="black"
        />
      ))}
    </svg>
  );
};

export default Scatter;
