import React, { useState, useEffect, Suspense } from "react";
import requestAnimes from "../../js/requestAnimes";
const MoreInfo = React.lazy(() => import("./MoreInfo/MoreInfo"));
import Spinner from "../shared/Spinner/Spinner";
import { compareForNewReleases } from "../../js/checkNewEpisodes";

export default function Details({
  state,
  dispatch,
  id,
  onSignIn,
  onSignOut,
  LazyLoad,
}) {
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

  return isFetching ? (
    <Spinner hasRendered={isFetching} />
  ) : (
    <Suspense fallback={<Spinner hasRendered={true} />}>
      <MoreInfo
        data={data}
        state={state}
        dispatch={dispatch}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        LazyLoad={LazyLoad}
        language={language}
      />
    </Suspense>
  );
}
