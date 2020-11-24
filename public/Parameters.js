import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import React, { useState, useEffect } from "react";
import querys from "./querys";
import Toggle from "./ToggleDropdown";
import Season from "./Season";
import Format from "./Format";
import SortDropdown from "./SortDropdown";
import checkSeason from "./checkSeason";
import Card from "./Card";
import Modal from "./Modal";
import Spinner from "./Spinner";

export default function body() {
  const [season, setSeason] = useState(checkSeason().split(" "));
  const [format, setFormat] = useState(["TV", "TV_SHORT"]);
  const [sort, setSort] = useState(
    JSON.parse(localStorage.getItem("sort")) || "popularity"
  );
  const [title, setTitles] = useState(
    JSON.parse(localStorage.getItem("title")) || "english"
  );
  const [cards, setCards] = useState([]);
  const [newEpisodes, setNewEpisodes] = useState([]);
  const [watchStates, setWatchStates] = useState(
    JSON.parse(localStorage.getItem("watching")) || []
  );
  const [considerStates, setConsiderStates] = useState(
    JSON.parse(localStorage.getItem("considering")) || []
  );

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

  function sortCards(allCards) {
    //map the state of cards to work with state then set it. otherwise state stays one step behind
    let cloneCards = allCards.map((show) => show);
    console.log("Sort Cards Called");
    const options = [
      "popularity",
      "countdown",
      "rating",
      "air date",
      "my shows",
    ];
    if (sort == options[0]) {
      return cloneCards.sort((a, b) => {
        return b.popularity - a.popularity;
      });
    }
    if (sort == options[1]) {
      return cloneCards
        .filter((item) => (item.nextAiringEpisode ? item : false))
        .sort((a, b) => {
          if (!a.nextAiringEpisode || !b.nextAiringEpisode) return;
          return (
            a.nextAiringEpisode.timeUntilAiring -
            b.nextAiringEpisode.timeUntilAiring
          );
        })
        .concat(cloneCards.filter((show) => !show.nextAiringEpisode));
    }
    if (sort == options[2]) {
      return cloneCards.sort((a, b) => {
        return b.meanScore - a.meanScore;
      });
    }
    if (sort == options[3]) {
      return cloneCards
        .filter((show) => show.startDate.day)
        .sort((a, b) => {
          const altDayA = a.startDate.day ? `${a.startDate.day}` : "00";
          const altMonthA = a.startDate.month ? `${a.startDate.month}` : "00";
          const altYearA = a.startDate.year ? `${a.startDate.year}` : "2021";
          const altDayB = b.startDate.day ? `${b.startDate.day}` : "00";
          const altMonthB = b.startDate.month ? `${b.startDate.month}` : "00";
          const altYearB = b.startDate.year ? `${b.startDate.year}` : "2021";
          return (
            `${altYearA}${altDayA.length < 2 ? "0" + altDayA : altDayA}${
              altMonthA.length < 2 ? "0" + altMonthA : altMonthA
            }` -
            `${altYearB}${altDayB.length < 2 ? "0" + altDayB : altDayB}${
              altMonthB.length < 2 ? "0" + altMonthB : altMonthB
            }`
          );
        })
        .concat(cloneCards.filter((show) => !show.startDate.day));
    }
    if (sort == options[4]) {
      return cloneCards
        .filter((show) => watchStates.find((item) => item.id == show.id))
        .sort((a, b) => {
          if (!a.nextAiringEpisode || !b.nextAiringEpisode) return;
          return (
            a.nextAiringEpisode.timeUntilAiring -
            b.nextAiringEpisode.timeUntilAiring
          );
        })
        .concat(
          cloneCards.filter(
            (show) => !watchStates.some((item) => item.id == show.id)
          )
        );
    }
  }

  function checkForNewReleases() {
    //this useses the state pulled from Card.js to sift through data to find a match in data to update episode numbers
    //this gets called once on initial render, then again as watchStates changes at the end so it works properply.
    const titles = ["english", "romaji"];
    const hasNewEpisodes = watchStates.filter((item) => {
      const [found] = cards.filter((show) => show.id == item.id);
      if (found && !found.nextAiringEpisode) return null;
      if (found && found.nextAiringEpisode.episode > item.episodeNumber) {
        return found;
      }
    });
    if (hasNewEpisodes.length) {
      console.log({ hasNewEpisodes });
      setNewEpisodes(hasNewEpisodes);
      const updatedEpisodes = cards
        .map((card) => {
          if (hasNewEpisodes.find((item) => card.id == item.id)) {
            const episodeNumber = card.nextAiringEpisode.episode;
            const id = card.id;
            const title = card.title[titles[0]] || card.title[titles[1]];
            return { title, id, episodeNumber };
          }
          return null;
        })
        .filter((item) => item)
        .concat(
          watchStates.filter((item) => {
            const [found] = cards.filter((show) => show.id == item.id);
            if (found && found.nextAiringEpisode) {
              if (found.nextAiringEpisode.episode == item.episodeNumber) {
                return found;
              }
              if (!found.nextAiringEpisode) {
                return found;
              }
            }
          })
        );
      console.log({ updatedEpisodes });
      setWatchStates(updatedEpisodes);
    }
  }

  useEffect(() => {
    $("#myModal").modal("show");
  }, [newEpisodes]);

  useEffect(() => {
    console.log("hitting api");
    setCards([]);
    requestAnimes().then((vals) => {
      setCards(sortCards(vals));
    });
  }, [season, format]);

  useEffect(() => {
    setCards(sortCards(cards));
    localStorage.setItem("sort", JSON.stringify(sort));
    localStorage.setItem("title", JSON.stringify(title));
  }, [sort, title]);

  useEffect(() => {
    checkForNewReleases();
    localStorage.setItem("watching", JSON.stringify(watchStates));
    localStorage.setItem("considering", JSON.stringify(considerStates));
  }, [watchStates, considerStates]);

  return (
    <div>
      <div className="alert alert-dark">
        <div className="anime-season-area border-dark border-bottom row">
          <Season season={season} onChange={setSeason} />
          <Format changeFormat={setFormat} />
        </div>
      </div>
      <div className="container-fluid anime-container">
        <div className="options-area">
          <SortDropdown
            tag={"prefs"}
            label={"Sort by"}
            valuesArr={[
              "Popularity",
              "Countdown",
              "Rating",
              "Air date",
              "My shows",
            ]}
            set={setSort}
            defaultState={sort}
          />
          <SortDropdown
            tag={"names"}
            label={"Titles"}
            valuesArr={["English", "Romaji"]}
            set={setTitles}
            defaultState={title}
          />
          <Toggle />
        </div>
        <div className="row row-card-area">
          {!cards || !cards.length ? (
            <Spinner display={cards} />
          ) : (
            cards.map((data) => (
              <Card
                key={data.id}
                data={data}
                language={title}
                watchSet={setWatchStates}
                considerSet={setConsiderStates}
                watching={watchStates}
                considering={considerStates}
              />
            ))
          )}
        </div>
      </div>
      <Modal shows={newEpisodes} />
      <button onClick={() => console.log(cards)}>click</button>
      <button
        onClick={() =>
          cards.forEach((a) => {
            const altDay = a.startDate.day ? `${a.startDate.day}` : "00";
            const altMonth = a.startDate.month ? `${a.startDate.month}` : "00";
            const altYear = a.startDate.year ? `${a.startDate.year}` : "2021";
            // a.startDate.day ? console.log(a.startDate.day.length) : false;

            console.log(
              `${altYear}${altDay.length < 2 ? "0" + altDay : altDay}${
                altMonth.length < 2 ? "0" + altMonth : altMonth
              }`
            );
          })
        }
      >
        click
      </button>
    </div>
  );
}
