import React from "react";

const TimetableHeader = ({ date, visbility, setVisbility }) => {
  return (
    <button
      className="btn table-heading"
      onClick={() => setVisbility(visbility == "show" ? "hide" : "show")}
    >
      <h3>{date}</h3>
      <svg
        width="2em"
        height="2em"
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
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        className="bi opt-toggle bi-chevron-compact-up hide"
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
};
export default TimetableHeader;
