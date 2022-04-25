import React, { useEffect } from "react";
import {
  select,
  csv,
  scaleLinear,
  extent,
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
    const circleRadius = 3;
    const xAxisLabel = "Horsepower";
    const yAxisLabel = "Weight";
    const title = "Cars: Horsepower vs Weight";
    const xValue = (d) => d.horsepower;
    const yValue = (d) => d.weight;
    const xScale = scaleLinear()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();
    const yScale = scaleLinear()
      .domain(extent(data, yValue))
      .range([0, innerHeight])
      .nice();
    const xAxisTickFormat = (number) =>
      format("0.3s")(number).replace("G", "B");
    const xAxis = axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      .tickSize(-innerHeight)
      .tickPadding(10);
    const yAxis = axisLeft(yScale).tickSize(-innerWidth);
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const yAxisG = g.append("g").call(yAxis);
    yAxisG.selectAll(".domain").remove();
    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0,${innerHeight})`);
    yAxisG
      .append("text")
      .text(yAxisLabel)
      .attr("fill", "black")
      .attr("class", "axis-label")
      .attr("x", -innerHeight / 2)
      .attr("y", -60)
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`);
    xAxisG
      .append("text")
      .text(xAxisLabel)
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
      .attr("r", circleRadius);
    g.append("text").text(title).attr("y", -30).attr("class", "title");
  };
  useEffect(() => {
    csv("https://vizhub.com/curran/datasets/auto-mpg.csv").then((data) => {
      data.forEach((d) => {
        d.mpg = +d.mpg;
        d.cylinders = +d.cylinders;
        d.displacement = +d.displacement;
        d.horsepower = +d.horsepower;
        d.weight = +d.weight;
        d.acceleration = +d.acceleration;
        d.year = +d.year;
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
