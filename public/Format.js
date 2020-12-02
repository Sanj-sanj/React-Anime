import React from "react";
import FormatButton from "./FormatBtns";

export default function format({ changeFormat, activeFormat }) {
  const formats = ["TV", "MOVIE", "OVA"];
  const names = ["Television", "Movie", "OVA"];
  const choices = [];
  choices["TV"] = ["TV", "TV_SHORT"];
  choices["MOVIE"] = ["MOVIE"];
  choices["OVA"] = ["OVA", "ONA"];
  //this if causes two calls to the API, its probably better to set active format to be set properly than set it in this component
  function changeActiveFormat(e) {
    document.querySelector(".f-choice.active").classList.remove("active");
    e.target.parentElement.classList.add("active");
    changeFormat(choices[e.target.value]);
  }
  return (
    <div className="nav format-options">
      <ul className="format-choices">
        {formats.map((format, i) => (
          <FormatButton
            key={format}
            value={choices[format]}
            active={activeFormat}
            name={names[i]}
            change={changeActiveFormat}
          />
        ))}
      </ul>
    </div>
  );
}
