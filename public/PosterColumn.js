import React from "react";

export default function posterColumn({ coverImage, title }) {
  return (
    <div className="col poster">
      <div className="anime-poster-area">
        <img
          className="anime-poster border border-dark"
          src={coverImage.large}
          alt={title.romaji || title.english}
          title={title.romaji || title.english}
        />
      </div>
      {/* <span className="library-position border border-top-0 border-primary">
        Watch
      </span> */}
    </div>
  );
}
