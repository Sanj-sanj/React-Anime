import React from "react";
import "./metaInfo.css";

export default function MetaInfo({ format, source, episodes, duration }) {
  return (
    <div className="row meta-data mb-2 border-top border-bottom">
      <div>
        <div>Format</div>
        <div>
          {format
            ? format
                .split("_")
                .map((v) => v.charAt(0) + v.slice(1).toLowerCase())
                .join(" ")
            : "No information"}
        </div>
      </div>
      <div>
        <div>Source</div>
        <div>
          {source
            ? source
                .split("_")
                .map((v) => v.charAt(0) + v.slice(1).toLowerCase())
                .join(" ")
            : "No Information"}
        </div>
      </div>
      <div>
        <div>Episodes</div>
        <div>{episodes || "?"}</div>
      </div>
      <div>
        <div>Run time</div>
        <div>{duration || "?"} min</div>
      </div>
    </div>
  );
}
