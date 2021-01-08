import querys from "./querys";
import Axios from "axios";

export default async function checkNewEp(ArrofIDs, nextPage, acc = []) {
  const variables = {
    id_in: ArrofIDs,
  };
  const response = await Axios({
    method: "POST",
    url: "https://graphql.anilist.co",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    data: JSON.stringify({
      query: querys.queryEpisodes,
      variables: variables,
    }),
  });
  const json = response.data;
  if (!response.status == 200) return Promise.reject(json);
  if (!json.data.Page.pageInfo.hasNextPage) {
    return acc.concat(json.data.Page.media);
  }
}