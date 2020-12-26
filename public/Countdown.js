import React, { useState, useEffect } from "react";

export default function makeCountdown({ status, airingInfo, cd, css }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    if (status == null || airingInfo == null) {
      setTime("");
      return;
    }
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const timeApart = cd - now;
      if (timeApart < 0) {
        return "Released!";
      }
      const days = Math.floor(timeApart / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeApart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeApart % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeApart % (1000 * 60)) / 1000);
      const formatted = `${days}d ${hours}h ${
        minutes < 10 ? "0" : ""
      }${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
      setTime(formatted);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [cd, status]);

  const episode =
    status == "FINISHED"
      ? "Finished!"
      : airingInfo
      ? "Ep " + airingInfo.episode
      : "No information";

  return (
    <time className={`countdown ${css}`}>
      {episode} {!time ? null : time}
    </time>
  );
}
