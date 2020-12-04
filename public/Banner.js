import React from "react";

export default function Banner({ bannerImage }) {
  return (
    <div className="banner-area">
      <img
        className="title-banner border "
        src={bannerImage || require("./imgs/d_banner.png")}
        alt="anime title"
      />
    </div>
  );
}
