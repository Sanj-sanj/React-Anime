import React from "react";
import "./calendarHeader.css";

class CalendarHeader extends React.Component {
  state = {
    toggle: Function,
    view: String,
  };

  static getDerivedStateFromProps({ toggle, view }) {
    if (toggle && view) {
      return { toggle, view };
    }
  }

  render() {
    const { toggle, view } = this.state;
    return (
      <>
        <div className="alert alert-dark">
          <div className="border-bottom border-dark row justify-content-start align-items-center">
            <div className="nav-title d-flex">
              <h2 className="mb-0 calendar-header-title">Calendar</h2>
            </div>
            <div className="d-flex calendar-views">
              <button
                className={`btn ${view === "calendar" ? "active-view" : ""}`}
                value="calendar"
                onClick={(e) => toggle(e.target.value)}
              >
                Calendar
              </button>
              <button
                className={`btn ${view === "timetable" ? "active-view" : ""}`}
                value="timetable"
                onClick={(e) => toggle(e.target.value)}
              >
                Timetable
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CalendarHeader;
