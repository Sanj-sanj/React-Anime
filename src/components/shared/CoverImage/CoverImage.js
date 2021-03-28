import React from "react";
import "./coverImage.css";
export default function CoverImage({
  title,
  coverImage,
  format,
  score,
  style,
}) {
  return (
    <React.Fragment>
      <img
        className={`card-img-top ${style}`}
        alt={title}
        srcSet={`${coverImage.medium} 100w,
        ${coverImage.large}`}
        sizes="(max-width: 300px) 100px,
        230px"
        src={coverImage.large}
      />
      <div className="format">
        <span role="img" aria-label="tv-emoji">
          📺
        </span>{" "}
        {format?.replace("_", " ") || "Anime"}
      </div>
      <div className="rating">
        <span role="img" aria-label="star-emoji">
          ⭐
        </span>{" "}
        {score}
      </div>
    </React.Fragment>
  );
}
