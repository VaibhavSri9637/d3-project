import React, { useEffect } from "react";
import {
  select,
  csv,
  scaleLinear,
  max,
  scalePoint,
  axisLeft,
  axisBottom,
  format,
} from "d3";

function D3CarsScatterChart() {
  const render = (data) => {
    const svg = select("svg");
    const margin = { left: 150, top: 50, bottom: 80, right: 20 };
    const innerWidth = +svg.attr("width") - margin.left - margin.right;
    const innerHeight = +svg.attr("height") - margin.top - margin.bottom;
    const xValue = (d) => d.population;
    const yValue = (d) => d.country;
    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth])
      .nice();
    const yScale = scalePoint()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);
    const xAxisTickFormat = (number) =>
      format("0.3s")(number).replace("G", "B");
    const xAxis = axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      .tickSize(-innerHeight);
    const yAxis = axisLeft(yScale).tickSize(-innerWidth);
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    g.append("g").call(yAxis).selectAll(".domain").remove();
    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);
    xAxisG
      .append("text")
      .text("Population")
      .attr("fill", "black")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", 50);
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", (d) => yScale(yValue(d)))
      .attr("cx", (d) => xScale(xValue(d)))
      .attr("r", 10);
    g.append("text")
      .text("Top 10 most populous countries")
      .attr("y", -30)
      .attr("class", "title");
  };
  useEffect(() => {
    csv("./resources/PopulationData.csv").then((data) => {
      data.forEach((d) => {
        d.population = +d.population * 1000;
      });
      render(data);
    });
  }, []);
  return (
    <div style={{ padding: "3%" }}>
      <h1>Making a scatter chart with D3</h1>
      <br />
      <svg width="1360" height="500"></svg>
    </div>
  );
}

export default D3CarsScatterChart;
