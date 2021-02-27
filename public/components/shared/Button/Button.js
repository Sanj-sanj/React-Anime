import React from "react";
import "./button.css";

export default function Button({ style, action, className, updateState }) {
  return (
    <div className={`interactiveButton ${className}`}>
      <button
        className={`btn btn-sm btn-outline-${style}`}
        onClick={() => updateState()}
      >
        {action.charAt(0).toUpperCase() + action.slice(1)}
      </button>
    </div>
  );
}
