import React, { useState, useEffect } from "react";
import Countdown from "../shared/Countdown";
import Nav from "../shared/Nav";
import PosterColumn from "./PosterColumn";
import RatingColumn from "./RatingColumn";
import MetaInfo from "./MetaInfo";
import Themes from "./Themes";
import Trailer from "./Trailer";
import ExternalLinks from "./ExternalLinks";
import AnimeDescription from "./AnimeDescription";
import Banner from "./Banner";
import RelatedAnime from "./RelatedAnime";
import Characters from "./Characters";
import Button from "../shared/Button";
//
import SwiperCore, { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import Ribbon from "../shared/Ribbon";

SwiperCore.use([Navigation, Scrollbar, A11y]);

export default function InfoCard({
  data,
  lastPage,
  states,
  onSignIn,
  onSignOut,
  isOnline,
}) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [watchState, setWatchState] = useState(
    states.watchStates.find((item) => item.id == data.id) ? true : false
  );
  const [considerState, setConsiderState] = useState(
    states.considerStates.find((item) => item.id == data.id) ? true : false
  );
  const language = JSON.parse(localStorage.getItem("language")) || "romaji";
  window.addEventListener("resize", debounce(getWindowSize));

  useEffect(() => {
    const id = data.id;
    const episodeNumber = data.nextAiringEpisode
      ? data.nextAiringEpisode.episode
      : null;
    const title = data.title[language];
    if (watchState) {
      //if watching, add to watching state remove from considering state if exists
      const currentlyWatching = states.watchStates.filter(
        (show) => show.id !== id
      );
      const newWatching = [
        ...currentlyWatching,
        { title, id, episodeNumber, status },
      ];
      const currentConsider = states.considerStates.filter(
        (show) => show.id !== id
      );
      states.setConsiderStates(currentConsider);
      states.setWatchStates(newWatching);
    }
    if (considerState) {
      const current = states.considerStates.filter((show) => show.id !== id);
      const newConsider = [...current, { title, id, episodeNumber, status }];
      const currentWatch = states.watchStates.filter((show) => show.id !== id);
      states.setWatchStates(currentWatch);
      states.setConsiderStates(newConsider);
    }
    if (!watchState && !considerState) {
      const stillWatching = states.watchStates.filter((show) => show.id !== id);
      const stillConsidering = states.considerStates.filter(
        (show) => show.id !== id
      );
      states.setWatchStates(stillWatching);
      states.setConsiderStates(stillConsidering);
    }
  }, [watchState, considerState]);

  useEffect(() => {
    console.log("statesupdate");
    setWatchState(
      states.watchStates.find((item) => item.id == data.id) ? true : false
    );
    setConsiderState(
      states.considerStates.find((item) => item.id == data.id) ? true : false
    );
  }, [states.watchStates, states.considerStates]);

  function debounce(func) {
    let timer;
    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 100);
    };
  }
  function getWindowSize() {
    return setInnerWidth(window.innerWidth);
  }

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
    source,
    startDate,
    status,
    studios,
    synonyms,
    tags,
    title,
    trailer,
  } = data;
  const timeouts = [];
  const cd = new Date();
  nextAiringEpisode ? cd.setSeconds(nextAiringEpisode.timeUntilAiring) : null;

  function formatDate(year, month, day) {
    // const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  function describeTags(e, tag) {
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
    e.target.offsetParent.offsetParent.offsetParent.appendChild(boxContainer);
    setTimeout(createRemove, 100);
  }
  function createRemove() {
    const timeout = setTimeout(deleteBox, 4000);
    window.self.addEventListener("click", deleteBox);
    timeouts.push(timeout);
  }
  function deleteBox() {
    clearTimeout(timeouts[0]);
    timeouts.shift();
    window.self.removeEventListener("click", deleteBox);
    const prev = document.querySelector(".hover-container");
    prev.remove();
  }
  return (
    <div>
      <Nav
        lastLocation={`${lastPage}`}
        signInFunc={onSignIn}
        signOutFunc={onSignOut}
        isOnline={isOnline}
      />
      <div className="container main-container">
        <Banner bannerImage={bannerImage} altText={data.title[language]} />
        <div className="card text-dark bg-light ">
          <div className="card-body">
            <h2 className="card-title">{title.romaji || title.english}</h2>
            <h6 className="card-subtitle mb-2 text-muted mb-2">
              {title.english || title.romaji}
            </h6>
            <div className="countdown-container">
              <Countdown
                airingStatus={status}
                airingInfo={nextAiringEpisode}
                cd={cd}
                css={"countdown-show mb-2"}
              />
            </div>
            <div className="row row-poster-meta-info mb-3">
              <Ribbon watch={watchState} consider={considerState} />
              <PosterColumn coverImage={coverImage} title={title} id={id} />
              <RatingColumn
                meanScore={meanScore}
                synonyms={synonyms}
                studios={studios}
                genres={genres}
                formattedDate={formatDate(
                  startDate.year,
                  startDate.month,
                  startDate.day
                )}
              />
            </div>

            <Button
              className={"mb-3"}
              style={"success"}
              action={"watching"}
              airingStatus={watchState}
              set={setWatchState}
              altSet={setConsiderState}
              id={data.id}
            />
            <Button
              className={"mb-3"}
              style={"warning"}
              action={"consider"}
              airingStatus={considerState}
              set={setConsiderState}
              altSet={setWatchState}
              id={data.id}
            />

            <MetaInfo
              format={format}
              source={source}
              episodes={episodes}
              duration={duration}
            />
            <div className="show-info-bottom">
              <div className="anime-description-box">
                <AnimeDescription description={description} />
              </div>
              <Characters
                characters={data.characters.edges}
                Swiper={Swiper}
                SwiperSlide={SwiperSlide}
                innerWidth={innerWidth}
              />
              <RelatedAnime
                relations={data.relations}
                Swiper={Swiper}
                SwiperSlide={SwiperSlide}
              />
              <Themes
                tags={tags}
                describeTags={describeTags}
                Swiper={Swiper}
                SwiperSlide={SwiperSlide}
              />
              <Trailer trailer={trailer} title={title} />
              <ExternalLinks externalLinks={externalLinks} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
