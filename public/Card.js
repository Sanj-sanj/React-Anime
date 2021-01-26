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
  const [isWatching, setIsWatching] = useState(false);
  const [isConsidering, setIsConsidering] = useState(false);

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
  const status = data.status;
  const officialSite = data.externalLinks.find(
    (obj) => obj.site == "Official Site"
  );

  function airingStatusCheck(data) {
    if (data.status == "FINISHED") return "Finished";
    if (data.status == "NOT_YET_RELEASED")
      return formatEpisodeAirDate(data.startDate);
    if (data.nextAiringEpisode)
      return formatNextAiringEpisodeDate(data.nextAiringEpisode, data.status);
    return "No information";
  }

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
    let date = new Date(year, month - 1, day);
    if (day) {
      return `${days[date.getDay()]} ${months[month - 1]} ${day} ${year}`;
    }
    //!day
    return "No information";
  }

  function formatNextAiringEpisodeDate(nextEp) {
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
    if (isWatching) {
      //if watching, add to watching state remove from considering state if exists
      const currentlyWatching = watching.filter((show) => show.id !== id);
      // console.log(currentlyWatching);
      const newWatching = [
        ...currentlyWatching,
        { title, id, episodeNumber, status },
      ];
      const currentConsider = considering.filter((show) => show.id !== id);
      considerSet(currentConsider);
      watchSet(newWatching);
    }
    if (isConsidering) {
      const current = considering.filter((show) => show.id !== id);
      const newConsider = [...current, { title, id, episodeNumber, status }];
      const currentWatch = watching.filter((show) => show.id !== id);
      watchSet(currentWatch);
      return considerSet(newConsider);
    }
    if (!isWatching && !isConsidering) {
      const stillWatching = watching.filter((show) => {
        return show.id !== id;
      });
      const stillConsidering = considering.filter((show) => {
        return show.id !== id;
      });
      watchSet(stillWatching);
      considerSet(stillConsidering);
    }
  }, [isWatching, isConsidering]);

  useEffect(() => {
    setIsWatching(false);
    setIsConsidering(false);
    watching.forEach((show) => {
      if (show.id != data.id) return;
      show.id == data.id ? setIsWatching(true) : false;
    });
    considering.forEach((show) => {
      if (show.id != data.id) return;
      show.id == data.id ? setIsConsidering(true) : false;
    });
  }, [watching, considering]);

  return (
    <div className="card anime-card mb-3 col-md-4 col-xl-3">
      <h5 className="anime-title">
        <Ribbon watch={isWatching} consider={isConsidering} />
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
            airingStatus={data.status}
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
                  {airingStatusCheck(data)}
                  {/* {data.status == "FINISHED"
                    ? "Finished"
                    : data.status == "NOT_YET_RELEASED" ||
                      !data.nextAiringEpisode
                    ? formatEpisodeAirDate(data.startDate)
                    : formatNextAiringEpisodeDate(
                        data.nextAiringEpisode,
                        data.status
                      )} */}
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
          airingStatus={isWatching}
          set={setIsWatching}
          altSet={setIsConsidering}
          id={data.id}
        />
        <Button
          style={"warning"}
          action={"consider"}
          airingStatus={isConsidering}
          set={setIsConsidering}
          altSet={setIsWatching}
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
