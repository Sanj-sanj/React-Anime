import React, { useEffect, useState } from "react";

export default function AnimeDescription({ description }) {
  const [showText, setShowText] = useState(false);
  if (!description) {
    description = "<i>No synopsis has been made available yet.</i>";
  }

  useEffect(() => {
    const descriptionContainer = document.querySelector(".anime-description");
    if (descriptionContainer.clientHeight > 200) {
      descriptionContainer.classList.add("collapsed");
      document.querySelector(".btn-show-txt").textContent = "SHOW MORE";
    } else {
      descriptionContainer.classList.remove("collapsed");
      document.querySelector(".btn-show-txt").textContent = "SHOW LESS";
    }
  }, [showText, description]);

  return (
    <div>
      <div
        className=" anime-description mb-3"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className={`toggle-text mb-3`}>
        <button
          className="btn btn-sm btn-show-txt"
          onClick={() => setShowText(!showText)}
        ></button>
      </div>
    </div>
  );
}
