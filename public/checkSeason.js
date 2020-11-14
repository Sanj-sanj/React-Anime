export default function checkSeason(seasonString, year, change) {
  const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];
  console.log({ seasonString, year, change });
  if (seasonString && year) {
    let ind = seasons.indexOf(seasonString.toUpperCase());
    year = Number(year);
    if (change == "up") {
      ind++;
      ind == 4 ? ((ind = 0), year++) : ind;
    }
    if (change == "down") {
      ind--;
      ind < 0 ? ((ind = 3), year--) : ind;
    }
    return `${seasons[ind].charAt(0)}${seasons[ind]
      .slice(1)
      .toLowerCase()} ${year}`;
  }
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  let seasonAsInt = Math.round(thisMonth / 3);
  seasonAsInt == 4 ? (seasonAsInt = 0) : seasonAsInt;
  return `${seasons[seasonAsInt].charAt(0)}${seasons[seasonAsInt]
    .slice(1)
    .toLowerCase()} ${thisYear}`;
}
