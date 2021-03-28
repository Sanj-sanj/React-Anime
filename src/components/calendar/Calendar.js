import React from "react";
import requestAnimes from "../../js/requestAnimes";
import Spinner from "../shared/Spinner/Spinner";
import CalendarComponent from "./CalendarComponent/CalendarComponent";
import buildCalendarListArrays from "../../js/buildCalendarListArrays";
import { formatCalendarDate } from "../../js/formatDates";
import "./calendar.css";
const today = new Date().getDay();

const dateStringsArray = formatCalendarDate(today);

export default class Calendar extends React.Component {
  state = { loading: true };

  async componentDidMount() {
    console.log("fetching calendar");
    const { watching } = this.props.props.state;
    const id_in = watching.map((show) => {
      if (show.status == "RELEASING") {
        return show.id;
      }
    });
    const res = await requestAnimes(
      { id_in: id_in },
      null,
      undefined,
      null,
      null,
      "queryDetails"
    );
    this.props.props.dispatch({ type: "updateCalendar", payload: res });
    this.setState({ data: res, loading: false });
  }
  async componentDidUpdate(prevProps) {
    const { watching } = this.props.props.state;
    const { watching: prevWatching } = prevProps.props.state;
    if (prevWatching.length !== watching.length) {
      console.log("doing componentDidUpdate API CALL");
      const id_in = watching.map((show) => {
        if (show.status == "RELEASING") {
          return show.id;
        }
      });
      const res = await requestAnimes(
        { id_in: id_in },
        null,
        undefined,
        null,
        null,
        "queryDetails"
      );
      this.setState({ data: res, loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <Spinner hasRendered={this.state.loading} />;
    }
    const { data } = this.state;
    if (!data.length) {
      return (
        <React.Fragment>
          <h2>Add something to your watch list!</h2>
        </React.Fragment>
      );
    }
    const filteredShowArrays = buildCalendarListArrays(dateStringsArray, data);

    return (
      <div className="container ">
        <div className="card-title">
          <h1>Calendar</h1>
        </div>
        <CalendarComponent
          dateStringsArray={dateStringsArray}
          filteredShowArrays={filteredShowArrays}
        />
      </div>
    );
  }
}
