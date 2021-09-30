import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Popular from "./Popular";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
//Router
import { BrowserRouter as Switch, Route } from "react-router-dom";
import Movie from "./components/Movie";
import TopRated from "./TopRated";
import NowPlaying from "./NowPlaying";
import UpComing from "./UpComing";
import SearchMovie from "./components/SearchMovie";
import Watchlist from "./components/WatchList";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/popular">
        <Popular />
      </Route>
      <Route path="/movie/:id">
        <Movie />
      </Route>
      <Route path="/top_rated">
        <TopRated />
      </Route>
      <Route path="/now_playing">
        <NowPlaying />
      </Route>
      <Route path="/upcoming">
        <UpComing />
      </Route>
      <Route path="/search/:name">
        <SearchMovie />
      </Route>
      <Route path="/watchlist">
        <Watchlist />
      </Route>
    </Switch>
  </BrowserRouter>,
  rootElement
);

reportWebVitals();
