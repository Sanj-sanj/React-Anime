import React from "react";

export default function spinner({ watch }) {
  if (!watch) return null;
  return (
    <div className="loading-area">
      <img
        className="spinner"
        src={require("./imgs/1F63B.svg")}
        alt="Loading spinner"
      />
    </div>
  );
}
