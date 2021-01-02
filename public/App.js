import "regenerator-runtime/runtime";

import React, { useState } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Parameters from "./Parameters";
import Details from "./Details";

const App = () => {
  const [currLocation, setCurrLocation] = useState("/");
  const [data, setData] = useState([]);
  return (
    <Router>
      <Parameters
        path="/:prevSeasonDashPrevYear/:prevFormat"
        setCurrLocation={setCurrLocation}
        data={data}
        setData={setData}
        currLocation={currLocation}
      />
      <Parameters
        path="/"
        setCurrLocation={setCurrLocation}
        data={data}
        setData={setData}
        currLocation={currLocation}
      />
      <Details path="/details/:id" lastPage={currLocation} lastData={data} />
    </Router>
  );
};
render(<App />, document.getElementById("root"));
