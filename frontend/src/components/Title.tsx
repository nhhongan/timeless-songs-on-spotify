import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type Line = {
  content: string;
  color: string;
  size: number;
  alignment: string;
}

type TitleProps = {
  lines: Line[];
};

const Title: React.FC<TitleProps> = ({lines}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const calx = function (d: Line) {
        switch (d.alignment) {
          case "start":
            return "0";
          case "middle":
            return "50%";
          case "end":
            return "100%";
          default:
            return "0";
        }
      }
      svg.selectAll("text")
        .data(lines)
        .enter()
        .append("text")
        .text((d) => d.content)
        .attr("x", (d) => calx(d))
        .attr("y", (d, i) => `${1 + i * 2}em`)
        .attr("font-size", (d) => d.size)
        .attr("fill", (d) => d.color)
        .attr("text-anchor", (d) => d.alignment);
    }
  }, []);

  return <svg ref={svgRef} height={100}></svg>;
};

export default Title;
