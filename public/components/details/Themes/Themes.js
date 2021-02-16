import React, { useState, useEffect } from "react";
import "./themes.css";

export default function Themes({ tags, Swiper, SwiperSlide, isAdult }) {
  const [showDescription, setShowDescription] = useState("");
  let timeout;

  function describeTag(description) {
    if (timeout) {
      clearTimeout(timeout);
    }
    setShowDescription(description);
  }
  if (!isAdult) {
    tags = tags.filter((tag) => {
      if (tag.isAdult || tag.isGeneralSpoiler || tag.isMediaSpoiler) {
        return null;
      }
      return tag;
    });
  }

  useEffect(() => {
    if (!showDescription) return;
    timeout = setTimeout(() => {
      setShowDescription("");
    }, 5000);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [showDescription]);
  if (!tags.length) return null;

  return (
    <div className="pt-3 border-top">
      <h4 className="card-title">Themes</h4>
      <Swiper
        spaceBetween={2}
        slidesPerView={tags.length >= 3 ? 3 : tags.length}
        scrollbar={{ draggable: true }}
      >
        {tags
          ? tags.map((tag) => {
              return (
                <SwiperSlide key={tag.id} className="tag-container">
                  <button
                    className={"tag btn btn-outline-info"}
                    title={tag.description}
                    onClick={() => describeTag(tag.description)}
                  >
                    {" "}
                    {tag.name}
                  </button>
                </SwiperSlide>
              );
            })
          : "There seems to be nothing here."}
      </Swiper>
      {showDescription ? (
        <div className="pt-2 hover-container">
          <div className="alert alert-info">{showDescription}</div>
        </div>
      ) : null}
    </div>
  );
}
