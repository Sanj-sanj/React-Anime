import React from "react";
import "./formatBtns.css";

export default function btnFormat({ active, value, change, name, fetchData }) {
  return (
    <li
      className={`f-choice ${
        active && value ? (active[0] === value[0] ? "active" : null) : null
      }`}
    >
      <button
        className="btn"
        value={value[0]}
        onClick={(e) => {
          change(e);
          fetchData();
        }}
      >
        {name}
      </button>
    </li>
  );
}
