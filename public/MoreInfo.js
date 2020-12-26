import React, { useEffect, useState } from "react";
import Countdown from "./Countdown";
import Nav from "./Nav";
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
//
import SwiperCore, { Navigation, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/scrollbar/scrollbar.scss";

SwiperCore.use([Navigation, Scrollbar, A11y]);

export default function InfoCard({ data, lastPage }) {
  useEffect(() => {
    console.log(data);
  }, [data]);
  // const [showText, setShowText] = useState(false);
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

  // useEffect(() => {
  //   const desc = document.querySelector(".anime-description");
  //   const buttons = document.querySelector(".toggle-text");
  //   if (desc.clientHeight > 200) {
  //     buttons.classList.remove("hidden");
  //     desc.classList.add("collapsed");
  //   } else {
  //     desc.classList.remove("collapsed");
  //   }
  // }, [showText]);

  return (
    <div>
      <Nav lastLocation={`${lastPage}`} />
      <div className="container main-container">
        <Banner bannerImage={bannerImage} />
        <div className="card text-dark bg-light ">
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
