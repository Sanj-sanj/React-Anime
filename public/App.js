import "regenerator-runtime/runtime";

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Parameters from "./Parameters";
import Details from "./Details";

const App = () => {
  const [currLocation, setCurrLocation] = useState("/");
  const [data, setData] = useState([]);
  const [watchStates, setWatchStates] = useState(
    JSON.parse(localStorage.getItem("watching")) || []
  );
  const [considerStates, setConsiderStates] = useState(
    JSON.parse(localStorage.getItem("considering")) || []
  );

  useEffect(() => {
    localStorage.setItem("watching", JSON.stringify(watchStates));
    localStorage.setItem("considering", JSON.stringify(considerStates));
  }, [watchStates, considerStates]);

  return (
    <Router>
      <Parameters
        path="/:prevSeasonDashPrevYear/:prevFormat"
        setCurrLocation={setCurrLocation}
        data={data}
        setData={setData}
        currLocation={currLocation}
        watchStates={watchStates}
        setWatchStates={setWatchStates}
        considerStates={considerStates}
        setConsiderStates={setConsiderStates}
      />
      <Parameters
        path="/"
        setCurrLocation={setCurrLocation}
        data={data}
        setData={setData}
        currLocation={currLocation}
        watchStates={watchStates}
        setWatchStates={setWatchStates}
        considerStates={considerStates}
        setConsiderStates={setConsiderStates}
      />
      <Details
        path="/details/:id"
        lastPage={currLocation}
        lastData={data}
        states={{
          watchStates,
          considerStates,
          setWatchStates,
          setConsiderStates,
        }}
      />
    </Router>
  );
};
render(<App />, document.getElementById("root"));
