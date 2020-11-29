import querys from "./querys";
export default async function requestAnimes(
  variables,
  nextPage = 1,
  acc = [],
  format,
  season
) {
  if (!variables) {
    variables = {
      // id: 112124,
      isAdult: false,
      page: nextPage,
      perPage: 50,
      format_in: format == "TV" ? ["TV", "TV_SHORT"] : format, //defaults to TV series
      season: season[0].toUpperCase(),
      seasonYear: season[1],
    };
  }
  const url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: querys.queryMain,
        variables: variables,
      }),
    };

  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) return Promise.reject(json);
  if (!json.data.Page.pageInfo.hasNextPage) {
    return acc.concat(json.data.Page.media);
  }
  return requestAnimes(
    null,
    json.data.Page.pageInfo.currentPage + 1,
    acc.concat(json.data.Page.media),
    format,
    season
  );
}
