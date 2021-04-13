# Seasonal Anime Chart

This app lets you view Anime information via Anilist's Graphql API, by seasonal sorted, card layout.
Powered by React, Parcel, Bootstrap and an Express server, which I found out is not really necessary once I moved my deployment off of Heroku to Netlify.
This was my first project in React.
(We all make mistakes! (Sorry for the jquery bloat)).

## Visit my live site!

If you'd like to check out the end result:

<link href="https://react-anime.netlify.app">Click Here!</link>

## Features

- Can sort "cards" in multiple ways. (Popularity, rating, air date)
- Can set sort by strictly seasonal, or ongoing shows
- Can filter between: TV, OVA, Movie formats.
- Can view more information by clicking 'More info' on cards.
- Can add shows cards to 'watching' or 'considering' status.
- Can save list into firebase via google login button.
- User's can get alerts via modal on site.
- Calendar view for viewing user's 'watching' status shows by weekly calendar layout.
- React suspense to serve minimal code in the client.

## Firebase and Google setup

This app requires a few enviornmental variables to be set to get Googel Oauth and Firebase Auth to work.

On your deployment site of choice set these variable with the ones you get off of registering for a new Firebase project

- REACT_APP_FIREBASE_API_KEY='something'
- REACT_APP_AUTH_DOMAIN='something'
- REACT_APP_PROJECT_ID='something'
- REACT_APP_STORAGE_BUCKET='something'
- REACT_APP_MESSAGING_SENDER_ID='something'
- REACT_APP_APP_ID='something'
- REACT_APP_MEASUREMENT_ID='something

This is for google login, you need to set up a new google project in your googel developer console and provide it with the appropriate redirect link (localhost:[port] for testing on dev server)
REACT_APP_REDIRECT_URL isn't in use in my project because I found it can be finicky so I just manually type it in on the login component inside of Nav.

- REACT_APP_CLIENT_ID='googleOauthClientIdThing_orSomething'
- process.env.REACT_APP_REDIRECT_URL='http://localhost:1234/'

## Install

To download and run your own copy, simply:

1.  `git clone` this repository.
2.  open this folder in your code editor of choice
3.  run `npm install` to install all the dependencies.
4.  (optional) setup .env file with firebase & google auth keys.
5.  run `npm run dev` to begin app.
