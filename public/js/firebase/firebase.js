import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

async function onSignOut(dispatch) {
  try {
    await firebase.auth().signOut();
    dispatch({ type: "logout" });
    return console.log("Signed Out");
  } catch (error) {
    console.log(`Error signing out of firebase: ${error}`);
  }
}

async function onSignIn(googleUser, dispatch) {
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var unsubscribe = firebase.auth().onAuthStateChanged(async (firebaseUser) => {
    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
        googleUser.getAuthResponse().id_token
      );
      console.log("signing in");
      try {
        await firebase.auth().signInWithCredential(credential);
        dispatch({ type: "currentUser", payload: googleUser.profileObj });
        dispatch({ type: "isOnline", payload: true });
        refreshTokenSetup(googleUser);
        return;
      } catch (error) {
        console.log("Could not sign in: " + error);
      }
      // Sign in with credential from the Google user.
    } else {
      refreshTokenSetup(googleUser);
      dispatch({ type: "currentUser", payload: googleUser.profileObj });
      dispatch({ type: "isOnline", payload: true });
      console.log("User already signed-in Firebase.");
      return;
    }
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
    //setup the other timer after the first one
    setTimeout(refreshToken, refreshTiming);
  };
  //setup first refresh timer
  setTimeout(refreshToken, refreshTiming);
}

async function readFromDB(googleUserID, dispatch) {
  console.log("reading from db");
  try {
    const docRef = firestore.collection("users").doc(googleUserID);
    const doc = await docRef.get();
    if (doc.exists) {
      const { watching, considering } = doc.data();
      dispatch({ type: "watching", payload: JSON.parse(watching) });
      dispatch({ type: "considering", payload: JSON.parse(considering) });
      console.log("FOUND DOCUMENT");
    } else {
      // doc.data() will be undefined in this case /* could */ be user's first login
      console.log("No such document!");
    }
  } catch (error) {
    console.log("Error getting document:", error);
    //incase error getting doc, sign user out
    onSignOut();
  }
}
async function writeToDB(watching, considering, googleId) {
  try {
    console.log("writing to db");
    await firestore
      .collection("users")
      .doc(`${googleId}`)
      .set({
        watching: JSON.stringify(watching),
        considering: JSON.stringify(considering),
      });
  } catch (error) {
    console.log(`Error writting document: ${error}`);
  }
}
export { firestore, onSignIn, onSignOut, readFromDB, writeToDB };
