import React from "react";

export default function Themes({ tags, describeTags }) {
  return (
    <div className="border-top theme-container">
      <h4 className="card-title">Themes:</h4>
      <div className="related-tags">
        <ul className="tags-section">
          {tags
            ? tags.map((tag) => {
                if (tag.isGeneralSpoiler || tag.isMediaSpoiler || tag.isAdult) {
                  return "";
                }
                return (
                  <li key={tag.id} className="" title={tag.description}>
                    <button
                      className={"btn tag"}
                      onClick={(e) => describeTags(e, tag)}
                    >
                      {" "}
                      {tag.name}
                    </button>
                  </li>
                );
              })
            : "There seems to be nothing here."}
        </ul>
      </div>
    </div>
  );
}
