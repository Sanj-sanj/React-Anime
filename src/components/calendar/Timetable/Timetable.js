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
                console.log(time);
                if (isNaN(time.includes(":") ? time.replace(":", "") : time)) {
                  time = "N/A";
                }

                return (
                  <div
                    key={arrayOfShows[0].nextAiringEpisode?.timeUntilAiring}
                    className={`timetable-slot ${visbility}`}
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
            <p>
              This message needs to be dynamic, display loading or a placeholder
              while building, and display no info found when finished building.
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default Timetable;
