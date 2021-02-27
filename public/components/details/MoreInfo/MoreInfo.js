import React, { useState, useEffect } from "react";
import "./moreInfo.css";
import { formatDate } from "../../../js/formatDates";
//
import Banner from "../Banner/Banner";
import Ribbon from "../../shared/Ribbon/Ribbon";
import Countdown from "../../shared/Countdown/Countdown";
import PosterColumn from "../PosterColumn/PosterColumn";
import RatingColumn from "../RatingColumn/RatingColumn";
import MetaInfo from "../MetaInfo/MetaInfo";
import AnimeDescription from "../AnimeDescription/AnimeDescription";
import Characters from "../Characters/Characters";
import Themes from "../Themes/Themes";
import RelatedAnime from "../RelatedAnime/RelatedAnime";
import Trailer from "../Trailer/Trailer";
import ExternalLinks from "../ExternalLinks/ExternalLinks";
import Button from "../../shared/Button/Button";
import { Swiper, SwiperSlide } from "swiper/react";

export default function MoreInfo({
  data,
  state,
  dispatch,
  LazyLoad,
  language,
}) {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const { watching, considering } = state;
  const {
    bannerImage,
    characters,
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
    relations,
    source,
    startDate,
    status,
    studios,
    synonyms,
    tags,
    trailer,
    isAdult,
  } = data;
  const formattedDate = formatDate(
    startDate.year,
    startDate.month,
    startDate.day
  );
  const title = data.title[language] || data.title.romaji;
  const altTitle = data.title[language == "english" ? "romaji" : "english"];
  const cd = new Date();
  const episodeNumber = nextAiringEpisode?.episode || null;
  nextAiringEpisode ? cd.setSeconds(nextAiringEpisode.timeUntilAiring) : null;

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
  useEffect(() => {
    const listenTo = debounce(getWindowSize);
    window.addEventListener("resize", listenTo);
    return () => {
      window.removeEventListener("resize", listenTo);
    };
  }, []);

  return (
    <div className="container p-0">
      <Banner bannerImage={bannerImage} altText={title} />
      <div className="card text-dark bg-light ">
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <h6 className="card-subtitle mb-2 text-muted mb-2">{altTitle}</h6>
          <div className="details-countdown-container">
            <Countdown
              airingStatus={status}
              airingInfo={nextAiringEpisode}
              cd={cd}
              css={"countdown-show mb-2"}
            />
          </div>
          <div className="row pt-3 mb-3">
            <Ribbon watch={watching} consider={considering} id={id} />
            <PosterColumn coverImage={coverImage} title={title} id={id} />
            <div className="col">
              <RatingColumn
                meanScore={meanScore}
                synonyms={synonyms}
                studios={studios}
                genres={genres}
                formattedDate={formattedDate}
              />
              <div className="col" id="n1">
                <Button
                  className={"mb-3"}
                  style={"success"}
                  action={"watching"}
                  updateState={updateWatching}
                  id={id}
                />
                <Button
                  className={"mb-3"}
                  style={"warning"}
                  action={"consider"}
                  updateState={updateConsider}
                  id={id}
                />
              </div>
            </div>
          </div>
          <div className="col" id="n2">
            <Button
              className={"mb-3"}
              style={"success"}
              action={"watching"}
              updateState={updateWatching}
              id={id}
            />
            <Button
              className={"mb-3"}
              style={"warning"}
              action={"consider"}
              updateState={updateConsider}
              id={id}
            />
          </div>
          <MetaInfo
            format={format}
            source={source}
            episodes={episodes}
            duration={duration}
          />
          <div className="mt-3">
            <AnimeDescription
              description={description}
              innerWidth={innerWidth}
            />
            <Characters
              characters={characters.edges}
              Swiper={Swiper}
              SwiperSlide={SwiperSlide}
              innerWidth={innerWidth}
              LazyLoad={LazyLoad}
            />
            <RelatedAnime
              relations={relations}
              Swiper={Swiper}
              SwiperSlide={SwiperSlide}
              language={language}
              LazyLoad={LazyLoad}
            />
            <Themes
              tags={tags}
              Swiper={Swiper}
              SwiperSlide={SwiperSlide}
              isAdult={isAdult}
            />
            <LazyLoad>
              <Trailer trailer={trailer} title={title} LazyLoad={LazyLoad} />
            </LazyLoad>
            <LazyLoad>
              <ExternalLinks
                externalLinks={externalLinks}
                LazyLoad={LazyLoad}
              />
            </LazyLoad>
          </div>
        </div>
      </div>
    </div>
  );
}
