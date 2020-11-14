import React, { useState, useEffect, useRef } from "react";
import Countdown from "./counter";
export default function makeCountdown({ data }) {
  const [time, setTime] = useState("");
  const timeRef = useRef(time);
  timeRef.current = time;

  //   function countdown(nextEp) {
  //     // const arr = [];
  //     showCountdown = setInterval(() => {
  //       const now = new Date().getTime();
  //       const then = new Date();
  //       then.setSeconds(nextEp);
  //       const timeApart = then - now;
  //       if (timeApart < 0) {
  //         // arr.push('Released')
  //         return "Released!";
  //       }
  //       const days = Math.floor(timeApart / (1000 * 60 * 60 * 24));
  //       const hours = Math.floor(
  //         (timeApart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  //       );
  //       const minutes = Math.floor((timeApart % (1000 * 60 * 60)) / (1000 * 60));
  //       const seconds = Math.floor((timeApart % (1000 * 60)) / 1000);
  //       //   console.log({ days, hours, minutes, seconds });
  //       const formatted = `${days}d ${hours}h ${
  //         minutes < 10 ? "0" : ""
  //       }${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  //       // arr.push(formatted)
  //       setTimoutTime();
  //     }, 1000);
  //   }
  useEffect(() => {
    if (data[1] == null) {
      return;
    }
    const timerTest = setInterval(() => {
      const now = new Date().getTime();
      const then = new Date();
      then.setSeconds(data[1].timeUntilAiring);
      const timeApart = then - now;
      if (timeApart < 0) {
        // arr.push('Released')
        return "Released!";
      }
      const days = Math.floor(timeApart / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeApart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeApart % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeApart % (1000 * 60)) / 1000);
      //   console.log({ days, hours, minutes, seconds });
      const formatted = `${days}d ${hours}h ${
        minutes < 10 ? "0" : ""
      }${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
      setTime(formatted);
      // arr.push(formatted)
    }, 1000);
    // setTime(val);

    // const arr = []

    return () => {
      clearInterval(timerTest);
    };
  }, [time]);

  return (
    <time onClick={() => console.log(data)} className="countdown">
      {`${
        data[1] == null
          ? "No information"
          : data[0] == "FINISHED"
          ? "Finished!"
          : `Ep ${data[1].episode} ${time} `
      }`}
      <span></span>
    </time>
  );
}
