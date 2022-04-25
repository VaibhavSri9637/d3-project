import React, { useEffect } from "react";
import { select, arc } from "d3";

function D3Face() {
  useEffect(() => {
    const svg = select("svg");
    const height = +svg.attr("height");
    const width = +svg.attr("width");
    const g = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const circle = g
      .append("circle")
      .attr("r", height / 2)
      .attr("fill", "yellow")
      .attr("stroke", "black");

    const eyeSpacing = 100;
    const eyeYOffset = -80;
    const eyeRadius = 30;
    const eyebrowYOffset = -20;
    const eyebrowRaiseDuration = 250;

    const eyesG = g.append("g").attr("transform", `translate(0,${eyeYOffset})`);
    const lefteye = eyesG
      .append("circle")
      .attr("r", eyeRadius)
      .attr("cx", -eyeSpacing);

    const righteye = eyesG
      .append("circle")
      .attr("r", eyeRadius)
      .attr("cx", +eyeSpacing);

    const eyebrowsG = eyesG
      .append("g")
      .attr("transform", `translate(0,${eyebrowYOffset})`);
    eyebrowsG
      .transition()
      .duration(eyebrowRaiseDuration)
      .attr("transform", `translate(0,${eyebrowYOffset - 20})`)
      .transition()
      .duration(eyebrowRaiseDuration)
      .attr("transform", `translate(0,${eyebrowYOffset})`)
      .transition()
      .duration(eyebrowRaiseDuration)
      .attr("transform", `translate(0,${eyebrowYOffset - 20})`)
      .transition()
      .duration(eyebrowRaiseDuration)
      .attr("transform", `translate(0,${eyebrowYOffset})`);

    const leftEyeBrow = eyebrowsG
      .append("path")
      .attr(
        "d",
        arc()({
          innerRadius: 50,
          outerRadius: 60,
          startAngle: -0.7,
          endAngle: 0.7,
        })
      )
      .attr("transform", `translate(${-eyeSpacing},0)`);

    const rightEyeBrow = eyebrowsG
      .append("path")
      .attr(
        "d",
        arc()({
          innerRadius: 50,
          outerRadius: 60,
          startAngle: -0.7,
          endAngle: 0.7,
        })
      )
      .attr("transform", `translate(${eyeSpacing},0)`);

    const mouth = g.append("path").attr(
      "d",
      arc()({
        innerRadius: 140,
        outerRadius: 150,
        startAngle: Math.PI / 2,
        endAngle: (3 * Math.PI) / 2,
      })
    );
  }, []);
  return (
    <div style={{ padding: "3%" }}>
      <h1>Making a face with D3</h1>
      <br />
      <svg width="960" height="500"></svg>
    </div>
  );
}

export default D3Face;
