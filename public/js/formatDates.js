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

//first two functions get used in Parameters, third function is for moreDetails, fourth for calendar
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

function formatCalendarDate(today, ind = 0) {
  today === 6 && ind >= 1 ? (today = today + ind) : today;
  const date = new Date();
  const sortedDays = days.slice(today).concat(days.slice(0, today));

  return sortedDays.map((day) => {
    const formattedDateObj = new Date(
      `${day} ${months[date.getMonth()]} ${today + ind} ${date.getFullYear()}`
    );
    const formattedDate = `${formattedDateObj.getDate()}`;
    const formatted = `${days[formattedDateObj.getDay()]} · ${
      months[formattedDateObj.getMonth()]
    } ${formattedDate.length === 1 ? "0" + formattedDate : formattedDate}`;
    ind++;
    return formatted;
  });
}

export {
  formatEpisodeAirDate,
  formatNextAiringEpisodeDate,
  formatDate,
  formatCalendarDate,
};
