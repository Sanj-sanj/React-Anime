import "regenerator-runtime/runtime";

import React, { useState } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import Parameters from "./Parameters";
import Details from "./Details";
// import Options from "./useOptions";
// import { Link } from "@reach/router";

/*merge markup in useOtions and header and make one big Header file then 
 *create custom hook to save state of header's season and format options, 
 and another custom hook for sorting and title options. 
 */
const App = () => {
  const [currLocation, setCurrLocation] = useState("/");
  console.log({ "something changed": currLocation });
  return (
    <Router>
      <Parameters
        path="/:prevSeasonDashPrevYear/:prevFormat"
        setCurrLocation={setCurrLocation}
      />
      <Parameters path="/" setCurrLocation={setCurrLocation} />
      <Details path="/details/:id" lastPage={currLocation} />
    </Router>
  );
};
render(<App />, document.getElementById("root"));
