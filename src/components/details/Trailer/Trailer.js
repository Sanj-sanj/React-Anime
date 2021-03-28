import React from "react";
import "./trailer.css";

export default function Trailer({ trailer, title }) {
  return (
    <div className="pt-3 pb-4 border-top border-bottom mb-3">
      <h4 className="card-title">Trailer</h4>
      <div>
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
              alt={`Trailer for ${title}`}
            ></img>
          </a>
        ) : (
          "No trailer found."
        )}
      </div>
    </div>
  );
}
