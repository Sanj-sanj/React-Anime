import React from "react";

export default function Trailer({ trailer, title }) {
  return (
    <div className="trailer-box border-top border-bottom mb-3">
      <h4 className="card-title trailer-header">Trailer</h4>
      <div className="yt-prev">
        {trailer ? (
          <a
            href={
              trailer.site == "youtube"
                ? `https://www.youtube.com/watch?v=${trailer.id}`
                : "/"
            }
          >
            <img
              className="yt-thumb"
              src={trailer.thumbnail ? trailer.thumbnail : ""}
              alt={`Trailer for ${
                title.english ? title.english : title.romaji
              }`}
            ></img>
          </a>
        ) : (
          "No trailer found."
        )}
      </div>
    </div>
  );
}
