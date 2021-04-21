import React from "react";
import { Link } from "@reach/router";
import { Swiper, SwiperSlide } from "swiper/react";
import CoverImage from "../../shared/CoverImage/CoverImage";
import Countdown from "../../shared/Countdown/Countdown";
import "../../shared/Countdown/countdown.css";
import { slidesToDisplayCalendar } from "../../../js/slidesToDisplay";
import "./DailyCalendarCard.css";
import DailyHeader from "./DailyHeader/DailyHeader";

const language = (() => {
  try {
    return JSON.parse(localStorage.getItem("language")) ?? "romaji";
  } catch (err) {
    return false;
  }
})();

export default class DailyCalendarCard extends React.Component {
  state = { innerWidth: window.innerWidth, listener: null };

  componentDidMount() {
    function debounce(func) {
      //this context dont matter here
      let timer;
      return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 100);
      };
    }
    const getWindowSize = () => {
      return this.setState({ innerWidth: window.innerWidth });
    };
    const listenTo = debounce(getWindowSize);
    //store to state to remove later on
    this.setState({ listener: listenTo });
    window.addEventListener("resize", listenTo);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.state.listener);
  }

  render() {
    const { dateStringsArray, filteredShowArrays } = this.props;
    //loop through each 'dateString' (0-6), build the calendarContainer title,
    //loop through filteredShowArrays (0-6)at the postion of first loops i,
    //and output that as calendarContainer items.
    return (
      <React.Fragment>
        {dateStringsArray.map((dateString, i) => {
          return (
            <div
              className="card-body pb-0 d-flex calendar-date-container"
              key={dateString}
            >
              <DailyHeader dateString={dateString} />
              <div className="row my-0 mx-3 w-100 calendar-items-container">
                {filteredShowArrays[i].length ? (
                  <Swiper
                    slidesPerView={slidesToDisplayCalendar(
                      filteredShowArrays[i],
                      this.state.innerWidth
                    )}
                    spaceBetween={1}
                    pagination={{ clickable: true }}
                    className="w-100"
                  >
                    {filteredShowArrays[i].map(
                      ({
                        id,
                        coverImage,
                        title,
                        format,
                        meanScore,
                        nextAiringEpisode,
                      }) => {
                        title = title[language] || title.romaji;
                        meanScore = (meanScore / 10).toFixed(1) || "?";
                        return (
                          <SwiperSlide
                            key={id}
                            className="calendar-items-slide"
                          >
                            <div className="col img-spot my-2" key={id}>
                              <Countdown
                                airingStatus={status}
                                airingInfo={nextAiringEpisode}
                                airingAt={nextAiringEpisode?.airingAt * 1000}
                              />
                              <Link to={`/details/${id}`}>
                                <CoverImage
                                  title={title}
                                  coverImage={coverImage}
                                  format={format}
                                  score={meanScore}
                                  style="calendar-image"
                                />
                              </Link>
                            </div>
                          </SwiperSlide>
                        );
                      }
                    )}
                  </Swiper>
                ) : (
                  <div>
                    Nothing in your airing list for this date, try adding
                    something to your watching and look again!
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
