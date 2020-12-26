import React from "react";
import { Link } from "@reach/router";
import PosterColumn from "./PosterColumn";

export default function RelatedAnime({ relations, Swiper, SwiperSlide }) {
  console.log(relations);
  if (!relations.nodes || !relations.nodes.find((item) => item.type == "ANIME"))
    return null;

  function findRelatedShowsLen() {
    return relations.nodes.filter((item) => item.type == "ANIME").length;
  }
  return (
    <div className="related more-info-container border-top">
      <h4 className="card-title">Related</h4>
      <Swiper
        spaceBetween={0}
        slidesPerView={findRelatedShowsLen() > 2 ? 2 : findRelatedShowsLen()}
        navigation={false}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide changed")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {relations
          ? relations.nodes
              .filter((show) => show.type == "ANIME")
              .map((show) => (
                <SwiperSlide key={show.id}>
                  <Link className="btn" to={`/details/${show.id}`}>
                    <PosterColumn
                      coverImage={show.coverImage}
                      title={show.title}
                      id={show.id}
                    />
                  </Link>
                  <h6 className="card-title" style={{ padding: "0 2em" }}>
                    {show.title.english || show.title.romaji}
                  </h6>
                </SwiperSlide>
              ))
          : "/"}
      </Swiper>
    </div>
  );
}
