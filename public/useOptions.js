//redundant, merged with header.js

import React, { useState } from "react";

const useOptions = () => {
  const [sort, setSort] = useState("popularity");
  const [titles, setTitles] = useState("english");

  return (
    <div className="options-area">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="sort-prefs">
            Sort by:
          </label>
        </div>
        <select
          className="custom-select"
          name="sort-by"
          id="sort-prefs"
          onChange={(e) => setSort(e.target.value)}
          onBlur={(e) => setSort(e.target.value)}
        >
          <option value="popularity" key="popularity">
            Popularity
          </option>
          <option value="countdown" key="countdown">
            Countdown
          </option>
          <option value="rating" key="rating">
            Rating
          </option>
          <option value="air-date" key="air-date">
            Air date
          </option>
          <option value="user-shows" key="user-shows">
            My Shows
          </option>
        </select>
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="sort-names">
            Titles:
          </label>
        </div>
        <select
          className="custom-select"
          name="sort-by"
          id="sort-names"
          onChange={(e) => setTitles(e.target.value)}
          onBlur={(e) => setTitles(e.target.value)}
        >
          <option value="english" key="english">
            English
          </option>
          <option value="romaji" key="romaji">
            Romanji
          </option>
        </select>
      </div>
    </div>
  );
};
export default useOptions;
