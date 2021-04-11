import React, { useState, useEffect } from "react";
import requestAnimes from "../../js/requestAnimes";
const MoreInfo = React.lazy(() => import("./MoreInfo/MoreInfo"));
import { compareForNewReleases } from "../../js/checkNewEpisodes";
import Spinner from "../shared/Spinner/Spinner";

export default function Details({ state, dispatch, id, onSignIn, onSignOut }) {
  const [data, setData] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const language = (() => {
    try {
      return JSON.parse(localStorage.getItem("language")) ?? "romaji";
    } catch (err) {
      return false;
    }
  })();

  useEffect(async () => {
    setIsFetching(true);
    const res = await requestAnimes(
      { id: id },
      null,
      undefined,
      null,
      null,
      "queryDetails"
    );
    setData(...res);
    setIsFetching(false);
    compareForNewReleases(dispatch, state.watching, language);
  }, [id]);

  if (!isFetching)
    return (
      <MoreInfo
        data={data}
        state={state}
        dispatch={dispatch}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        language={language}
      />
    );
  return <Spinner hasRendered={isFetching} />;
}
