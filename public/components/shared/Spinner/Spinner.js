import React from "react";
import "./spinner.css";

export default function Spinner({ hasRendered }) {
  if (!hasRendered) return null;
  return (
    <div className="loading-area">
      <img
        className="spinner"
        src={require("../../../imgs/1F63B.svg")}
        alt="Loading spinner"
      />
    </div>
  );
}
