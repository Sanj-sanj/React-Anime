import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Countdown from "./Countdown";
import Button from "./Button";
import Ribbon from "./Ribbon";

export default function Card({
  data,
  language,
  watchSet,
  considerSet,
  watching,
  considering,
}) {
  const [watchState, setWatchState] = useState(false);
  const [considerState, setConsiderState] = useState(false);

  const nextEpCD = new Date();
  const airing = data.nextAiringEpisode
    ? nextEpCD.setSeconds(data.nextAiringEpisode.timeUntilAiring)
    : null;
  const studio = data.studios
    ? data.studios.nodes.find((studio) => studio.isAnimationStudio)
    : "N/A";
  const description = data.description
    ? data.description
    : "No synopsis has been added yet.";
  const altLang = language == "english" ? "romaji" : "english";
  const title = data.title[language] || data.title[altLang];
  const officialSite = data.externalLinks.find(
    (obj) => obj.site == "Official Site"
  );

  function formatEpisodeAirDate({ day, month, year }) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date;
    day ? (date = new Date(`${day}, ${months[month - 1]}, ${year}`)) : false;
    if (day) {
      return `${days[date.getDay()]} ${months[month - 1]} ${day} ${year}`;
    }
    return formatNextAiringEpisodeDate(data.nextAiringEpisode, data.status);
  }

  function formatNextAiringEpisodeDate(nextEp, status) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (status == "FINISHED") {
      return `Finished`;
    }
    if (nextEp == null || nextEp.timeUntilAiring == null) {
      return `No infomation`;
    }
    const nextEpDate = new Date();
    nextEpDate.setSeconds(nextEp.timeUntilAiring);
    let nextEpMinsRounded = Math.ceil(
      nextEpDate.getMinutes() / nextEpDate.getMinutes() +
        nextEpDate.getMinutes()
    ).toFixed(1);
    nextEpMinsRounded.replace(".", "");
    return `${days[nextEpDate.getDay()]} 
    ${months[nextEpDate.getMonth()]} 
    ${nextEpDate.getDate()} ${nextEpDate.getFullYear()} ${nextEpDate.getHours()}:${
      nextEpDate.getMinutes() < 10
        ? "0" + nextEpDate.getMinutes()
        : nextEpDate.getMinutes()
    } `;
  }

  useEffect(() => {
    const id = data.id;
    const episodeNumber = data.nextAiringEpisode
      ? data.nextAiringEpisode.episode
      : null;
    if (watchState) {
      //if watching, add to watching state remove from considering state if exists
      const currentlyWatching = watching.filter((show) => show.id !== id);
      const newWatching = [...currentlyWatching, { title, id, episodeNumber }];
      const currentConsider = considering.filter((show) => show.id !== id);
      considerSet(currentConsider);
      watchSet(newWatching);
    }
    if (considerState) {
      const current = considering.filter((show) => show.id !== id);
      const newConsider = [...current, { title, id, episodeNumber }];
      const currentWatch = watching.filter((show) => show.id !== id);
      watchSet(currentWatch);
      return considerSet(newConsider);
    }
    if (!watchState && !considerState) {
      const stillWatching = watching.filter((show) => {
        return show.id !== id;
      });
      const stillConsidering = considering.filter((show) => {
        return show.id !== id;
      });
      watchSet(stillWatching);
      considerSet(stillConsidering);
    }
  }, [watchState, considerState]);

  useEffect(() => {
    watching.forEach((show) => {
      if (show.id != data.id) return;
      show.id == data.id ? setWatchState(true) : false;
    });
    considering.forEach((show) => {
      if (show.id != data.id) return;
      show.id == data.id ? setConsiderState(true) : false;
    });
  }, []);

  return (
    <div className="card anime-card mb-3 col-md-4 col-xl-3">
      <h5 className="anime-title">
        <Ribbon watch={watchState} consider={considerState} />
        <a
          className="main-title"
          href={officialSite ? officialSite.url : "#"}
          style={{ WebkitBoxOrient: "vertical" }}
          title={title}
        >
          {title}{" "}
        </a>
      </h5>
      <ol className="anime-genre">
        {data.genres.length ? (
          data.genres.map((genre) => (
            <li key={genre} className="text-muted">
              {genre}
            </li>
          ))
        ) : (
          <li className="text-muted">No information</li>
        )}
      </ol>

      <div className="contents">
        <div className="col img-spot">
          <Countdown
            status={data.status}
            airingInfo={data.nextAiringEpisode}
            cd={airing}
          />
          <img
            className="card-img-top anime-cover-image"
            src={data.coverImage.large}
            alt={data.title.english ? data.title.english : data.title.romaji}
            srcSet=""
          />
          <div className="format">
            <div className="format-text-area">
              <span role="img" aria-label="tv-emoji">
                📺
              </span>{" "}
              {data.format.replace("_", " ") || "Anime"}
            </div>
          </div>
          <div className="rating">
            <div className="rating-text-area">
              <span role="img" aria-label="star-emoji">
                ⭐
              </span>{" "}
              {data.meanScore ? (data.meanScore / 10).toFixed(1) : "?"}
            </div>
          </div>
        </div>
        <div className="row no-gutters row-anime-info">
          <div className="anime-info col border-top border-left">
            <div className="meta-container">
              <ul className="list-group list-group-flush">
                <li className="list-group-item company">
                  {studio ? studio.name : "No information"}
                </li>
                <li className="list-group-item date">
                  {data.status == "FINISHED"
                    ? "Finished"
                    : data.status == "NOT_YET_RELEASED" ||
                      !data.nextAiringEpisode
                    ? formatEpisodeAirDate(data.startDate)
                    : formatNextAiringEpisodeDate(
                        data.nextAiringEpisode,
                        data.status
                      )}
                </li>
                <li className="list-group-item meta-data">
                  <div className="source">
                    {data.source ? data.source.replace("_", " ") : "?"}
                  </div>
                  <div className="episodes">
                    {data.episodes ? data.episodes : "12?"} x{" "}
                    {data.duration ? data.duration + " min" : "24 min?"}
                  </div>
                </li>
              </ul>
            </div>
            <div
              className="anime-description"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>
          </div>
        </div>
      </div>
      <ul className="links icons">
        <Button
          style={"success"}
          action={"watching"}
          status={watchState}
          set={setWatchState}
          altSet={setConsiderState}
          id={data.id}
        />
        <Button
          style={"warning"}
          action={"consider"}
          status={considerState}
          set={setConsiderState}
          altSet={setWatchState}
          id={data.id}
        />
        <li className="icon">
          <Link
            className="btn btn-sm btn-outline-info btn-id"
            to={`/details/${data.id}`}
          >
            More info
          </Link>
        </li>
      </ul>
    </div>
  );
}
