function sortCards(allCards, sort, season, watchStates) {
  if (sort === "popularity") {
    return allCards.sort((a, b) => {
      return b.popularity - a.popularity;
    });
  }
  if (sort === "countdown") {
    return allCards
      .filter((item) => (item.nextAiringEpisode ? item : false))
      .sort((a, b) => {
        if (!a.nextAiringEpisode || !b.nextAiringEpisode) return;
        return (
          a.nextAiringEpisode.timeUntilAiring -
          b.nextAiringEpisode.timeUntilAiring
        );
      })
      .concat(allCards.filter((show) => !show.nextAiringEpisode));
  }
  if (sort === "rating") {
    return allCards.sort((a, b) => {
      return b.meanScore - a.meanScore;
    });
  }
  if (sort === "air date") {
    return allCards
      .filter((show) => show.startDate.day)
      .sort((a, b) => {
        const altDayA = a.startDate.day ? `${a.startDate.day}` : "00";
        const altMonthA = a.startDate.month ? `${a.startDate.month}` : "00";
        const altYearA = a.startDate.year ? `${a.startDate.year}` : "2021";
        const altDayB = b.startDate.day ? `${b.startDate.day}` : "00";
        const altMonthB = b.startDate.month ? `${b.startDate.month}` : "00";
        const altYearB = b.startDate.year ? `${b.startDate.year}` : "2021";
        return (
          `${altYearA}${altMonthA.length < 2 ? "0" + altMonthA : altMonthA}${
            altDayA.length < 2 ? "0" + altDayA : altDayA
          }` -
          `${altYearB}${altMonthB.length < 2 ? "0" + altMonthB : altMonthB}${
            altDayB.length < 2 ? "0" + altDayB : altDayB
          }`
        );
      })
      .concat(allCards.filter((show) => !show.startDate.day));
  }
  if (sort === "my shows") {
    return allCards
      .filter((show) => watchStates.find((item) => item.id == show.id))
      .filter((show) => show.nextAiringEpisode)
      .sort((a, b) => {
        if (!a.nextAiringEpisode || !b.nextAiringEpisode) return;
        return (
          a.nextAiringEpisode.timeUntilAiring -
          b.nextAiringEpisode.timeUntilAiring
        );
      })
      .concat(
        allCards
          .filter((show) => watchStates.find((item) => item.id == show.id))
          .filter((show) => !show.nextAiringEpisode)
      )
      .concat(
        allCards.filter(
          (show) => !watchStates.find((item) => item.id == show.id)
        )
      );
  }
  if (sort === "season") {
    let thisSeasons = allCards
      .filter((show) => show.season || show.startDate.year) //find anything that started last year but is supposed to be of the new years season
      .filter(
        (show) =>
          show.startDate.month == 12 &&
          show.startDate.year == season[1] - 1 &&
          show.season == season[0].toUpperCase()
      )
      .concat(
        allCards
          .filter((show) => show.season || show.startDate.year)
          .filter(
            (show) =>
              show.season == season[0].toUpperCase() &&
              show.startDate.year == season[1] &&
              show.nextAiringEpisode
          )
      )
      .sort((a, b) => {
        if (!a.nextAiringEpisode || !b.nextAiringEpisode) return;
        return (
          a.nextAiringEpisode.timeUntilAiring -
          b.nextAiringEpisode.timeUntilAiring
        );
      })
      .concat(
        allCards.filter(
          (show) =>
            show.startDate.year == season[1] &&
            show.season == season[0].toUpperCase() &&
            !show.nextAiringEpisode
        )
      );
    return thisSeasons.concat(
      allCards.filter(
        (show) =>
          !thisSeasons.find((currSeasonShow) => currSeasonShow.id == show.id)
      )
    );
  }
}

export { sortCards };
