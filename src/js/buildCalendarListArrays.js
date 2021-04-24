const today = new Date();

export default function buildCalendarListArrays(dateStringsArray, data) {
  const filteredShowArrays = dateStringsArray.map((dateString) => {
    const calendarDate = new Date(
      `${dateString.replace("·", "").trim()} ${today.getFullYear()}`
    );
    const filteredAndSortedByDate = data
      .filter((show) => {
        let showStart = new Date(show.airingSchedule?.nodes[0].airingAt * 1000);
        if (showStart.getDay() === calendarDate.getDay()) return show;
      })
      .sort((a, b) => {
        if (!a.nextAiringEpisode) return;
        return a.nextAiringEpisode.airingAt - b.nextAiringEpisode.airingAt;
      });

    return filteredAndSortedByDate;
  });
  return filteredShowArrays;
}
