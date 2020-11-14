import React from "react";
import Timer from "./counter";
import Countdown from "./Countdown";
// const t = Timer();

export default function Results({ data }) {
  const studio = data.studios
    ? data.studios.nodes.find((studio) => studio.isAnimationStudio)
    : "N/A";
  const description = data.description
    ? data.description
    : "No synopsis has been added yet.";

  function formatNextEpisodeDate(nextEp, status) {
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
    return `${days[nextEpDate.getDay()]} ${
      months[nextEpDate.getMonth()]
    } ${nextEpDate.getDate()} ${nextEpDate.getFullYear()} ${nextEpDate.getHours()}:${
      nextEpDate.getMinutes() < 10
        ? "0" + nextEpDate.getMinutes()
        : nextEpDate.getMinutes()
    } `;
  }

  return (
    <div className="card anime-card mb-3 col-md-4 col-xl-3" data-id={data.id}>
      <h5 className="anime-title">
        <a className="main-title" href={data.siteUrl}>
          {data.title.english ? data.title.english : data.title.romaji}{" "}
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
          <Countdown data={[data.status, data.nextAiringEpisode]} />
          {/* <time className="countdown">
            {data.status == "FINISHED"
              ? "Finished!"
              : data.nextAiringEpisode
              ? `Ep ${data.nextAiringEpisode.episode} ${Timer(
                  data.nextAiringEpisode.timeUntilAiring
                )} `
              : "No information"}{" "}
            <span></span>
          </time> */}
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
            <div
              className="meta-container"
              data-popularity={data.popularity}
              data-score={data.meanScore}
              //   data-cd={data.nextAiringEpisode.timeUntilAiring || data.status}
              data-start={`${data.startDate.year} ${data.startDate.month - 1} ${
                data.startDate.day
              }`}
            >
              <ul className="list-group list-group-flush">
                <li className="list-group-item company">
                  {studio ? studio.name : "No information"}
                </li>
                <li className="list-group-item date">
                  {data.status == "FINISHED"
                    ? "Finished"
                    : formatNextEpisodeDate(
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
        <li className="icon">
          <button className="btn btn-sm btn-outline-success btn-watching">
            Watching
          </button>
        </li>
        <li className="icon">
          <button className="btn btn-sm btn-outline-warning btn-consider">
            Considering
          </button>
        </li>
        <li className="icon">
          <button className="btn btn-sm btn-outline-info btn-id">
            More info
          </button>
        </li>
      </ul>
    </div>
  );
}
