import React from "react";
import { Link } from "@reach/router";

export default function navbar() {
  return (
    <div className="navbar navbar-dark bg-dark">
      <h2 className="navbar-text">
        <Link to="/">Seasonal Anime</Link>
      </h2>
    </div>
  );
}

// export default function returnQuote() {
//   function pickQuote(quotes) {
//     return quotes[Math.floor(Math.random() * [quotes.length])];
//   }
//   const quotes = [
//     "Wow the sea is cool.",
//     "This is a different quote.",
//     "Nothing else to say.",
//   ];

//   return <div className="quote">{pickQuote(quotes)}</div>;
// }
