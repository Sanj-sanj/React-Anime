import React, { useState } from "react";

import "./timetable.css";
import { Link } from "@reach/router";
import TimetableHeader from "./TimetableHeader/TimetableHeader";
import Countdown from "../../shared/Countdown/Countdown";

const Timetable = ({ date, showsArray, innerWidth }) => {
  const [visbility, setVisbility] = useState(
    innerWidth >= 1870 ? "show" : "hide"
  );

  return (
    <>
      <div className="timetable">
        <div key={date} className="timetable-date">
          <TimetableHeader
            date={date}
            visbility={visbility}
            setVisbility={setVisbility}
          />
          {showsArray.length ? (
            <>
              {showsArray.map((arrayOfShows) => {
                let time = new Date();
                const { nextAiringEpisode, status } = arrayOfShows[0];

                time.setSeconds(nextAiringEpisode?.timeUntilAiring);
                time = `${time.getHours()}:${
                  time.getMinutes() < 10
                    ? time.getMinutes() + "0"
                    : time.getMinutes()
                }`;
                if (isNaN(time.includes(":") ? time.replace(":", "") : time)) {
                  time = "N/A";
                }

                return (
                  <div
                    className={`timetable-slot ${visbility}`}
                    key={arrayOfShows[0].id}
                  >
                    <div className="line"></div>
                    <div className="content">
                      <div className="timetable-time">
                        {time}{" "}
                        {nextAiringEpisode ? (
                          <Countdown
                            airingStatus={status}
                            airingInfo={nextAiringEpisode}
                            airingAt={nextAiringEpisode.airingAt * 1000}
                          />
                        ) : null}
                      </div>
                      {arrayOfShows.map((show) => (
                        <div key={show.id} className="anime-block d-flex pb-2">
                          <div className="timetable-poster">
                            <img
                              src={show.coverImage.medium}
                              alt={show.title.romaji}
                            />
                          </div>
                          <div className="timetable-body text-left d-flex flex-column align-content-start">
                            <Link
                              to={`/details/${show.id}`}
                              className="timetable-title"
                            >
                              {show.title.romaji}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className={`timeslot  ${visbility}`}>
              <p className="w-100 text-center">
                🔍️ No shows airing in you watch list this day!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Timetable;
