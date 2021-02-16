import React from "react";
import "./ribbon.css";

export default function Ribbon({ watch, consider, id }) {
  if (watch.find((epObj) => epObj.id == id))
    return (
      <div className="ribbon">
        <svg
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
          className="bi bi-bookmark-check-fill"
          fill="#00b77a"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm6.854 5.854a.5.5 0 0 0-.708-.708L7.5 7.793 6.354 6.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
          />
        </svg>
      </div>
    );
  if (consider.find((epObj) => epObj.id == id)) {
    return (
      <div className="ribbon">
        <svg
          width="2em"
          height="2em"
          viewBox="0 0 16 16"
          className="bi bi-bookmark-star-fill"
          fill="#ffa811"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4 0a2 2 0 0 0-2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4zm4.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
          />
        </svg>
      </div>
    );
  }
  return null;
}
