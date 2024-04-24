import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { feature, mesh } from "topojson-client";
import {
  GeoJsonProperties,
  GeometryCollection,
  FeatureCollection,
} from "geojson";
import us from "../data/counties-albers-10m.json";
import { GeometryObject, Objects, Topology } from "topojson-specification";

const Map: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  // convert us to topojson
  const usTopoJson = us as unknown as Topology<Objects<GeoJsonProperties>>;
  
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const path = d3.geoPath();
    const features = feature(
      usTopoJson,
      usTopoJson.objects.states
    ) as FeatureCollection<GeometryCollection, GeoJsonProperties>;
    svg
      .append("path")
      .attr("stroke", "#aaa")
      .attr("stroke-width", "0.5")
      .attr(
        "d",
        path(feature(usTopoJson, usTopoJson.objects.nation as GeometryObject))
      );
    svg
      .append("path")
      .attr("stroke", "#aaa")
      .attr("stroke-width", "0.5")
      .attr(
        "d",
        path(mesh(usTopoJson, usTopoJson.objects.states as GeometryObject))
      );
    // Add states labels to the map
    svg
      .selectAll("text")
      .data(features.features)
      .enter()
      .append("text")
      .text((d) => d.properties?.name)
      .attr("x", (d) => path.centroid(d)[0])
      .attr("y", (d) => path.centroid(d)[1])
      .attr("text-anchor", "middle")
      .attr("font-size", "8px")
      .attr("fill", "#05E800");
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 975 610">
      <g
        fill="none"
        stroke="#000"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Map;
