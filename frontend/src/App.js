import React from "react";
import logo from "./logo.svg";
import "./App.css";

import Home from "./pages/home";

import Router from "./router";

import CssBaseline from "@material-ui/core/CssBaseline";
function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Router />
    </React.Fragment>
  );
}

export default App;
