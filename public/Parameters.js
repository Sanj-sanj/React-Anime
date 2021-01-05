import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js";
import React, { useState, useEffect } from "react";
import ToggleSortDropdown from "./ToggleDropdown";
import Season from "./Season";
import Format from "./Format";
import SortDropdown from "./SortDropdown";
import seasonFunc from "./checkSeason";
import Card from "./Card";
import NewEpisodesModal from "./NewEpisodeModal";
import Spinner from "./Spinner";
import requestAnimes from "./requestAnimes";
import Nav from "./Nav";
import checkNewEp from "./checkNewEpisodes";

export default function body({
  prevSeasonDashPrevYear,
  prevFormat,
  setCurrLocation,
  data,
  setData,
}) {
  if (prevSeasonDashPrevYear && prevFormat) {
    prevSeasonDashPrevYear = prevSeasonDashPrevYear.split("-");
    const choices = [["TV", "TV_SHORT"], ["MOVIE"], ["OVA", "ONA"]];
    prevFormat = choices.find((arr) => arr.includes(prevFormat.toUpperCase()));
  }

  const [onGoing, setOnGoing] = useState(
    JSON.parse(localStorage.getItem("ongoing")) || "show ongoing"
  );
  const [newEpisodes, setNewEpisodes] = useState([]);
  const [season, setSeason] = useState(
    prevSeasonDashPrevYear || seasonFunc.checkSeason().split(" ")
  );
  const [format, setFormat] = useState(prevFormat || ["TV", "TV_SHORT"]);
  const [sort, setSort] = useState(
    JSON.parse(localStorage.getItem("sort")) || "popularity"
  );
  const [language, setLanguage] = useState(
    JSON.parse(localStorage.getItem("language")) || "english"
  );
  const [watchStates, setWatchStates] = useState(
    JSON.parse(localStorage.getItem("watching")) || []
  );
  const [considerStates, setConsiderStates] = useState(
    JSON.parse(localStorage.getItem("considering")) || []
  );
  const [isFetching, setIsFetching] = useState(true);

  function sortCards(allCards) {
    //map the state of cards to work with state then set it. otherwise state stays one step behind
    let cloneCards = allCards.map((show) => show);
    const options = [
      "popularity",
      "countdown",
      "rating",
      "air date",
      "my shows",
      "season",
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
            `${altYearA}${altMonthA.length < 2 ? "0" + altMonthA : altMonthA}${
              altDayA.length < 2 ? "0" + altDayA : altDayA
            }` -
            `${altYearB}${altMonthB.length < 2 ? "0" + altMonthB : altMonthB}${
              altDayB.length < 2 ? "0" + altDayB : altDayB
            }`
          );
        })
        .concat(cloneCards.filter((show) => !show.startDate.day));
    }
    if (sort == options[4]) {
      return cloneCards
        .filter((show) => watchStates.find((item) => item.id == show.id))
        .filter((show) => show.nextAiringEpisode)
        .sort((a, b) => {
          if (!a.nextAiringEpisode || !b.nextAiringEpisode) return;
          return (
            a.nextAiringEpisode.timeUntilAiring -
            b.nextAiringEpisode.timeUntilAiring
          );
        })
        .concat(
          cloneCards
            .filter((show) => watchStates.find((item) => item.id == show.id))
            .filter((show) => !show.nextAiringEpisode)
        )
        .concat(
          cloneCards.filter(
            (show) => !watchStates.find((item) => item.id == show.id)
          )
        );
    }
    if (sort == options[5]) {
      let thisSeasons = cloneCards
        .filter((show) => show.season || show.startDate.year) //find anything that started last year but is supposed to be of the new years season
        .filter(
          (show) =>
            show.startDate.month == 12 &&
            show.startDate.year == season[1] - 1 &&
            show.season == season[0].toUpperCase()
        )
        .concat(
          cloneCards
            .filter((show) => show.season || show.startDate.year)
            .filter(
              (show) =>
                show.season == season[0].toUpperCase() &&
                show.startDate.year == season[1] &&
                show.nextAiringEpisode
            )
        )
        .sort((a, b) => {
          return (
            a.nextAiringEpisode.timeUntilAiring -
            b.nextAiringEpisode.timeUntilAiring
          );
        })
        .concat(
          cloneCards.filter(
            (show) =>
              show.startDate.year == season[1] &&
              show.season == season[0].toUpperCase() &&
              !show.nextAiringEpisode
          )
        );
      return thisSeasons.concat(
        cloneCards.filter(
          (show) =>
            !thisSeasons.find((currSeasonShow) => currSeasonShow.id == show.id)
        )
      );
    }
  }

  function updateNewEpisodes(arrOfNewShows) {
    const unaffectedShows = watchStates.filter(
      (show) => !arrOfNewShows.find((newEp) => show.id == newEp.id)
    );
    let updated = unaffectedShows.concat(
      arrOfNewShows.map((show) => {
        const episodeNumber = show.nextAiringEpisode
          ? show.nextAiringEpisode.episode
          : null;
        const id = show.id;
        const title = show.title[language];
        const status = show.status;
        return { title, id, episodeNumber, status };
      })
    );
    return updated;
  }

  async function checkForNewReleases() {
    console.log("checking for new releases");
    const episodesForQuery = watchStates
      .filter(
        (item) =>
          item.status == "RELEASING" || item.status == "NOT_YET_RELEASED"
      )
      .map((item) => item.id);
    const response = await checkNewEp(episodesForQuery);

    const hasNewEpisodes = response.filter((latestShowInfo) => {
      const sameShow = watchStates.find((show) => latestShowInfo.id == show.id);
      if (!sameShow) return;
      if (
        sameShow.status == "NOT_YET_RELEASED" &&
        latestShowInfo.status == "RELEASING"
      ) {
        //first ep aired
        return sameShow;
      }
      if (
        sameShow.status == "RELEASING" &&
        latestShowInfo.status == "FINISHED"
      ) {
        //show finale aired
        return sameShow;
      }
      if (
        sameShow.status == "RELEASING" &&
        sameShow.episodeNumber < latestShowInfo.nextAiringEpisode.episode
      ) {
        //new ep, show is still ongoing

        return sameShow;
      }
    });
    // console.log(hasNewEpisodes);

    if (hasNewEpisodes.length) {
      setNewEpisodes(hasNewEpisodes);
      setWatchStates(updateNewEpisodes(hasNewEpisodes));
    }
  }

  useEffect(async () => {
    setData([]);
    setIsFetching(true);

    if (prevSeasonDashPrevYear && prevFormat && data.length) {
      if (
        prevSeasonDashPrevYear[0] == season[0] &&
        prevFormat[0] == format[0]
      ) {
        //this is the time we reuse our previous API result
        setData(data);
        setIsFetching(false);
        checkForNewReleases();
        return;
      }
    }

    let ongoingShows = [];
    localStorage.setItem("ongoing", JSON.stringify(onGoing));
    setCurrLocation(`/${season.join("-")}/${format[0]}`.toLowerCase());
    console.log("hitting api");
    if (onGoing == "show ongoing" && seasonFunc.compareSeasons(season)) {
      ongoingShows = await requestAnimes(onGoing, 1, [], format).then(
        (vals) => vals
      );
    }
    const thisSeasons = await requestAnimes(null, 1, [], format, season).then(
      (vals) => vals
    );
    setData(
      sortCards(
        thisSeasons.concat(
          ongoingShows
            .filter(
              (show) =>
                !thisSeasons.find((seasonShow) => show.id == seasonShow.id)
            )
            .filter((show) => show.popularity >= 100)
        )
      )
    );
    checkForNewReleases();
    setIsFetching(false);
  }, [season, format, onGoing]);

  useEffect(() => {
    setData(sortCards(data));
    localStorage.setItem("language", JSON.stringify(language));
    localStorage.setItem("sort", JSON.stringify(sort));
  }, [sort, language]);

  useEffect(() => {
    localStorage.setItem("watching", JSON.stringify(watchStates));
    localStorage.setItem("considering", JSON.stringify(considerStates));
  }, [watchStates, considerStates]);

  useEffect(() => {
    if (!newEpisodes.length) return;
    let newEpisodesModal = document.querySelector("#myModal");
    new Modal(newEpisodesModal).show();
  }, [newEpisodes]);

  return (
    <div>
      <Nav lastLocation={"/"} />
      <div className="alert alert-dark">
        <div className="anime-season-area border-dark border-bottom row">
          <Season season={season} onChange={setSeason} />
          <Format changeFormat={setFormat} activeFormat={format} />
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
              "Season",
            ]}
            set={setSort}
            defaultState={sort}
          />
          <SortDropdown
            tag={"names"}
            label={"Titles"}
            valuesArr={["English", "Romaji"]}
            set={setLanguage}
            defaultState={language}
          />
          <SortDropdown
            tag={"ongoing"}
            label={"Ongoing"}
            valuesArr={["Hide Ongoing", "Show Ongoing"]}
            set={setOnGoing}
            defaultState={onGoing}
          />
          <ToggleSortDropdown />
        </div>
        <div className="row row-card-area">
          {data.map((data) => (
            <Card
              key={data.id}
              data={data}
              language={language}
              watchSet={setWatchStates}
              considerSet={setConsiderStates}
              watching={watchStates}
              considering={considerStates}
            />
          ))}
        </div>
        <Spinner hasRendered={isFetching} />
      </div>
      <NewEpisodesModal shows={newEpisodes} language={language} />
    </div>
  );
}
