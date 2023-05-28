import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import fs from "fs";
import worldMapData from "./data/world-map.geo.json";
import "./WorldMap.css";
import countriesInDataset from "./data/countries_in_dataset.json";


// CONSTANTS
// This dictionary aligns country names between svg components and dataset
const countryNameMap = {
  czech_republic: "czechia",
  korea: "south_korea",
  slovak_republic: "slovakia",
  "t\u00fcrkiye": "turkey",
  united_states: "united_states_of_america",
  bosnia_and_herzegovina: "bosnia_and_herz.",
  brunei_darussalam: "brunei",
  central_african_republic: "central_african_rep.",
  "democratic_people's_republic_of_korea": "south_korea",
  democratic_republic_of_the_congo: "dem._rep._congo",
  dominican_republic: "dominican_rep.",
  equatorial_guinea: "eq._guinea",
  solomon_islands: "solomon_is.",
  swaziland: "eswatini",
  viet_nam: "vietnam",
};

// This list contains the dataset country names for countries we have data for
const countriesWithData = [
  "australia",
  "austria",
  "belgium",
  "canada",
  "chile",
  "czech_republic",
  "denmark",
  "estonia",
  "finland",
  "france",
  "germany",
  "greece",
  "hungary",
  "iceland",
  "ireland",
  "israel",
  "italy",
  "japan",
  "korea",
  "latvia",
  "luxembourg",
  "mexico",
  "netherlands",
  "new_zealand",
  "norway",
  "poland",
  "portugal",
  "slovak_republic",
  "slovenia",
  "spain",
  "sweden",
  "switzerland",
  "t\u00fcrkiye",
  "united_kingdom",
  "united_states",
];

const countriesWithDataColor = "#888"
const countriesWithDataHoverColor = "#555"
const countriesWithoutDataColor = "#ccc"
// CONSTANTS


// UTILITY FUNCTIONS
function getDataSetCountryName(svgCountry) {
  /*
  If the svgCountry exists as a value in countryNameMap it will return its
  key. If no matching value is found it will return svgCountry.
  */
  for (let key in countryNameMap) {
    if (countryNameMap[key] == svgCountry) {
      return key;
    }
  }
  return svgCountry;
}

function getSvgCountryName(datasetCountry) {
  /*
  If the datasetCountry exists as a key in countryNameMap it will return its
  value. If no matching value is found it will return svgCountry.
  */
  if (countryNameMap.hasOwnProperty(datasetCountry)) {
    return countryNameMap[datasetCountry];
  }
  return datasetCountry;
}
// UTILITY FUNCTIONS


function WorldMap() {
  /*
  This function configures the world map svg element.
  */
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
      .attr("id", (feature) =>
        feature.properties.name.toLowerCase().replace(/ /g, "_")
      )
      .attr("d", (feature) => pathGenerator(feature))
      .attr("fill", (feature) => {
        // This sets the country colors depending on if the country has data
        const svgCountryName = feature.properties.name.toLowerCase().replace(/ /g, "_");
        const datasetCountryName = getDataSetCountryName(svgCountryName);
        if (countriesWithData.includes(datasetCountryName)) {
          return countriesWithDataColor; // Set color for countries with data
        } else {
          return countriesWithoutDataColor; // Set color for countries without data
        }
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .on("mouseover", function () {
        // This will change the color on hover for countries that have data
        const currentFill = d3.select(this).attr("fill");
        if (currentFill === countriesWithDataColor) {
          d3.select(this).attr("fill", countriesWithDataHoverColor);
        }
      })
      .on("mouseout", function () {
        // This will change the color back to the original for coutries that have data
        const currentFill = d3.select(this).attr("fill");
        if (currentFill === countriesWithDataHoverColor) {
          d3.select(this).attr("fill", countriesWithDataColor);
        }
      })
      .on("click", (event, feature) => {
        // // For testing country name mapping
        // for (let country in countriesInDataset) {
        //   if (countryNameMap.hasOwnProperty(country)) {
        //     country = countryNameMap[country];
        //   }
        //   const countryElement = document.getElementById(country);
        //   if (!countryElement) {
        //     // console.log(country);
        //   }
        // }
        // // For testing country name mapping
        // console.log("czech_republic:", getSvgCountryName("czech_republic"));
        // console.log("canada:", getSvgCountryName("canada"));
        // console.log(
        //   "united_states_of_america:",
        //   getDataSetCountryName("united_states_of_america")
        // );
        // console.log("canada:", getDataSetCountryName("canada"));
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
