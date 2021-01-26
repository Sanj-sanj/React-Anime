import "regenerator-runtime/runtime";
import dotenv from "dotenv";

import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import Parameters from "./Parameters";
import Details from "./Details";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const App = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [currLocation, setCurrLocation] = useState("/");
  const [signedIn, setSignedIn] = useState(false);
  const [data, setData] = useState([]);
  const [watchStates, setWatchStates] = useState([]);
  const [considerStates, setConsiderStates] = useState([]);
  const [newEpisodes, setNewEpisodes] = useState([]);

  async function onSignOut() {
    console.log("Signed Out");
    await writeToDB();
    firebase.auth().signOut();
    setCurrentUser("");
    setWatchStates([]);
    setConsiderStates([]);
    setSignedIn(false);
  }

  async function onSignIn(googleUser) {
    // console.log("Google Auth Response", googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token
        );
        console.log("signing in");
        try {
          firebase
            .auth()
            .signInWithCredential(credential)
            .catch((error) => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
              console.log({ errorCode, errorMessage, email, credential });
            });
          // console.log(firebaseUser);
          setSignedIn(true);
          setCurrentUser(googleUser.profileObj);
          refreshTokenSetup(googleUser);
        } catch (error) {
          console.log("Could not sign in.");
          console.log(error);
        }

        // Sign in with credential from the Google user.
      } else {
        setCurrentUser(googleUser.profileObj);
        refreshTokenSetup(googleUser);
        setSignedIn(true);
        console.log("User already signed-in Firebase.");
      }
      // readFromDB(googleUser.profileObj.googleId);
    });
  }
  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }
  function refreshTokenSetup(res) {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    const refreshToken = async () => {
      console.log("refresh token");
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      //saveUserToken(newAuthRes.acces_token) <--save new token
      //setup the other timer after the first one
      setTimeout(refreshToken, refreshTiming);
    };
    //setup first refresh timer
    setTimeout(refreshToken, refreshTiming);
  }
  function readFromDB(googleUserID) {
    const docRef = firestore.collection("users").doc(googleUserID);
    console.log("reading from db");
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          const { watching, considering } = doc.data();
          setWatchStates(JSON.parse(watching));
          setConsiderStates(JSON.parse(considering));
          console.log("FOUND DOCUMENT");
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setWatchStates([]);
          setConsiderStates([]);
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  }
  function writeToDB() {
    firestore
      .collection("users")
      .doc(`${currentUser.googleId}`)
      .set({
        watching: JSON.stringify(watchStates),
        considering: JSON.stringify(considerStates),
      })
      .then(function () {
        return console.log("Document successfully written");
      })
      .catch(function (error) {
        return console.log(`Error writting document: ${error}`);
      });
  }

  useEffect(async () => {
    if (signedIn && currentUser) await readFromDB(currentUser.googleId);
  }, [signedIn, currLocation, currentUser]);

  useEffect(() => {
    if (currentUser && signedIn) writeToDB();
  }, [watchStates, considerStates]);

  return (
    <Router>
      <Parameters
        path="/:prevSeasonDashPrevYear/:prevFormat"
        setCurrLocation={setCurrLocation}
        data={data}
        setData={setData}
        currLocation={currLocation}
        watchStates={watchStates}
        setWatchStates={setWatchStates}
        considerStates={considerStates}
        setConsiderStates={setConsiderStates}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        isOnline={signedIn}
        setNewEpisodes={setNewEpisodes}
        newEpisodes={newEpisodes}
      />
      <Parameters
        path="/"
        setCurrLocation={setCurrLocation}
        data={data}
        setData={setData}
        currLocation={currLocation}
        watchStates={watchStates}
        setWatchStates={setWatchStates}
        considerStates={considerStates}
        setConsiderStates={setConsiderStates}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        isOnline={signedIn}
        setNewEpisodes={setNewEpisodes}
        newEpisodes={newEpisodes}
      />
      <Details
        path="/details/:id"
        lastPage={currLocation}
        lastData={data}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
        isOnline={signedIn}
        states={{
          watchStates,
          considerStates,
          setWatchStates,
          setConsiderStates,
        }}
        setNewEpisodes={setNewEpisodes}
        newEpisodes={newEpisodes}
        currentUser={currentUser}
        readFromDB={readFromDB}
      />
    </Router>
  );
};
render(<App />, document.getElementById("root"));
