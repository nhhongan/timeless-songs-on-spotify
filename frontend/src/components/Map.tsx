import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/Map.scss"
import { geoAlbersUsa, geoMercator } from "d3";
import ButtonGroup, { Button } from "./ButtonGroup";
import { Decade } from "../utils/api";

const Map: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const width = svgRef.current?.getBoundingClientRect().width || 1000;
  let height = svgRef.current?.getBoundingClientRect().height || 0;
  if (height < 10) {
    height = 500;
  }
  
  // Create projection
  const projection = geoMercator().translate([0, 100]).scale(120);
  // Create a new path generator
  const path = d3.geoPath().projection(projection);
  const json_link = "https://raw.githubusercontent.com/chauanphu/dataset/master/america.geo.json"

  d3.json(json_link).then((geoData: any) => {

    const svg = d3.select(svgRef.current);
    const map = svg.append("g")
    .attr("class", "map")
    // Center the map in the middle of the container
    .attr("transform", `translate(${width / 2 + 200}, ${height / 2})`);

    // Group the data by country
    const countries = d3.group(geoData.features, (d: any) => d.properties.name)
    const color = d3.scaleOrdinal(d3.schemeCategory10)

    // For each country, draw the map
    map.selectAll("path")
    .data(countries)
    .enter()
    .append("path")
    .attr("d", (d: any) => path(d[1][0]))
    .attr("fill", (d: any, i: number) => color(i.toString()))
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)

    // Add 
  })

    

  // useEffect(() => {
  //   const svg = d3.select(svgRef.current);
  //   const path = d3.geoPath();
  //   const features = feature(
  //     usTopoJson,
  //     usTopoJson.objects.states
  //   ) as FeatureCollection<GeometryCollection, GeoJsonProperties>;
  //   svg
  //     .append("path")
  //     .attr("stroke", "#aaa")
  //     .attr("stroke-width", "0.5")
  //     .attr(
  //       "d",
  //       path(feature(usTopoJson, usTopoJson.objects.nation as GeometryObject))
  //     );
  //   svg
  //     .append("path")
  //     .attr("stroke", "#aaa")
  //     .attr("stroke-width", "0.5")
  //     .attr(
  //       "d",
  //       path(mesh(usTopoJson, usTopoJson.objects.states as GeometryObject))
  //     );
  //   // Add states labels to the map
  //   svg
  //     .selectAll("text")
  //     .data(features.features)
  //     .enter()
  //     .append("text")
  //     .text((d) => d.properties?.name)
  //     .attr("x", (d) => path.centroid(d)[0])
  //     .attr("y", (d) => path.centroid(d)[1])
  //     .attr("text-anchor", "middle")
  //     .attr("font-size", "8px")
  //     .attr("fill", "#05E800");
  // }, []);
  const button: Button[] = [
    { label: "All", value: Decade.ALL, active: true, fontSize: 12, width: 50, height: 20},
    { label: "1980s", value: Decade.EIGHTIES, fontSize: 12, width: 50, height: 20 },
    { label: "1990s", value: Decade.NINETIES, fontSize: 12, width: 50, height: 20 },
    { label: "2000s", value: Decade.TWENTIES, fontSize: 12, width: 50, height: 20},
  ];
  return (
    <svg id="map-chart" ref={svgRef} viewBox={`0 0 ${width} ${height}`}>
      <ButtonGroup buttons={button} x={200} y={height / 2 - 100} onValueChange={(value) => {
        console.log(value);
      }}/>
    </svg>
  );
};

export default Map;
