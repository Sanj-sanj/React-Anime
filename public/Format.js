import React from "react";

export default function format({ changeFormat }) {
  function changeActiveFormat(e) {
    const choices = [];
    choices["TV"] = ["TV", "TV_SHORT"];
    choices["MOVIE"] = ["MOVIE"];
    choices["OVA"] = ["OVA", "ONA"];
    document.querySelector(".f-choice.active").classList.remove("active");
    e.target.parentElement.classList.add("active");
    changeFormat(choices[e.target.value]);
  }
  return (
    <div className="nav format-options">
      <ul className="format-choices">
        <li className="f-choice active">
          <button
            className="btn"
            value={"TV"}
            onClick={(e) => changeActiveFormat(e)}
          >
            Television
          </button>
        </li>
        <li className="f-choice">
          <button
            className="btn"
            value="MOVIE"
            onClick={(e) => changeActiveFormat(e)}
          >
            Movies
          </button>
        </li>
        <li className="f-choice">
          <button
            className="btn"
            value="OVA"
            onClick={(e) => changeActiveFormat(e)}
          >
            OVA
          </button>
        </li>
      </ul>
    </div>
  );
}
