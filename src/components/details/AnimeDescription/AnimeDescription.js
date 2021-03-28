import React, { useEffect, useState } from "react";
import "./animeDescription.css";

export default function AnimeDescription({ description, innerWidth }) {
  if (!description) {
    description = "<i>No synopsis has been made available yet.</i>";
  }
  const [toggle, setToggle] = useState(false);
  const [btn, setBtn] = useState(false);
  const descriptionContainer = document.querySelector("div.px-3 div.mb-3");

  function expandContainer(e) {
    let button = e.target;
    if (descriptionContainer?.clientHeight >= 200) {
      descriptionContainer.classList.add("collapsed");
      button.textContent = "SHOW MORE";
      return setToggle(!toggle);
    }
    if (descriptionContainer?.clientHeight < 200) {
      descriptionContainer.classList.remove("collapsed");
      button.textContent = "SHOW LESS";
      return setToggle(!toggle);
    }
  }

  useEffect(() => {
    if (innerWidth < 992) return setBtn(true);
    if (innerWidth >= 992) return setBtn(false);
  }, [innerWidth]);

  return (
    <div className="px-3">
      <div
        className={`mb-3 ${
          descriptionContainer && descriptionContainer.clientHeight > 191 && btn
            ? "collapsed"
            : ""
        }`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className={"mb-3"}>
        {btn ? (
          <button
            className="btn btn-sm btn-show-txt"
            onClick={(e) => expandContainer(e)}
          >
            SHOW MORE
          </button>
        ) : null}
      </div>
    </div>
  );
}
