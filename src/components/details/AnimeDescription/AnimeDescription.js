import React, { useEffect, useState } from "react";
import "./animeDescription.css";

export default function AnimeDescription({ description, innerWidth }) {
  if (!description) {
    description = "<i>No synopsis has been made available yet.</i>";
  }
  // const [toggle, setToggle] = useState(false);
  // const [btn, setBtn] = useState(false);
  // const descriptionContainer = document.querySelector("div.px-3 div.mb-3");

  const [showTxt, setShowTxt] = useState(false);
  const [btnTxt, setBtnTxt] = useState("SHOW MORE");

  useEffect(() => {
    const descriptionContainer = document.querySelector(
      "div.px-3 section.mb-3"
    );
    if (innerWidth > 992) {
      descriptionContainer.classList.remove("collapsed");
      setShowTxt(false);
      setBtnTxt("SHOW MORE");
    }

    if (innerWidth < 992 && !showTxt) {
      descriptionContainer.classList.add("collapsed");
      return setBtnTxt("SHOW MORE");
    }

    if (innerWidth < 992 && showTxt) {
      descriptionContainer.classList.remove("collapsed");
      return setBtnTxt("SHOW LESS");
    }
  }, [innerWidth, showTxt]);

  return (
    <div className="px-3">
      <section
        className="mb-3"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {innerWidth < 992 ? (
        <button
          className="btn btn-sm btn-show-txt"
          onClick={() => setShowTxt(!showTxt)}
        >
          {btnTxt}
        </button>
      ) : null}
    </div>
  );
}
