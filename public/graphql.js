import querys from "./querys";

var variables = {
  // id: 112124,
  isAdult: false,
  page: 1,
  perPage: 50,
  format_in: ["TV", "TV_SHORT"], //defaults to TV series
  season: "",
  seasonYear: "",
};

var url = "https://graphql.anilist.co",
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

// Make the HTTP Api request
fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data) {
  console.log(data);
}

function handleError(error) {
  alert("Error, check console");
  console.error(error);
}
