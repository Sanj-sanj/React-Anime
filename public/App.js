import "regenerator-runtime/runtime";
import dotenv from "dotenv";
import React, { useEffect, useReducer, useState } from "react";
import { render } from "react-dom";
import { Router, createHistory } from "@reach/router";
import LazyLoad, { forceCheck } from "react-lazyload";

import Parameters from "./components/main/Parameters";
import Details from "./components/details/Details";
import seasonFunc from "./js/checkSeason";
import reducer from "./js/reducer";
import {
  onSignIn,
  onSignOut,
  readFromDB,
  writeToDB,
} from "./js/firebase/firebase";

const initial = {
  watching: [],
  considering: [],
  newEpisodes: [],
  isOnline: false,
  currentUser: "",
  data: [],
  season: seasonFunc.checkSeason().split(" "),
  format: ["TV", "TV_SHORT"],
};
dotenv.config();

const App = () => {
  let history = createHistory(window);
  const reachLocation = history.location;
  const [state, dispatch] = useReducer(reducer, initial);
  const [locState, setLocState] = useState();

  useEffect(() => {
    if (
      reachLocation.state?.key &&
      state.isOnline &&
      locState !== reachLocation.state.key
    ) {
      setLocState(reachLocation.state.key);
      //this reads from db on return from different route.
      console.log("time to read");
      readFromDB(state.currentUser.googleId, dispatch);
    }
  }, [history]);

  useEffect(() => {
    if (state.isOnline) {
      readFromDB(state.currentUser.googleId, dispatch);
    }
  }, [state.isOnline, state.format, state.season]);

  useEffect(() => {
    if (state.isOnline) {
      writeToDB(state.watching, state.considering, state.currentUser.googleId);
    }
  }, [state.watching, state.considering]);

  return (
    <Router>
      <Parameters
        path="/"
        state={state}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        LazyLoad={LazyLoad}
        forceCheck={forceCheck}
        compareSeasons={seasonFunc.compareSeasons}
        dispatch={dispatch}
      />
      <Details
        path="/details/:id"
        state={state}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        dispatch={dispatch}
        LazyLoad={LazyLoad}
      />
    </Router>
  );
};
render(<App />, document.getElementById("root"));
