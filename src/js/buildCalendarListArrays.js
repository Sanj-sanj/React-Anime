const today = new Date();

export default function buildCalendarListArrays(dateStringsArray, data, type) {
  const filteredShowArrays = dateStringsArray.map((dateString) => {
    const calendarDate = new Date(
      `${dateString.replace("·", "").trim()} ${today.getFullYear()}`
    );
    console.log(data);
    const filteredAndSortedByDate = data
      .filter((show) => {
        let showStart = new Date(
          show.airingSchedule?.nodes[0]?.airingAt * 1000
        );
        if (showStart.getDay() === calendarDate.getDay()) return show;
      })
      .sort((a, b) => {
        if (!a.nextAiringEpisode || !b.nextAiringEpisode) return;
        return a.nextAiringEpisode.airingAt - b.nextAiringEpisode.airingAt;
      });

    if (type === "timetable") {
      return group(filteredAndSortedByDate);
    }

    return filteredAndSortedByDate;
  });
  return filteredShowArrays;
  //
  //
}

function group(arr) {
  //groups shows with === timeUntilAiring into an array, prevents duplicate times for timetables.
  let airTimes = [
    ...new Set(
      arr.map((v) => {
        return v?.nextAiringEpisode?.timeUntilAiring;
      })
    ),
  ];

  return airTimes.map((time) => {
    return arr.filter(
      (show) => show?.nextAiringEpisode?.timeUntilAiring === time
    );
  });
}
