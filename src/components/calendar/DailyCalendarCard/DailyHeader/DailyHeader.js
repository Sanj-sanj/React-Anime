import React from "react";
import "./DailyHeader.css";

const DailyHeader = ({ dateString }) => (
  <div className="col dates d-flex p-0">
    <h3 className="calendar-date w-100 mb-4 p-2 text-left">{dateString}</h3>
  </div>
);

export default DailyHeader;
