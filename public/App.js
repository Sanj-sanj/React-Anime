import "regenerator-runtime/runtime";
import dotenv from "dotenv";
import React, { useEffect, useReducer, useState } from "react";
import { render } from "react-dom";
import { Router, createHistory } from "@reach/router";
import LazyLoad, { forceCheck } from "react-lazyload";
//
import SwiperCore, { Pagination, Navigation, Scrollbar, A11y } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import "swiper/components/pagination/pagination.scss";

import Nav from "./components/shared/Nav/Nav";
import Parameters from "./components/main/Parameters";
import Details from "./components/details/Details";
import Calendar from "./components/calendar/Calendar";
import seasonFunc from "./js/checkSeason";
import reducer from "./js/reducer";
import {
  onSignIn,
  onSignOut,
  readFromDB,
  writeToDB,
} from "./js/firebase/firebase";

SwiperCore.use([Pagination, Navigation, Scrollbar, A11y]);
dotenv.config();

const initial = {
  watching: [],
  considering: [],
  newEpisodes: [],
  isOnline: false,
  currentUser: "",
  data: [],
  calendar: [],
  season: seasonFunc.checkSeason().split(" "),
  format: ["TV", "TV_SHORT"],
};

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
    <React.Fragment>
      <Nav
        signInFunc={onSignIn}
        signOutFunc={onSignOut}
        isOnline={state.isOnline}
        dispatch={dispatch}
      />
      <Router>
        <Parameters
          path="/"
          state={state}
          LazyLoad={LazyLoad}
          forceCheck={forceCheck}
          compareSeasons={seasonFunc.compareSeasons}
          dispatch={dispatch}
        />
        <Details
          path="/details/:id"
          state={state}
          dispatch={dispatch}
          LazyLoad={LazyLoad}
        />
        <Calendar path={"/calendar"} props={{ state, dispatch }} />
      </Router>
    </React.Fragment>
  );
};
render(<App />, document.getElementById("root"));
