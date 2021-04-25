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
      viewMode: (() => {
        try {
          return (
            JSON.parse(localStorage.getItem("calendar-view")) || "calendar"
          );
        } catch (error) {
          return "calendar";
        }
      })(),
      innerWidth: window.innerWidth,
    };
  }

  getWindowSize = () => this.setState({ innerWidth: window.innerWidth });

  toggle = (value) => {
    try {
      this.setState({ viewMode: value });
      return localStorage.setItem("calendar-view", JSON.stringify(value));
    } catch (err) {
      return err;
    }
  };

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
        });
      } catch (err) {
        this.setState({ loading: false, hasError: true });
      }
    }
  }

  render() {
    const { toggle } = this;
    const { loading, viewMode, innerWidth, data } = this.state;

    return (
      <>
        <CalendarHeader toggle={toggle} view={viewMode} />
        {this.state.loading ? (
          <Spinner hasRendered={loading} />
        ) : this.state.hasError ? (
          <h3>
            Oops... Something went wrong! Sadly I am not intelligent enough to
            disclose the issue let alone try to resolve it. Please try
            re-navigating back here, or try again after some time.
          </h3>
        ) : (
          <>
            <div
              className={
                viewMode === "calendar" ? "container" : "container-fluid"
              }
            >
              {viewMode === "calendar" ? (
                <DailyCalendarCard
                  dateStringsArray={dateStringsArray}
                  filteredShowArrays={buildCalendarListArrays(
                    dateStringsArray,
                    data
                  )}
                />
              ) : (
                <div className="d-flex flex-wrap justify-content-center">
                  {dateStringsArray?.map((dateString, i) => (
                    <Timetable
                      key={dateString}
                      date={dateString}
                      showsArray={
                        buildCalendarListArrays(
                          dateStringsArray,
                          data,
                          "timetable"
                        )[i]
                      }
                      innerWidth={innerWidth}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </>
    );
  }
}
