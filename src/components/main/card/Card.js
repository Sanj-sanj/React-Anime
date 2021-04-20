import React, { Fragment } from "react";
import { Link } from "@reach/router";
import "./card.css";
import {
  formatEpisodeAirDate,
  formatNextAiringEpisodeDate,
} from "../../../js/formatDates";
import Countdown from "../../shared/Countdown/Countdown";
import Button from "../../shared/Button/Button";
import Ribbon from "../../shared/Ribbon/Ribbon";
import CoverImage from "../../shared/CoverImage/CoverImage";

export default function Card({
  data,
  language,
  watching,
  dispatch,
  considering,
  LazyLoad,
}) {
  const altLang = language == "english" ? "romaji" : "english";
  const airing = data.nextAiringEpisode?.airingAt * 1000;

  const {
    id,
    genres,
    nextAiringEpisode,
    startDate,
    status,
    format,
    coverImage,
    meanScore,
    source,
    episodes,
    duration,
  } = data;

  const title = data.title[language] || data.title[altLang];
  const description =
    data.description || "<i>No synopsis has been added yet.</i>";
  const officialSite = data.externalLinks?.find(
    (obj) => obj.site === "Official Site"
  );
  const studio =
    data.studios?.nodes?.find((studio) => studio.isAnimationStudio)?.name ||
    "No information";
  const score = meanScore ? (meanScore / 10).toFixed(1) : "?";
  const episodeNumber = nextAiringEpisode?.episode || null;

  function airingStatusCheck() {
    if (status === "FINISHED") return "Finished";
    if (status === "NOT_YET_RELEASED") return formatEpisodeAirDate(startDate);
    if (nextAiringEpisode)
      return formatNextAiringEpisodeDate(nextAiringEpisode);
    return "No information";
  }

  function updateWatching() {
    return dispatch({
      type: "watching",
      payload: { title, id, episodeNumber, status },
    });
  }
  function updateConsider() {
    return dispatch({
      type: "considering",
      payload: { title, id, episodeNumber, status },
    });
  }

  return (
    <Fragment>
      <div className="anime-title">
        <Ribbon watch={watching} consider={considering} id={id} />
        {/* css WebkitBoxOrient needs to be applied through js else it does not apply */}
        <div className="w-100 main-title-container">
          <a
            className="main-title"
            href={officialSite?.url || "#"}
            style={{ WebkitBoxOrient: "vertical" }}
            title={title}
          >
            {title}{" "}
          </a>
        </div>
      </div>
      <ol className="anime-genre">
        {genres.length ? (
          genres?.map((genre) => (
            <li key={genre} className="text-muted">
              {genre}
            </li>
          ))
        ) : (
          <li className="text-muted">None</li>
        )}
      </ol>

      <div className="d-flex">
        <div className="col img-spot">
          <Countdown
            airingStatus={status}
            airingInfo={nextAiringEpisode}
            airingAt={airing}
          />
          <LazyLoad height={252}>
            <CoverImage
              title={title}
              coverImage={coverImage}
              format={format}
              score={score}
              style="anime-cover-image"
            />{" "}
          </LazyLoad>
        </div>
        <div className="row no-gutters w-100">
          <div className=" anime-info col border-top border-left">
            <div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{studio}</li>
                <li className="list-group-item">{airingStatusCheck(data)}</li>
                <li className="list-group-item meta-info">
                  <div className="w-100">
                    {source?.replace("_", " ") || "N/A"}
                  </div>
                  <div className="w-100">
                    {episodes || "??"} x {(duration || "??") + " min"}
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
      <div className="card-button-sec">
        <Button
          style={"success"}
          action={"watching"}
          updateState={updateWatching}
          id={id}
        />
        <Button
          style={"warning"}
          action={"consider"}
          updateState={updateConsider}
          id={id}
        />
        <div className="interactiveButton">
          <Link
            to={`/details/${id}`}
            className="btn btn-sm btn-outline-info btn-id"
          >
            Details
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
