const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

//first two functions get used in Parameters, third function is for moreDetails
function formatEpisodeAirDate({ day, month, year }) {
  let date = new Date(year, month - 1, day);
  if (day) {
    return `${days[date.getDay()]} ${months[month - 1]} ${day} ${year}`;
  }
  //!day
  return "No information";
}

function formatNextAiringEpisodeDate(nextEpObj) {
  const nextEpDate = new Date();
  nextEpDate.setSeconds(nextEpObj.timeUntilAiring);
  let nextEpMinsRounded = Math.ceil(
    nextEpDate.getMinutes() / nextEpDate.getMinutes() + nextEpDate.getMinutes()
  ).toFixed(1);
  nextEpMinsRounded.replace(".", "");
  return `${days[nextEpDate.getDay()]} 
    ${months[nextEpDate.getMonth()]} 
    ${nextEpDate.getDate()} ${nextEpDate.getFullYear()} ${nextEpDate.getHours()}:${
    nextEpDate.getMinutes() < 10
      ? "0" + nextEpDate.getMinutes()
      : nextEpDate.getMinutes()
  } `;
}

function formatDate(year, month, day) {
  return `${months[month - 1] || "?"} ${day || "?"} ${year || "?"}`;
}
export { formatEpisodeAirDate, formatNextAiringEpisodeDate, formatDate };
