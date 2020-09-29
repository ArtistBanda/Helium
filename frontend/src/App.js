import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";
import Animal from "./components/animal/animal";
import Speed from "./components/speed/speed";
import "./App.css";
import Home from "./components/home/home";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-dark  navDesign">
          <a class="navbar-brand" href="#">
            ACKR
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/speed">
                  Speed
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="/animal">
                  Animal
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <Route exact path="/speed" component={Speed} />
        <Route exact path="/animal" component={Animal} />
        <Route exact path="/" component={Home} />
      </div>
    </BrowserRouter>
  );
}

export default App;
