import React from "react";
import { Link } from "@reach/router";

export default function navbar(props) {
  let pageLink = props.year
    ? `/${props.season}-${props.year}/${props.format}`
    : "/";
  return (
    <div className="navbar navbar-dark bg-dark">
      <h2 className="navbar-text">
        <Link to={pageLink}>Seasonal Anime</Link>
      </h2>
    </div>
  );
}
