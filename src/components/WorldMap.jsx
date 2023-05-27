import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import worldMapData from "./data/world-map.geo.json";
import "./WorldMap.css";
import countries_in_dataset from "./data/countries_in_dataset.json";

// This dictionary aligns country names between svg components and dataset
const country_name_map = {
  "czech_republic": "czechia",
  "korea": "south_korea",
  "slovak_republic": "slovakia",
  "t\u00fcrkiye": "turkey",
  "united_states": "united_states_of_america",
  "bosnia_and_herzegovina": "bosnia_and_herz.",
  "brunei_darussalam": "brunei",
  "central_african_republic": "central_african_rep.",
  "democratic_people's_republic_of_korea": "south_korea",
  "democratic_republic_of_the_congo": "dem._rep._congo",
  "dominican_republic": "dominican_rep.",
  "equatorial_guinea": "eq._guinea",
  "solomon_islands": "solomon_is.",
  "swaziland": "eswatini",
  "viet_nam": "vietnam"
}

function get_data_set_country_name(svgCountry) {
  /*
  If the svgCountry exists as a value in country_name_map it will return its
  key. If no matching value is found it will return svgCountry.
  */
  for (let key in country_name_map) {
    if (country_name_map[key] == svgCountry) {
      return key;
    }
  }
  return svgCountry;
}

function get_svg_country_name(datasetCountry) {
  /*
  If the datasetCountry exists as a key in country_name_map it will return its
  value. If no matching value is found it will return svgCountry.
  */
  if (country_name_map.hasOwnProperty(datasetCountry)) {
    return country_name_map[datasetCountry];
  }
  return datasetCountry;
}

function WorldMap() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const projection = d3.geoMercator().fitSize([width, height], worldMapData);
    const pathGenerator = d3.geoPath().projection(projection);

    const countries = svg
      .selectAll(".country")
      .data(worldMapData.features)
      .join("path")
      .attr("class", "country")
      .attr("id", (feature) => feature.properties.name.toLowerCase().replace(/ /g, '_'))
      .attr("d", (feature) => pathGenerator(feature))
      .attr("fill", "#ccc")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .on("click", (event, feature) => {
        // For testing country name mapping
        for (let country in countries_in_dataset) {
          if (country_name_map.hasOwnProperty(country)) {
            country = country_name_map[country];
          }
          const countryElement = document.getElementById(country);
          if (!countryElement) {
            // console.log(country);
          }
        }
        // For testing country name mapping
        console.log("czech_republic:", get_svg_country_name("czech_republic"));
        console.log("canada:", get_svg_country_name("canada"));
        console.log("united_states_of_america:", get_data_set_country_name("united_states_of_america"));   
        console.log("canada:", get_data_set_country_name("canada"));      
      });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
      id="countries-svg"
    ></svg>
  );
}

export default WorldMap;
