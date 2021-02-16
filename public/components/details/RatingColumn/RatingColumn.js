import React from "react";
import "./ratingColumn.css";

export default function RatingColumn({
  meanScore,
  synonyms,
  studios,
  genres,
  formattedDate,
}) {
  return (
    <div className="col">
      <div>
        <div className="rating-title">Rating</div>
        <div className="show-rating border border-top-0 border-dark">
          {meanScore || "?"}
        </div>
        <div className="mb-2 small">Premiere : {formattedDate}</div>
        <div className="synonym">
          {<i>{synonyms.find((el) => el.length < 30) || ""}</i>}
        </div>
        <div className="studio">
          {!studios.nodes
            ? "No studio"
            : studios.nodes.find((studio) => studio.isAnimationStudio)
            ? studios.nodes.find((studio) => studio.isAnimationStudio).name
            : "No information"}
        </div>

        <div>
          <ul className="genres">
            {genres.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
