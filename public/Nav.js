import React from "react";
import { Link } from "@reach/router";
import { GoogleLogin, GoogleLogout } from "react-google-login";

export default function navbar({
  lastLocation,
  signInFunc,
  signOutFunc,
  isOnline,
}) {
  lastLocation ? (lastLocation = `${lastLocation}`) : (lastLocation = "/");
  const devClientId =
    "199155120744-c6co7khju4t1793gvhv9ap42t6mpia4i.apps.googleusercontent.com";
  return (
    <div className="navbar navbar-dark bg-dark">
      <h2 className="navbar-text">
        <Link
          to={lastLocation}
          onClick={() => {
            if (lastLocation == "/") {
              window.location.assign("/");
              return;
            }
          }}
        >
          Seasonal Anime
        </Link>
      </h2>

      {isOnline ? (
        <GoogleLogout
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={signOutFunc}
          theme="dark"
        />
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Login"
          onSuccess={signInFunc}
          onFailure={signInFunc}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          theme="dark"
          // responseType="code"
          uxMode="redirect"
          redirectUri="https://react-anime.herokuapp.com/"
        />
      )}
    </div>
  );
}
