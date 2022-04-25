import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Svg from "./components/Svg";
import D3Face from "./components/D3Face";
import D3BarChart from "./components/D3BarChart";
import D3ScatterChart from "./components/D3ScatterChart";
import D3CarsScatterChart from "./components/D3CarsScatterChart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={(props) => <App {...props} />}></Route>
        <Route path="/svg" component={(props) => <Svg {...props} />}></Route>
        <Route
          path="/d3face"
          component={(props) => <D3Face {...props} />}
        ></Route>
        <Route
          path="/d3barchart"
          component={(props) => <D3BarChart {...props} />}
        ></Route>
        <Route
          path="/d3scatterchart"
          component={(props) => <D3ScatterChart {...props} />}
        ></Route>
        <Route
          path="/d3carsscatterchart"
          component={(props) => <D3CarsScatterChart {...props} />}
        ></Route>
      </Switch>
    </div>
  </BrowserRouter>
);
