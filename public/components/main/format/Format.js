import React from "react";
import { Link } from "@reach/router";
import "./format.css";
import FormatButton from "./FormatButton/FormatBtns";

const formats = ["TV", "MOVIE", "OVA"];
const names = ["Television", "Movie", "OVA"];
const choices = [];
choices["TV"] = ["TV", "TV_SHORT"];
choices["MOVIE"] = ["MOVIE"];
choices["OVA"] = ["OVA", "ONA"];

export default function Format({ dispatch, activeFormat, fetchData }) {
  function changeActiveFormat(e) {
    document.querySelector(".f-choice.active").classList.remove("active");
    e.target.parentElement.classList.add("active");
    dispatch({ type: "format", payload: choices[e.target.value] });
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
            fetchData={fetchData}
          />
        ))}
        <li className="f-choice">
          <Link className="f-choice" to={`/calendar`}>
            <button className="btn">Calendar</button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
