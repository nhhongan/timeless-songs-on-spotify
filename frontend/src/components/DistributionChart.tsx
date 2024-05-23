import React, { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import ButtonGroup, { Button } from "./ButtonGroup";
import { max, scaleLinear, select, scaleBand } from "d3";
import { Decade, fetchSongsByDecade } from "../utils/api";

interface BarChartProps {}

const DistributionChart: React.FC<BarChartProps> = ({}) => {
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

  };

  generateChart();
  return (
    <svg id="distribution-bar" ref={svgRef} viewBox={`0, 0 ${width} ${height}`}>

    </svg>
  );
};

export default DistributionChart;
