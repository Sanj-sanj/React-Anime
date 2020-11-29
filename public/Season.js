import React from "react";
import checkSeason from "./checkSeason";

export default function seasonHeader({ season, onChange }) {
  // console.log(season);
  function changeSeason(change) {
    return onChange(checkSeason(...season.split(" "), change).split(" "));
  }
  season = season.join(" ");
  season = season.charAt(0).toUpperCase() + season.slice(1).toLowerCase();

  return (
    <form className="season-selection">
      <button
        className="btn change-season"
        type="button"
        onClick={() => changeSeason("down")}
      >
        <svg
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
          className="bi bi-caret-left-fill"
          fill="#4d94e2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
        </svg>
      </button>
      <h2 className="anime-season-header">{season}</h2>
      <button
        className="btn change-season"
        type="button"
        onClick={() => changeSeason("up")}
      >
        <svg
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
          className="bi bi-caret-right-fill"
          fill="#4d94e2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
        </svg>
      </button>
    </form>
  );
}
