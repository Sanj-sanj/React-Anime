import querys from "./querys";
import Axios from "axios";
export default async function requestAnimes(
  variables,
  nextPage = 1,
  acc = [],
  format,
  season
) {
  console.log("Hitting API");
  // console.log({ variables, nextPage, acc, format, season });

  if (variables == "show ongoing") {
    variables = {
      status_in: ["RELEASING"],
      page: 1,
      isAdult: false,
      format_in: format,
      popularity_greater: 100,
      sort: ["START_DATE_DESC"],
    };
  }
  if (!variables) {
    variables = {
      // id: 112124,
      isAdult: false,
      page: nextPage,
      perPage: 50,
      format_in: format == "TV" ? ["TV", "TV_SHORT"] : format, //defaults to TV series
      season: season[0].toUpperCase() || null,
      seasonYear: season[1] || null,
      sort: ["START_DATE"],
    };
  }

  const response = await Axios({
    method: "POST",
    url: "https://graphql.anilist.co",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify({
      query: querys.queryMain,
      variables: variables,
    }),
  });

  const json = response.data;
  if (!response.status == 200) return Promise.reject(json);
  if (!json.data.Page.pageInfo.hasNextPage) {
    // console.log("doesnt have a next page");
    // console.log(variables);
    return acc.concat(json.data.Page.media);
  }
  console.log("has next page");
  //if were searching a particular anime or a list of ongoing shows use these params
  if (variables.id || variables.status_in) {
    variables.page = json.data.Page.pageInfo.currentPage + 1;
    // console.log(json);
    return requestAnimes(
      variables,
      null,
      acc.concat(json.data.Page.media),
      null,
      null
    );
  }

  return requestAnimes(
    null,
    json.data.Page.pageInfo.currentPage + 1,
    acc.concat(json.data.Page.media),
    format,
    season
  );
}
