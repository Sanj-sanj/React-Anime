import React from "react";
import requestAnimes from "../../js/requestAnimes";
import buildCalendarListArrays from "../../js/buildCalendarListArrays";
import { formatCalendarDate } from "../../js/formatDates";

import Spinner from "../shared/Spinner/Spinner";
import DailyCalendarCard from "./DailyCalendarCard/DailyCalendarCard";
import CalendarHeader from "./CalendarHeader/CalendarHeader";
import Timetable from "./Timetable/Timetable";

import "./calendar.css";
const today = new Date().getDay();

const dateStringsArray = formatCalendarDate(today);

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hasError: false,
      data: [],
      filteredShowArrays: [],
    };
  }

  async componentDidMount() {
    const { watching } = this.props.props.state;
    const filteredIds = watching
      .filter(
        (i) => i.status === "RELEASING" || i.status === "NOT_YET_RELEASED"
      )
      .map((v) => v.id);

    const res = await requestAnimes(
      { id_in: filteredIds },
      null,
      undefined,
      null,
      null,
      "queryDetails"
    );
    this.props.props.dispatch({ type: "updateCalendar", payload: res });
    this.setState({
      data: res,
      loading: false,
      filteredShowArrays: buildCalendarListArrays(dateStringsArray, res),
    });
  }
  async componentDidUpdate(prevProps) {
    //if user goes to calendar before firebase returns user data.
    const { watching } = this.props.props.state;
    const { watching: prevWatching } = prevProps.props.state;
    const filteredIds = watching
      .filter(
        (i) => i.status === "RELEASING" || i.status === "NOT_YET_RELEASED"
      )
      .map((v) => v.id);

    if (prevWatching.length !== watching.length) {
      try {
        const res = await requestAnimes(
          { id_in: filteredIds },
          null,
          undefined,
          null,
          null,
          "queryDetails"
        );
        this.setState({
          data: res,
          loading: false,
          filteredShowArrays: buildCalendarListArrays(dateStringsArray, res),
        });
      } catch (err) {
        this.setState({ loading: false, hasError: true });
      }
    }
  }

  render() {
    return (
      <>
        <CalendarHeader />
        {this.state.loading ? (
          <Spinner hasRendered={this.state.loading} />
        ) : this.state.hasError ? (
          <h3>
            Oops... Something went wrong! Sadly I am not intelligent enough to
            disclose the issue let alone try to resolve it. Please try
            re-navigating back here, or try again after some time.
          </h3>
        ) : (
          <div className="container">
            {/* <DailyCalendarCard
              dateStringsArray={dateStringsArray}
              filteredShowArrays={buildCalendarListArrays(
                dateStringsArray,
                this.state.data
              )}
            /> */}
            {/* <Timetable
              dateStringsArray={dateStringsArray}
              filteredShowArrays={buildCalendarListArrays(
                dateStringsArray,
                this.state.data
              )}
            /> */}

            {dateStringsArray?.map((dateString, i) => (
              <Timetable
                key={dateString}
                date={dateString}
                showsArray={this.state.filteredShowArrays[i]}
              />
            ))}
          </div>
        )}
      </>
    );
  }
}
