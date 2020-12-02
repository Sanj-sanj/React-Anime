import React from "react";

export default function btnFormat({ active, value, change, name }) {
  return (
    <li
      className={`f-choice ${
        active && value ? (active[0] == value[0] ? "active" : null) : null
      }`}
    >
      <button
        className="btn"
        value={value[0]}
        onClick={(e) => {
          change(e);
        }}
      >
        {name}
      </button>
    </li>
  );
}
