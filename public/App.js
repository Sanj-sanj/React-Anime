import "regenerator-runtime/runtime";

import React from "react";
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
  return (
    <Router>
      <Parameters path="/:prevSeasonDashPrevYear/:prevFormat" />
      <Parameters path="/" />
      <Details path="/details/:id" />
    </Router>
  );
};
render(<App />, document.getElementById("root"));
