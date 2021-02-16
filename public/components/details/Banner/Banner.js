import React from "react";
import "./banner.css";

export default function Banner({ bannerImage, altText }) {
  return (
    <div className="banner-area">
      <img
        className="w-100 border banner"
        src={bannerImage || require("../../../imgs/d_banner.png")}
        alt={`Banner of show: ${altText}`}
      />
    </div>
  );
}
