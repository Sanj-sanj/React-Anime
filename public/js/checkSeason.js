const season = seasonFunc();
const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];

function seasonFunc() {
  function getSeasonIndex(season) {
    return seasons.findIndex((arrSeason) => arrSeason === season);
  }

  function compareSeasons(userSeason) {
    const seasonAndYear = checkSeason().split(" ");

    let currentSeasonInd = seasons.findIndex(
      (season) => season === seasonAndYear[0].toUpperCase()
    );
    let userSeasonInd = seasons.findIndex(
      (season) => season === userSeason[0].toUpperCase()
    );
    currentSeasonInd === 0 ? (currentSeasonInd = 4) : currentSeasonInd;
    userSeasonInd === 0 ? (userSeasonInd = 4) : userSeasonInd;
    if (
      currentSeasonInd >= userSeasonInd &&
      +userSeason[1] >= +seasonAndYear[1]
    ) {
      return true;
    }
    return false;
  }

  function checkSeason(seasonString, year, change) {
    if (seasonString && year) {
      let ind = seasons.indexOf(seasonString.toUpperCase());
      year = Number(year);
      if (change === "up") {
        ind++;
        ind === 4 ? ((ind = 0), year++) : ind;
      }
      if (change === "down") {
        ind--;
        ind < 0 ? ((ind = 3), year--) : ind;
      }
      return `${seasons[ind].charAt(0)}${seasons[ind]
        .slice(1)
        .toLowerCase()} ${year}`;
    }
    const now = new Date();
    const thisMonth = now.getMonth();
    let thisYear = now.getFullYear();
    let seasonAsInt = Math.round(thisMonth / 3);
    seasonAsInt === 4 ? (seasonAsInt = 0) : seasonAsInt;
    thisMonth === 11 ? (thisYear += 1) : thisYear;
    return `${seasons[seasonAsInt].charAt(0)}${seasons[seasonAsInt]
      .slice(1)
      .toLowerCase()} ${thisYear}`;
  }
  return { checkSeason, compareSeasons, getSeasonIndex };
}
export default season;
