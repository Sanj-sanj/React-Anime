import React from "react";
import { render } from "react-dom";
import Nav from "./Nav";
import Parameters from "./Parameters";
// import Options from "./useOptions";
// import { Link } from "@reach/router";

/*merge markup in useOtions and header and make one big Header file then 
 *create custom hook to save state of header's season and format options, 
 and another custom hook for sorting and title options. 
 */
const App = () => {
  return (
    <div>
      <Nav />
      <Parameters />
      <div className="loading-area">
        <img
          className="spinner"
          src={require("./imgs/1F63B.svg")}
          alt="Loading spinner"
        />
      </div>
    </div>
  );
};
render(<App />, document.getElementById("root"));
