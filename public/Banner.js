import React from "react";

export default function Banner({ bannerImage, altText }) {
  return (
    <div className="banner-area">
      <img
        className="title-banner border "
        src={bannerImage || require("./imgs/d_banner.png")}
        alt={`Banner of show: ${altText}`}
      />
    </div>
  );
}
