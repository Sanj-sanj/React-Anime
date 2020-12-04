import React from "react";

export default function AnimeDescription({ description, state, setState }) {
  return (
    <div>
      <div
        className=" anime-description mb-3"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="toggle-text mb-3 hidden">
        <button
          className="btn btn-ssetStatem btn-show-txt"
          onClick={() => setState(!state)}
        >
          SHOW MORE
        </button>
        <button
          className="btn btn-sm btn-show-txt hidden"
          onClick={() => setState(!state)}
        >
          SHOW LESS
        </button>
      </div>
    </div>
  );
}
