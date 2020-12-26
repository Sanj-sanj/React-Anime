import React from "react";

export default function Themes({ tags, describeTags, Swiper, SwiperSlide }) {
  return (
    <div className="more-info-container border-top">
      <h4 className="card-title">Themes:</h4>
      {/* <div className="related-tags"> */}
      <Swiper spaceBetween={2} slidesPerView={5}>
        <ul className="tags-section">
          {tags
            ? tags.map((tag) => {
                if (tag.isGeneralSpoiler || tag.isMediaSpoiler || tag.isAdult) {
                  return "";
                }
                return (
                  <SwiperSlide key={tag.id}>
                    <li className="" title={tag.description}>
                      <button
                        className={"btn tag"}
                        onClick={(e) => describeTags(e, tag)}
                      >
                        {" "}
                        {tag.name}
                      </button>
                    </li>
                  </SwiperSlide>
                );
              })
            : "There seems to be nothing here."}
        </ul>
      </Swiper>
      {/* </div> */}
    </div>
  );
}
