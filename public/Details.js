import React, { useState, useEffect } from "react";
import requestAnimes from "./requestAnimes";
import MoreInfo from "./MoreInfo";
import Spinner from "./Spinner";
// import { render } from "react-dom";

export default function requestAnimeById(props) {
  const [data, setData] = useState({});
  useEffect(() => {
    requestAnimes({ id: props.id }).then((vals) => {
      setData(...vals);
    });
  }, []);

  return data.id ? <MoreInfo props={data} /> : <Spinner watch={data} />;
}
