import React, { useState } from "react";

import "./timetable.css";
import { Link } from "@reach/router";
import TimetableHeader from "./TimetableHeader/TimetableHeader";
import Countdown from "../../shared/Countdown/Countdown";

const Timetable = ({ date, showsArray }) => {
  const [visbility, setVisbility] = useState("hide");

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
              {showsArray.map((show) => {
                let time = new Date();
                const { nextAiringEpisode, status } = show;
                try {
                  time.setSeconds(show.nextAiringEpisode?.timeUntilAiring);
                  time = `${time.getHours()}:${
                    time.getMinutes() < 10
                      ? time.getMinutes() + "0"
                      : time.getMinutes()
                  }`;
                } catch (err) {
                  console.log(err);
                  time = "N/A";
                }

                return (
                  <div key={show.id} className={`timetable-slot ${visbility}`}>
                    <div className="line"></div>
                    <div className="content">
                      <div className="timetable-time">{time} </div>
                      <div className="anime-block d-flex">
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
                          <Countdown
                            airingStatus={status}
                            airingInfo={nextAiringEpisode}
                            airingAt={nextAiringEpisode.airingAt * 1000}
                          />
                        </div>
                      </div>
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
