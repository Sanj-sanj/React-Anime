import React from "react";
import { Link } from "@reach/router";
import PosterColumn from "../PosterColumn/PosterColumn";
import LazyLoad from "react-lazyload";

import "./relatedAnime.css";

export default function RelatedAnime({
  relations,
  Swiper,
  SwiperSlide,
  language,
}) {
  if (
    !relations.nodes ||
    !relations.nodes.find((item) => item.type === "ANIME")
  )
    return null;

  function findRelatedShowsLen() {
    return relations.nodes.filter((item) => item.type === "ANIME").length;
  }
  return (
    <div className="pt-3 border-top">
      <h4 className="card-title">Related</h4>
      <Swiper
        spaceBetween={0}
        slidesPerView={findRelatedShowsLen() > 2 ? 2 : findRelatedShowsLen()}
        navigation={false}
        scrollbar={{ draggable: true }}
      >
        {relations
          ? relations.nodes
              .filter((show) => show.type === "ANIME")
              .map(({ id, coverImage, title }) => (
                <SwiperSlide key={id}>
                  <Link className="btn" to={`/details/${id}`}>
                    <LazyLoad>
                      <PosterColumn
                        coverImage={coverImage}
                        title={title[language] || title.romaji}
                        id={id}
                      />
                    </LazyLoad>
                  </Link>
                  <h6
                    className="card-title related-poster"
                    //WebkitBoxOrient needs to be added via JS. Css does not apply the style for some reason...
                    style={{ WebkitBoxOrient: "vertical" }}
                  >
                    {title[language] || title.romaji}
                  </h6>
                </SwiperSlide>
              ))
          : "/"}
      </Swiper>
    </div>
  );
}
