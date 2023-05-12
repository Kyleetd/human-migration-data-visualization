import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import worldMapData from "./data/world-map.geo.json";
import "./WorldMap.css";

function WorldMap() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const projection = d3.geoMercator().fitSize([width, height], worldMapData);
    const pathGenerator = d3.geoPath().projection(projection);

    console.log(worldMapData);

    const countries = svg
      .selectAll(".country")
      .data(worldMapData.features)
      .join("path")
      .attr("class", "country")
      .attr("country-name", (feature) => feature.properties.name)
      .attr("d", (feature) => pathGenerator(feature))
      .attr("fill", "#ccc")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
    ></svg>
  );
}

export default WorldMap;
