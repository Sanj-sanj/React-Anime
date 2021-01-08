import React from "react";
import { Link } from "@reach/router";

export default function navbar({ lastLocation }) {
  lastLocation ? (lastLocation = `${lastLocation}`) : (lastLocation = "/");
  return (
    <div className="navbar navbar-dark bg-dark">
      <h2 className="navbar-text">
        <Link
          to={lastLocation}
          onClick={() => {
            if (lastLocation == "/") {
              window.location.assign("/");
              return;
            }
          }}
        >
          Seasonal Anime
        </Link>
      </h2>
    </div>
  );
}
