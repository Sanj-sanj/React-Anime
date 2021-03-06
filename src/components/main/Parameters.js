import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState, useEffect, lazy, Suspense, Fragment } from "react";
import LazyLoad, { forceCheck } from "react-lazyload";
import "./parameters.css";

import Season from "./Season/Season";
import Format from "./format/Format";
import SortDropdown from "./SortDropdown/SortDropdown";
import ToggleSortDropdown from "./ToggleDropdown/ToggleDropdown";
import Spinner from "../shared/Spinner/Spinner";
import requestAnimes from "../../js/requestAnimes";
import NewEpisodesModal from "./NewEpisodeModal/NewEpisodeModal";
const Card = lazy(() => import("./card/Card"));
import {
  removeDuplicates,
  compareForNewReleases,
} from "../../js/checkNewEpisodes";
import { sortCards } from "../../js/cards";
import Error from "../shared/Error/Error";

let callAPI = false;

function Parameters({ compareSeasons, dispatch, state }) {
  const [sort, setSort] = useState(
    (() => {
      try {
        return JSON.parse(localStorage.getItem("sort")) || "popularity";
      } catch (error) {
        return false;
      }
    })()
  );
  const [language, setLanguage] = useState(
    (() => {
      try {
        return JSON.parse(localStorage.getItem("language")) || "english";
      } catch (error) {
        return false;
      }
    })()
  );
  const [onGoing, setOnGoing] = useState(
    (() => {
      try {
        return JSON.parse(localStorage.getItem("ongoing")) || "show ongoing";
      } catch (err) {
        return false;
      }
    })()
  );
  const [isFetching, setIsFetching] = useState(true);
  const [rerender, setRerender] = useState(false);

  function fetchData() {
    //call this function to fetch from API via client interaction
    callAPI = true;
    setIsFetching(true);
  }

  useEffect(async () => {
    if (!isFetching) {
      //if were not fetching cancel the api call, and sort the data for good measure.
      dispatch({
        type: "updateData",
        payload: sortCards(state.data, sort, state.season, state.watching),
      });
      return;
    }
    if (!callAPI && state.data.length) {
      //reuse previous state
      callAPI = false;
      setIsFetching(false);
      return;
    }
    let ongoingShows = [];
    localStorage.setItem("ongoing", JSON.stringify(onGoing));
    if (onGoing === "show ongoing" && compareSeasons(state.season)) {
      ongoingShows = await requestAnimes(
        onGoing,
        1,
        [],
        state.format,
        null,
        "queryMain"
      );
    }
    const thisSeasons = await requestAnimes(
      null,
      1,
      [],
      state.format,
      state.season,
      "queryMain"
    ).catch((err) => {
      //do error handling here for bad API requests.
      console.log(err);
    });
    ongoingShows = ongoingShows
      .filter(
        (show) => !thisSeasons.find((seasonShow) => show.id === seasonShow.id)
      )
      .filter((show) => show.popularity >= 100);
    dispatch({
      type: "updateData",
      payload: sortCards(
        removeDuplicates(thisSeasons.concat(ongoingShows)),
        sort,
        state.season,
        state.watching
      ),
    });
    callAPI = false;
    setIsFetching(false);
    if (state.isOnline) {
      //checks on subsequent API calls after initial page load. useEffect = async, therefore state stays behind on first render
      compareForNewReleases(dispatch, state.watching, language);
    }
  }, [isFetching, onGoing]);

  useEffect(() => {
    // console.log(state.watching, sort, state.season, state.data);
    if (!state.data) return;
    dispatch({
      type: "updateData",
      payload: sortCards(state.data, sort, state.season, state.watching),
    });
    forceCheck();
    localStorage.setItem("language", JSON.stringify(language));
    localStorage.setItem("sort", JSON.stringify(sort));
    setRerender(!rerender);
    //dummy state to change for reducer to catchup, otherwise reducer state stays one step behind
  }, [sort, language, state.watching, state.considering]);

  useEffect(() => {
    if (!state.newEpisodes.length) return;
    let newEpisodesModal = document.querySelector("#myModal");
    new Modal(newEpisodesModal).show();
    return () => dispatch({ type: "newEpisodes", payload: new Array(0) });
  }, [state.newEpisodes]);

  useEffect(() => {
    if (!state.data) return;
    //force lazyimg to load on change of sort filter.
    forceCheck();
  }, [state.data]);

  useEffect(() => {
    if (state.isOnline && state.watching.length) {
      //checks on initial signin after watching state have been set
      compareForNewReleases(dispatch, state.watching, language);
    }
  }, [state.isOnline, state.watching]);

  return (
    <Fragment>
      <div className="alert alert-dark">
        <div className="anime-season-area border-dark border-bottom row">
          <Season
            season={state.season}
            dispatch={dispatch}
            fetchData={fetchData}
          />
          <Format
            activeFormat={state.format}
            dispatch={dispatch}
            fetchData={fetchData}
          />
        </div>
      </div>
      <div className="container-fluid anime-container">
        <div className="options-area">
          <SortDropdown
            tag={"prefs"}
            label={"Sort by"}
            valuesArr={[
              "Popularity",
              "Countdown",
              "Rating",
              "Air date",
              "My shows",
              "Season",
            ]}
            set={setSort}
            defaultState={sort}
          />
          <SortDropdown
            tag={"names"}
            label={"Titles"}
            valuesArr={["English", "Romaji"]}
            set={setLanguage}
            defaultState={language}
          />
          <SortDropdown
            tag={"ongoing"}
            label={"Ongoing"}
            valuesArr={["Hide Ongoing", "Show Ongoing"]}
            set={setOnGoing}
            defaultState={onGoing}
            fetchData={fetchData}
          />
          <ToggleSortDropdown />
        </div>
        {/* {row card area className used as quereyselector value in toggleDropdown} */}
        <div className="row row-card-area">
          {isFetching ? (
            <Spinner hasRendered={isFetching} />
          ) : state.data.length ? (
            state.data?.map((data) => (
              <LazyLoad
                key={data.id}
                classNamePrefix="card anime-card mb-3 col-md-4 col-xl-3"
              >
                <Suspense
                  fallback={
                    <span
                      role="img"
                      aria-label="Diamond hands. Apes Strong. Brain Smooth. HOLD."
                    >
                      💎 🤚 🐒 💪 🚀 🌙
                    </span>
                  }
                >
                  <Card
                    key={data.id}
                    data={data}
                    language={language}
                    dispatch={dispatch}
                    watching={state.watching}
                    considering={state.considering}
                    LazyLoad={LazyLoad}
                  />
                </Suspense>
              </LazyLoad>
            ))
          ) : (
            <div>No results...</div>
          )}
        </div>
      </div>
      <NewEpisodesModal shows={state.newEpisodes} language={language} />
    </Fragment>
  );
}

export default function ParametersWithErrorBoundarys(props) {
  return (
    <Error>
      <Parameters {...props} />
    </Error>
  );
}
