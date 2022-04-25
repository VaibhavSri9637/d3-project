import React from "react";

function Svg() {
  return (
    <div className="App">
      <h1>Shapes with SVG and CSS</h1>
      <svg width="960" height="500">
        <circle cx="60" cy="40" r="40"></circle>
        <rect x="120" y="0" height="80" width="80"></rect>
        <g stroke="black">
          <circle
            cx="60"
            cy="160"
            r="40"
            fill="green"
            stroke-width="4"
          ></circle>
          <rect x="120" y="120" height="80" width="80" fill="green"></rect>
        </g>
        <g stroke="black">
          <circle
            cx="60"
            cy="280"
            r="40"
            fill="orange"
            stroke-width="4"
          ></circle>
          <rect x="120" y="240" height="80" width="80" fill="orange"></rect>
        </g>
        <g className="lines">
          <line x1="240" y1="0" x2="340" y2="320"></line>
          <path d="M340 320 L 400 200 L 430 240" fill="none"></path>
        </g>
      </svg>
    </div>
  );
}

export default Svg;
