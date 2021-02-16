import React from "react";
import "./characters.css";

function slidesToDisplay(characters, innerWidth) {
  let ammount;
  if (innerWidth < 567) {
    characters.length >= 3 ? (ammount = 3) : (ammount = characters.length);
    return ammount;
  }
  if (innerWidth < 768) {
    characters.length >= 4 ? (ammount = 4) : (ammount = characters.length);
    return ammount;
  }
  if (innerWidth < 991) {
    characters.length >= 5 ? (ammount = 5) : (ammount = characters.length);
    return ammount;
  }
  characters.length >= 6 ? (ammount = 6) : (ammount = characters.length);
  return ammount;
}

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
          slidesPerView={slidesToDisplay(characters, innerWidth)}
          scrollbar={{ draggable: true }}
        >
          {sortAndFilterByCharacters(characters, "MAIN").map((character) => (
            <SwiperSlide key={character.id}>
              {/* <h6>{character.node.name.full}</h6> */}
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
                  {/* <h6>{character.node.name.full}</h6> */}
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
                  {/* <h6>{character.node.name.full}</h6> */}
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
