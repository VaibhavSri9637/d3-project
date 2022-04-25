import logo from "./logo.svg";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div style={{ padding: "5%" }}>
      <Link to="/svg">SVG</Link>
      <br />
      <Link to="/d3face">D3Face.js</Link>
      <br />
      <Link to="/d3barchart">D3BarChart.js</Link>
      <br />
      <Link to="/d3scatterchart">D3ScatterChart.js</Link>
      <br />
      <Link to="/d3carsscatterchart">D3CarsScatterChart.js</Link>
    </div>
  );
}

export default App;
