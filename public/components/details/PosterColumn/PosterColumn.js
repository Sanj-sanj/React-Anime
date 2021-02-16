import React from "react";
import "./posterColumn.css";

export default function PosterColumn({ coverImage, title }) {
  return (
    <div className="col">
      <img
        className="anime-poster border border-dark"
        src={coverImage.large}
        alt={title}
        title={title}
      />
    </div>
  );
}
