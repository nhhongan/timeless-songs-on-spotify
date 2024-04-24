import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type TitleProps = {
  title: string;
};
const Title: React.FC<TitleProps> = ({title}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      svg
        .append("text")
        .attr("x", 50)
        .attr("y", 50)
        .text(title)
        .style("font-size", "24px")
        .style("font-weight", "bold");
    }
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default Title;
