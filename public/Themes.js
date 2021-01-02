import React from "react";

export default function Themes({ tags, describeTags, Swiper, SwiperSlide }) {
  return (
    <div className="more-info-container border-top">
      <h4 className="card-title">Themes</h4>
      <Swiper
        spaceBetween={2}
        slidesPerView={tags.length >= 3 ? 3 : tags.length}
        scrollbar={{ draggable: true }}
      >
        {tags
          ? tags.map((tag) => {
              if (tag.isGeneralSpoiler || tag.isMediaSpoiler || tag.isAdult) {
                return "";
              }
              return (
                <SwiperSlide key={tag.id} className="char-container">
                  <button
                    className={"btn tag btn-outline-info"}
                    title={tag.description}
                    onClick={(e) => describeTags(e, tag)}
                  >
                    {" "}
                    {tag.name}
                  </button>
                </SwiperSlide>
              );
            })
          : "There seems to be nothing here."}
      </Swiper>
    </div>
  );
}
