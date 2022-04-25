import React, { useEffect } from "react";
import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format,
} from "d3";

function D3BarChart() {
  const render = (data) => {
    const svg = select("svg");
    const margin = { left: 150, top: 50, bottom: 80, right: 20 };
    const innerWidth = +svg.attr("width") - margin.left - margin.right;
    const innerHeight = +svg.attr("height") - margin.top - margin.bottom;
    const xValue = (d) => d.population;
    const yValue = (d) => d.country;
    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth]);
    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);
    const xAxisTickFormat = (number) =>
      format("0.3s")(number).replace("G", "B");
    const xAxis = axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      .tickSize(-innerHeight);
    const yAxis = axisLeft(yScale);
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    g.append("g").call(yAxis).selectAll(".domain,.tick line").remove();
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
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", (d) => yScale(yValue(d)))
      .attr("width", (d) => xScale(xValue(d)))
      .attr("height", yScale.bandwidth());
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
      <h1>Making a bar chart with D3</h1>
      <br />
      <svg width="1360" height="500"></svg>
    </div>
  );
}

export default D3BarChart;
