import React from "react";

export default function MetaInfo({ format, source, episodes, duration }) {
  return (
    <div className="row meta-info mb-2 border-top border-bottom">
      <div className="info-box">
        <div className="info-label">Format</div>
        <div className="info-value">
          {format
            ? format
                .split("_")
                .map((v) => v.charAt(0) + v.slice(1).toLowerCase())
                .join(" ")
            : "No information"}
        </div>
      </div>
      <div className="info-box">
        <div className="info-label">Source</div>
        <div className="info-value">
          {source
            ? source
                .split("_")
                .map((v) => v.charAt(0) + v.slice(1).toLowerCase())
                .join(" ")
            : "No Information"}
        </div>
      </div>
      <div className="info-box">
        <div className="info-label">Episodes</div>
        <div className="info-value">{episodes || "?"}</div>
      </div>
      <div className="info-box">
        <div className="info-label">Run time</div>
        <div className="info-value">{duration || "?"} min</div>
      </div>
    </div>
  );
}
