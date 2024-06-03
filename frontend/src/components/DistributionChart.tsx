import React, { useEffect, useRef, useState } from "react";
import { max, scaleLinear, select, axisBottom, axisLeft, bin, extent } from "d3";
import { fetchSongFeatures } from "../utils/api";
import "../styles/Distribution.scss"; 
interface BarChartProps {}

interface HistogramProps {
  data: number[];
  color: string;
  name: string;
}

type FeatureGrid = {
  [key: string]: number[];

  danceability: number[];
  energy: number[];
  loudness: number[];
  speechiness: number[];
  acousticness: number[];
  liveness: number[];
  valence: number[];
  tempo: number[];
};

const FeatureHistogram: React.FC<HistogramProps> = ({data, color, name}) => {
  const ref = useRef<SVGSVGElement>(null);
  const margin = { top: 40, right: 30, bottom: 10, left: 20 };
  const width = ref.current?.getBoundingClientRect().width || 0;
  let height = ref.current?.getBoundingClientRect().height || 0;
  if (height < 10) {
    height = 200;
  }
  
  const generateChart = () => {
    if (!data) {
      return;
    }
    
    let bins = bin().thresholds(50)(data);
    // Remove all missing values
    bins = bins.filter((bin) => bin.x0 != undefined && bin.x1 != undefined);
    // Convert bins to distribution
    let distribution_data = bins.map((bin) => {
      return {
        x0: bin.x0 ?? -1,
        x1: bin.x1 ?? -1,
        length: bin.length,
      };
    });

    // Create x and y scales based on distribution data
    var x_scale = scaleLinear()
      .domain(
        extent(distribution_data, function (d) {
          return d.x0;
        }) as [number, number] 
      )
      .range([margin.left, width - margin.right - margin.left]);

    var y = scaleLinear()
      .domain([
        0,
        max(distribution_data, function (d) {
          return d.length;
        }) as number,
      ])
      .range([height, 0]);

    // Create svg element
    const svg = select(ref.current)
    svg
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
      
    svg.selectAll("*").remove();
    // Create x-axis, with 5 ticks
    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height})`)
      .call(axisBottom(x_scale).ticks(3).tickSizeOuter(0));

    // Create y-axis
    svg.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(
      axisLeft(y)
      .ticks(4)
      .tickSize(-width + margin.left + margin.right)
      .tickSizeOuter(0)
    );

    // Create bars
    svg
      .selectAll("rect")
      .data(distribution_data)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x_scale(d.x0);
      })
      .attr("width", function (d) {
        return x_scale(d.x1) - x_scale(d.x0) + 1;
      })
      .attr("y", function (d) {
        return y(d.length);
      })
      .attr("height", function (d) {
        return height - y(d.length);
      })
      .style("fill", color);

    // Create title
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", - margin.top / 2 + 7)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "white")
      .text(name);
  }

  useEffect(() => {
    generateChart();
  }, [data]);

  return <svg id='name' ref={ref} viewBox={`0, 0, ${width} ${height}`}></svg>
}


const DistributionChart: React.FC<BarChartProps> = ({}) => {
  const [data, setData] = useState<FeatureGrid>();
  useEffect(() => {
    fetchSongFeatures().then((data) => {
      const featureGrid: FeatureGrid = {
        danceability: [],
        energy: [],
        loudness: [],
        speechiness: [],
        acousticness: [],
        liveness: [],
        valence: [],
        tempo: [],
      };
      data.forEach((song) => {
        featureGrid.danceability.push(song.danceability);
        featureGrid.energy.push(song.energy);
        featureGrid.loudness.push(song.loudness);
        featureGrid.speechiness.push(song.speechiness);
        featureGrid.acousticness.push(song.acousticness);
        featureGrid.liveness.push(song.liveness);
        featureGrid.valence.push(song.valence);
        featureGrid.tempo.push(song.tempo);
      });
      setData(featureGrid);
    });

    // Convert data to grid
  }, []);

  const features = [
    "danceability",
    "energy",
    "loudness",
    "speechiness",
    "acousticness",
    "liveness",
    "valence",
    "tempo",
  ];
  const colors = [
    "#ED520F",
    "#15FD8E",
    "#9747FF",
    "#FFE247",
    "#47A7FF",
    "#FF90F4",
    "#9BDAA0",
    "#FF4747",
  ];

  return (
    <div className="grid-chart">
      {features.map((feature, i) => (
        <div id={feature} key={i} className="histogram" style={
          {width: "300px", height: "300px"}
        }>
        <FeatureHistogram data={data ? data[feature] : []} color={colors[i]} name={feature} />
        </div>        
      ))}
    </div>
  );
};

export default DistributionChart;
