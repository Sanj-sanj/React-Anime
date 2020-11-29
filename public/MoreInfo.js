import React, { useEffect, useState } from "react";
import Countdown from "./Countdown";
import Nav from "./Nav";

export default function InfoCard({ props }) {
  console.log(props);
  const [showText, setShowText] = useState(false);

  function formatDate(year, month, day) {
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
    return `${months[month - 1] || "?"} ${day || "?"} ${year || "?"}`;
  }
  const timeouts = [];
  function describeTags(e, tag) {
    console.log(e);
    const prev = document.querySelector(".alert.alert-info");
    if (prev) {
      deleteBox();
    }
    const boxContainer = document.createElement("div");
    boxContainer.className = "hover-container";
    const box = document.createElement("div");
    box.className = "alert alert-info";
    box.textContent = tag.description;
    boxContainer.appendChild(box);
    e.target.parentElement.appendChild(boxContainer);
    setTimeout(createRemove, 100);
  }
  function createRemove() {
    const timeout = setTimeout(deleteBox, 3000);
    window.self.addEventListener("click", deleteBox);
    timeouts.push(timeout);
  }
  function deleteBox() {
    clearTimeout(timeouts[0]);
    timeouts.shift();
    window.self.removeEventListener("click", deleteBox);
    const prev = document.querySelector(".alert.alert-info");
    prev.remove();
  }

  useEffect(() => {
    const desc = document.querySelector(".anime-description");
    const buttons = document.querySelector(".toggle-text");
    console.log("working");
    if (desc.clientHeight > 200) {
      buttons.classList.remove("hidden");
      desc.classList.add("collapsed");
    } else {
      console.log(">200");

      desc.classList.remove("collapsed");
    }
  }, [showText]);

  const externals = [
    { ["Official Site"]: "site_ico" },
    { ["Twitter"]: "twt_ico" },
    { ["Crunchyroll"]: "crn_ico" },
    { ["VRV"]: "vrv_ico" },
    { ["Funimation"]: "funi_ico" },
    { ["Hulu"]: "hulu_ico" },
    { ["Youtube"]: "ytb_ico" },
    { ["AnimeLab"]: "alab_ico" },
    { ["Hidive"]: "hidive_ico" },
  ];

  const {
    bannerImage,
    coverImage,
    description,
    duration,
    episodes,
    externalLinks,
    format,
    genres,
    id,
    meanScore,
    nextAiringEpisode,
    popularity,
    season,
    siteUrl,
    source,
    startDate,
    status,
    studios,
    synonyms,
    tags,
    title,
    trailer,
  } = props;
  console.log(format, startDate);
  const cd = new Date();
  nextAiringEpisode ? cd.setSeconds(nextAiringEpisode.timeUntilAiring) : null;
  return (
    <div>
      <Nav season={season} year={startDate.year} format={format} />
      <div className="container main-container">
        <div className="banner-area">
          <img
            className="title-banner border "
            src={bannerImage || require("./imgs/d_banner.png")}
            alt="anime title"
          />
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="card-title">{title.romaji || title.english}</h2>
            <h6 className="card-subtitle mb-2 text-muted mb-2">
              {title.english || title.romaji}
            </h6>
            <div className="countdown-container">
              <Countdown
                status={status}
                airingInfo={nextAiringEpisode}
                cd={cd}
                css={"countdown-show mb-2"}
              />
            </div>
            <div className="row row-poster-meta-info mb-3">
              <div className="col poster">
                <div className="anime-poster-area">
                  <img
                    className="anime-poster border border-dark"
                    src={coverImage.large}
                    alt="${title.romaji}"
                  />
                </div>
                <span className="library-position border border-top-0 border-primary">
                  Watch
                </span>
              </div>
              <div className="meta-tags-box col">
                <div className="rating-box ">
                  <div className="rating-title">Rating</div>
                  <div className="show-rating border border-top-0 border-dark">
                    {meanScore}
                  </div>
                  <div className="premiered small">
                    Premiere :{" "}
                    {formatDate(startDate.year, startDate.month, startDate.day)}
                  </div>
                  <div className="synonym">
                    {<i>{synonyms.find((el) => el.length < 30) || ""}</i>}
                  </div>
                  <div className="studio">
                    {!studios.nodes
                      ? "No studio"
                      : studios.nodes.find((studio) => studio.isAnimationStudio)
                      ? studios.nodes.find((studio) => studio.isAnimationStudio)
                          .name
                      : "No information"}
                  </div>

                  <div className="tags">
                    <ul className="genres">
                      {genres.map((genre) => (
                        <li key={genre}>{genre}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row meta-info mb-2 border-top border-bottom">
              <div className="info-box">
                <div className="info-label">Format</div>
                <div className="info-value">
                  {format
                    .split("_")
                    .map((v) => v.charAt(0) + v.slice(1).toLowerCase())
                    .join(" ")}
                </div>
              </div>
              <div className="info-box">
                <div className="info-label">Source</div>
                <div className="info-value">
                  {source
                    .split("_")
                    .map((v) => v.charAt(0) + v.slice(1).toLowerCase())
                    .join(" ")}
                </div>
              </div>
              <div className="info-box">
                <div className="info-label">Episodes</div>
                <div className="info-value">{episodes}</div>
              </div>
              <div className="info-box">
                <div className="info-label">Run time</div>
                <div className="info-value">{duration} min</div>
              </div>
            </div>
            <div className="row show-info-bottom">
              <div className="col anime-description-box">
                <div
                  className=" anime-description mb-3"
                  dangerouslySetInnerHTML={{ __html: description }}
                />

                <div className="toggle-text mb-3 hidden">
                  <button
                    className="btn btn-sm btn-show-txt"
                    onClick={() => setShowText(!showText)}
                  >
                    SHOW MORE
                  </button>
                  <button
                    className="btn btn-sm btn-show-txt hidden"
                    onClick={() => setShowText(!showText)}
                  >
                    SHOW LESS
                  </button>
                </div>

                <div className="border-top theme-container">
                  <h4 className="card-title">Themes:</h4>
                  <div className="related-tags">
                    <ul className="tags-section">
                      {tags
                        ? tags.map((tag) => {
                            if (
                              tag.isGeneralSpoiler ||
                              tag.isMediaSpoiler ||
                              tag.isAdult
                            ) {
                              return "";
                            }
                            return (
                              <li
                                key={tag.id}
                                className=""
                                title={tag.description}
                              >
                                <button
                                  className={"btn tag"}
                                  onClick={(e) => describeTags(e, tag)}
                                >
                                  {" "}
                                  {tag.name}
                                </button>
                              </li>
                            );
                          })
                        : "There seems to be nothing here."}
                    </ul>
                  </div>
                </div>

                <div className="trailer-box border-top border-bottom mb-3">
                  <h4 className="card-title trailer-header">Trailer</h4>
                  <div className="yt-prev">
                    {trailer ? (
                      <a
                        href={
                          trailer.site == "youtube"
                            ? `https://www.youtube.com/watch?v=${trailer.id}`
                            : "/"
                        }
                      >
                        <img
                          className="yt-thumb"
                          src={trailer.thumbnail ? trailer.thumbnail : ""}
                          alt={`Trailer for ${title.romaji}`}
                        ></img>
                      </a>
                    ) : (
                      "No trailer found."
                    )}
                  </div>
                </div>

                <div className="external-links">
                  <h5 className="card-title external-links-title">
                    External links
                  </h5>
                  <ul className="links-section">
                    {externalLinks
                      ? externalLinks.map((link) => {
                          let found;
                          externals.forEach((entry) =>
                            Object.prototype.hasOwnProperty.call(
                              entry,
                              link.site
                            ) == true
                              ? (found = entry)
                              : false
                          );
                          if (found) {
                            return (
                              <li key={link.id}>
                                <a
                                  className={found[link.site]}
                                  title={link.site}
                                  href={link.url}
                                >
                                  #
                                </a>
                              </li>
                            );
                          }
                        })
                      : "No links found."}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
