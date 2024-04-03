import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface ScatterProps {
  data: number[];
}

const Scatter: React.FC<ScatterProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);
      svg.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', (d, i) => i * 70)
        .attr('y', (d) => 500 - 10 * d)
        .attr('width', 65)
        .attr('height', (d) => d * 10)
        .attr('fill', 'green');
    }
  }, [data]);

  return <svg ref={ref} />;
};

export default Scatter;