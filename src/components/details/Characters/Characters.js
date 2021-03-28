import React from "react";
import "./characters.css";
import { characterSlidesToDisplay } from "../../../js/slidesToDisplay";

function sortAndFilterByCharacters(characters, role) {
  return characters
    .filter((char) => char.role == role)
    .sort((a, b) => b.node.favourites - a.node.favourites);
}
export default function Characters({
  characters,
  Swiper,
  SwiperSlide,
  innerWidth,
  LazyLoad,
}) {
  if (!characters.length) return null;

  return (
    <div className="pt-3 border-top">
      <h4 className="card-title">Characters</h4>
      <LazyLoad>
        <Swiper
          slidesPerView={characterSlidesToDisplay(characters, innerWidth)}
          scrollbar={{ draggable: true }}
        >
          {sortAndFilterByCharacters(characters, "MAIN").map((character) => (
            <SwiperSlide key={character.id}>
              <div className="col">
                <img
                  className="character-portrait"
                  src={character.node.image["medium"]}
                  alt={`The character: "${character.node.name.full}"`}
                />
              </div>
            </SwiperSlide>
          ))}
          {sortAndFilterByCharacters(characters, "SUPPORTING").map(
            (character) => (
              <SwiperSlide key={character.id}>
                <div className="col">
                  <img
                    className="character-portrait"
                    src={character.node.image["medium"]}
                    alt={`The character: "${character.node.name.full}"`}
                  />
                </div>
              </SwiperSlide>
            )
          )}
          {sortAndFilterByCharacters(characters, "BACKGROUND").map(
            (character) => (
              <SwiperSlide key={character.id}>
                <div className="col">
                  <img
                    className="character-portrait"
                    src={character.node.image["medium"]}
                    alt={`The character: "${character.node.name.full}"`}
                  />
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </LazyLoad>
      <div></div>
    </div>
  );
}
