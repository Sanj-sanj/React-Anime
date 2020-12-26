import React from "react";

export default function Characters({ characters, Swiper, SwiperSlide }) {
  console.log(characters);
  if (!characters.length) return null;

  function sortAndFilterByCharacters(role) {
    return characters
      .filter((char) => char.role == role)
      .sort((a, b) => b.node.favourites - a.node.favourites);
  }
  return (
    <div className="more-info-container border-top">
      <h4 className="card-title">Characters</h4>
      <Swiper
        slidesPerView={characters.length < 4 ? characters.length : 4}
        scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide changed")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {sortAndFilterByCharacters("MAIN").map((character) => (
          <SwiperSlide key={character.id}>
            {/* <h6>{character.node.name.full}</h6> */}
            <div className="col">
              <img
                className="character-portrait anime-poster"
                src={character.node.image["medium"]}
                alt={`The character: "${character.node.name.full}"`}
                onClick={() => console.log(character.node.favourites)}
              />
            </div>
          </SwiperSlide>
        ))}
        {sortAndFilterByCharacters("SUPPORTING").map((character) => (
          <SwiperSlide key={character.id}>
            <div className="col">
              {/* <h6>{character.node.name.full}</h6> */}
              <img
                className="character-portrait anime-poster"
                src={character.node.image["medium"]}
                alt={`The character: "${character.node.name.full}"`}
                onClick={() => console.log(character.node.favourites)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div></div>
    </div>
  );
}
