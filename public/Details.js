import React, { useState, useEffect } from "react";
import requestAnimes from "./requestAnimes";
import MoreInfo from "./MoreInfo";
import Spinner from "./Spinner";

export default function goToMoreInfoWithNewDataAndLastPage(props) {
  const [data, setData] = useState({});
  const [lastPage, setLastPage] = useState("/");
  useEffect(() => {
    setData({});
    requestAnimes({ id: props.id }).then((vals) => {
      setData(...vals);
      setLastPage(props.lastPage);
    });
  }, [props.id]);

  return data.id ? (
    <MoreInfo data={data} lastPage={lastPage} states={props.states} />
  ) : (
    <Spinner hasRendered={data} />
  );
}
