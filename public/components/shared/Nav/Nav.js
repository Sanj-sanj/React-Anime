import React from "react";
import { Link } from "@reach/router";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import "./nav.css";

export default function Navbar({
  signInFunc,
  signOutFunc,
  isOnline,
  dispatch,
}) {
  return (
    <div className="navbar navbar-dark bg-dark">
      <h2 className="navbar-text">
        <Link to={"/"}>Seasonal Anime</Link>
      </h2>

      {isOnline ? (
        <GoogleLogout
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={() => signOutFunc(dispatch)}
          theme="dark"
        />
      ) : (
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Login"
          onSuccess={(googleUser) => signInFunc(googleUser, dispatch)}
          onFailure={(googleUser) => signInFunc(googleUser, dispatch)}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          theme="dark"
          uxMode="redirect"
          redirectUri={process.env.REACT_APP_REDIRECT_URL}
        />
      )}
    </div>
  );
}
