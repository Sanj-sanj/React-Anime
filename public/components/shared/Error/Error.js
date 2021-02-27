import React, { Component } from "react";
// import { Link, Redirect } from "@reach/router";

class Error extends Component {
  state = { hasError: false };
  static getDerivedStateFromErrr() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log("Error bouncdary caught an error", error, info);
  }
  // componentDidUpdate() {
  //     if(this.state.hasError) {
  //         setT
  //     }
  // }
  render() {
    if (this.state.hasError) {
      return (
        <h1>There has been an error, try again. I dont know whats wrong.</h1>
      )
    }
    return this.props.children;
  }
}
export default Error;
