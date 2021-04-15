import { queryEpisodes } from "./querys";
import Axios from "axios";
//removed one param = nextPage
//this function checks an array of pre-filtered id's and returns json if correct
//else returns an error.
async function checkNewEp(ArrofIDs, acc = []) {
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
      query: queryEpisodes,
      variables: variables,
    }),
  });
  const json = response.data;
  if (!response.status == 200) return Promise.reject(json);
  if (!json.data.Page.pageInfo.hasNextPage) {
    return acc.concat(json.data.Page.media);
  }
}
function removeDuplicates(arr) {
  //API server can send duplicate items at times, messing with need for React's unique key for mapped items
  return arr.reduce((acc, curr) => {
    acc.find((show) => show.id == curr.id) ? false : acc.push(curr);
    return acc;
  }, []);
}
async function compareForNewReleases(dispatch, watching, language) {
  if (!watching.length) return;
  console.log("checking for new releases");
  const episodesForQuery = watching
    .filter(
      (item) =>
        item.status === "RELEASING" || item.status === "NOT_YET_RELEASED"
    )
    .map((item) => item.id);
  const response = await checkNewEp(episodesForQuery);
  const hasNewEpisodes = response.filter((latestShowInfo) => {
    const sameShow = watching.find((show) => latestShowInfo.id === show.id);
    if (!sameShow) return;
    if (
      sameShow.status === "NOT_YET_RELEASED" &&
      latestShowInfo.status === "RELEASING"
    ) {
      //first ep aired
      return sameShow;
    }
    if (
      sameShow.status === "NOT_YET_RELEASED" &&
      latestShowInfo.status === "FINISHED"
    ) {
      //They dropped all the episodes at once
      return latestShowInfo;
    }
    if (
      sameShow.status === "RELEASING" &&
      latestShowInfo.status === "FINISHED"
    ) {
      //show finale aired
      return sameShow;
    }
    if (
      sameShow.status === "RELEASING" &&
      sameShow.episodeNumber < latestShowInfo.nextAiringEpisode.episode
    ) {
      //new ep, show is still ongoing
      return sameShow;
    }
  });
  console.log(hasNewEpisodes);
  if (hasNewEpisodes.length) {
    dispatch({ type: "newEpisodes", payload: hasNewEpisodes });
    dispatch({
      type: "watching",
      payload: updateNewEpisodes(watching, hasNewEpisodes, language),
    });
  }
}

function updateNewEpisodes(prevStates, toUpdateWith, language) {
  const unaffectedShows = prevStates.filter(
    (showObj) => !toUpdateWith.find((newShowObj) => showObj.id == newShowObj.id)
  );
  let updated = unaffectedShows.concat(
    toUpdateWith.map((show) => {
      const episodeNumber = show.nextAiringEpisode?.episode || null;
      const { id, status } = show;
      const title = show.title[language];
      return { title, id, episodeNumber, status };
    })
  );
  return updated;
}

export { removeDuplicates, checkNewEp, compareForNewReleases };
