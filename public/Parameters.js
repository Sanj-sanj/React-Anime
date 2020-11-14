import React, { useState, useEffect } from "react";
import querys from "./querys";
import Dropdown from "./ToggleDropdown";
import checkSeason from "./checkSeason";
import Card from "./Card";

export default function header() {
  const [season, setSeason] = useState(checkSeason().split(" "));
  const [format, setFormat] = useState(["TV", "TV_SHORT"]);
  const [sort, setSort] = useState("popularity");
  const [title, setTitles] = useState("english");
  const [cards, setCards] = useState([]);

  async function requestAnimes(nextPage = 1, acc = []) {
    const variables = {
      // id: 112124,
      isAdult: false,
      page: nextPage,
      perPage: 50,
      format_in: format == "TV" ? ["TV", "TV_SHORT"] : format, //defaults to TV series
      season: season[0].toUpperCase(),
      seasonYear: season[1],
    };

    const url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: querys.queryMain,
          variables: variables,
        }),
      };

    const response = await fetch(url, options);
    const json = await response.json();
    if (!response.ok) return Promise.reject(json);
    if (!json.data.Page.pageInfo.hasNextPage) {
      return acc.concat(json.data.Page.media);
    }
    return requestAnimes(
      json.data.Page.pageInfo.currentPage + 1,
      acc.concat(json.data.Page.media)
    );
  }

  function changeSeason(change) {
    const currSeason = season;
    return setSeason(checkSeason(...currSeason, change).split(" "));
    // timer.resetTimer()
  }
  function changeActiveFormat(e) {
    const choices = [];
    choices["TV"] = ["TV", "TV_SHORT"];
    choices["MOVIE"] = ["MOVIE"];
    choices["OVA"] = ["OVA", "ONA"];
    document.querySelector(".f-choice.active").classList.remove("active");
    e.target.parentElement.classList.add("active");
    setFormat(choices[e.target.value]);
  }

  useEffect(() => {
    requestAnimes().then((vals) => {
      setCards(vals);
    });
  }, [season, format]);

  return (
    <div>
      <div className="alert alert-dark">
        <div className="anime-season-area border-dark border-bottom row">
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
            <h2 className="anime-season-header">{season.join(" ")}</h2>
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
        </div>
      </div>
      <div className="container-fluid anime-container">
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
                Romaji
              </option>
            </select>
          </div>
          <Dropdown />
        </div>
        <div className="row row-card-area">
          {cards.length == 0 ? (
            <h1>Nothing found</h1>
          ) : (
            cards.map((data) => <Card key={data.id} data={data} />)
          )}
        </div>
      </div>
      <button onClick={requestAnimes}>click</button>
      <button onClick={() => console.log(cards)}>click</button>
    </div>
  );
}
