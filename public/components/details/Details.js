import React, { useState, useEffect } from "react";
import requestAnimes from "../../js/requestAnimes";
import MoreInfo from "./MoreInfo";
import Spinner from "../shared/Spinner";
import checkNewEp from "../../js/checkNewEpisodes";

export default function goToMoreInfoWithNewDataAndLastPage(props) {
  const [data, setData] = useState({});
  const [lastPage, setLastPage] = useState("/");
  const [isFetching, setIsFetching] = useState(true);

  function updateNewEpisodes(arrOfNewShows) {
    const unaffectedShows = props.states.watchStates.filter(
      (show) => !arrOfNewShows.find((newEp) => show.id == newEp.id)
    );
    let updated = unaffectedShows.concat(
      arrOfNewShows.map((show) => {
        const episodeNumber = show.nextAiringEpisode
          ? show.nextAiringEpisode.episode
          : null;
        const id = show.id;
        const title = show.title["romaji"];
        const status = show.status;
        return { title, id, episodeNumber, status };
      })
    );
    // console.log(updated);
    return updated;
  }

  async function checkForNewReleases() {
    if (!props.states.watchStates.length) return;
    // console.log(props);
    console.log("checking for new releases");
    const episodesForQuery = props.states.watchStates
      .filter(
        (item) =>
          item.status == "RELEASING" || item.status == "NOT_YET_RELEASED"
      )
      .map((item) => item.id);
    const response = await checkNewEp(episodesForQuery);
    // console.log(episodesForQuery);
    // console.log(response);

    const hasNewEpisodes = response.filter((latestShowInfo) => {
      const sameShow = props.states.watchStates.find(
        (show) => latestShowInfo.id == show.id
      );
      if (!sameShow) return;
      if (
        sameShow.status == "NOT_YET_RELEASED" &&
        latestShowInfo.status == "RELEASING"
      ) {
        //first ep aired
        return sameShow;
      }
      if (
        sameShow.status == "RELEASING" &&
        latestShowInfo.status == "FINISHED"
      ) {
        //show finale aired
        return sameShow;
      }
      if (
        sameShow.status == "RELEASING" &&
        sameShow.episodeNumber < latestShowInfo.nextAiringEpisode.episode
      ) {
        //new ep, show is still ongoing
        return sameShow;
      }
    });

    if (hasNewEpisodes.length) {
      props.setNewEpisodes(hasNewEpisodes);
      props.states.setWatchStates(updateNewEpisodes(hasNewEpisodes));
    }
  }

  useEffect(async () => {
    setData({});
    await requestAnimes({ id: props.id }).then((vals) => {
      setData(...vals);
      setLastPage(props.lastPage);
    });

    setIsFetching(false);
  }, [props.id]);

  useEffect(() => {
    if (props.isOnline && isFetching) {
      props.readFromDB(props.currentUser.googleId);
    }
    if (props.isOnline && !isFetching) {
      checkForNewReleases();
    }
  }, [props.isOnline, isFetching]);

  return data.id ? (
    <MoreInfo
      data={data}
      lastPage={lastPage}
      states={props.states}
      onSignIn={props.onSignIn}
      onSignOut={props.onSignOut}
      isOnline={props.isOnline}
      newEpisodes={props.newEpisodes}
      setNewEpisodes={props.setNewEpisodes}
    />
  ) : (
    <Spinner hasRendered={data} />
  );
}
