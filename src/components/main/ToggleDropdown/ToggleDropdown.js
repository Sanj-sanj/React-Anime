import React from "react";
import "./toggleDropdown.css";

let toggle = false;
export default function ToggleDropdown() {
  function pullDropdown() {
    const options = document.querySelector(".options-area");
    const chevArrowUp = document.querySelector(".bi-chevron-compact-up");
    const chevArrowDown = document.querySelector(".bi-chevron-compact-down");
    const insertPoint = document.querySelector(".row-card-area");
    if (!toggle) {
      options.classList.add("view-area");
      insertPoint.classList.add("view-area");
      chevArrowDown.classList.remove("show");
      chevArrowUp.classList.add("show");
      return (toggle = !toggle);
    }
    if (toggle) {
      options.classList.remove("view-area");
      insertPoint.classList.remove("view-area");
      chevArrowUp.classList.remove("show");
      chevArrowDown.classList.add("show");
      return (toggle = !toggle);
    }
  }

  return (
    <button
      className="btn pull-dropdown"
      type="button"
      aria-label="Sort and preferences dropdown"
      onClick={() => pullDropdown()}
    >
      <svg
        width="3em"
        height="3em"
        viewBox="0 0 16 16"
        className="bi opt-toggle bi-chevron-compact-down show"
        fill="#4d9de2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
        />
      </svg>
      <svg
        width="3em"
        height="3em"
        viewBox="0 0 16 16"
        className="bi opt-toggle bi-chevron-compact-up"
        fill="#4d9de2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
        />
      </svg>
    </button>
  );
}
