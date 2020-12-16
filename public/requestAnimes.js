import querys from "./querys";
import Axios from "axios";
export default async function requestAnimes(
  variables,
  nextPage = 1,
  acc = [],
  format,
  season
) {
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

  // const url = "https://graphql.anilist.co",
  //   options = {
  //     method: "POST",
  //     headers: {
  //       // "Access-Control-Allow-Origin": "http://localhost:1234",
  //       "Access-Control-Request-Method": "GET",
  //       "Access-Control-Request-Headers": "Content-Type",
  //       "Access-Control-Allow-Origin": "http://localhost:1234",
  //       // Origin: "https://react-anime.herokuapp.com",
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: JSON.stringify({
  //       query: querys.queryMain,
  //       variables: variables,
  //     }),
  //   };

  const response = await Axios({
    method: "POST",
    url: "https://cors-anywhere.herokuapp.com/https://graphql.anilist.co",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify({
      query: querys.queryMain,
      variables: variables,
    }),
  });

  // const response = await fetch(url, options);
  console.log(response);
  // const json =  await response.json();
  const json = response.data;
  console.log(json);
  // if (!response.ok) return Promise.reject(json);
  if (!response.status == 200) return Promise.reject(json);
  if (!json.data.Page.pageInfo.hasNextPage) {
    // console.log("doesnt have a next page");
    return acc.concat(json.data.Page.media);
  }
  console.log("has next page");
  if (variables.id || variables.status_in) {
    variables.page = json.data.Page.pageInfo.currentPage + 1;
    // console.log(json.data.Page);
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
