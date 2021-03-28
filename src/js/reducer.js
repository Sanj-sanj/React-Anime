export default function reducer(state, action) {
  const payload = action.payload;
  switch (action.type) {
    //for watching and considering, the first 2 if checks prevent nesting of the payload from database, db returns [{}], where as {x:'y'} needed
    case "watching":
      if (Array.isArray(payload) && !payload.length) return state;
      if (Array.isArray(payload)) {
        return { ...state, watching: [...payload] };
      }
      if (state.watching.find((epObj) => epObj.id == action.payload.id)) {
        const newWatching = state.watching.filter(
          (epObj) => epObj.id != action.payload.id
        );
        return { ...state, watching: newWatching };
      }
      if (state.considering.find((epObj) => epObj.id == action.payload.id)) {
        state.considering = state.considering.filter(
          (epObj) => epObj.id != action.payload.id
        );
      }
      return { ...state, watching: [...state.watching, payload] };
    case "considering":
      if (Array.isArray(payload) && !payload.length) return state;
      if (Array.isArray(payload)) {
        return { ...state, considering: payload };
      }
      if (state.considering.find((epObj) => epObj.id == action.payload.id)) {
        const newConsidering = state.considering.filter(
          (epObj) => epObj.id != action.payload.id
        );
        return { ...state, considering: newConsidering };
      }
      if (state.watching.find((epObj) => epObj.id == action.payload.id)) {
        state.watching = state.watching.filter(
          (epObj) => epObj.id != action.payload.id
        );
      }
      return { ...state, considering: [...state.considering, payload] };

    case "newEpisodes":
      return { ...state, newEpisodes: payload };
    case "isOnline":
      return { ...state, isOnline: payload };
    case "currentUser":
      return { ...state, currentUser: payload };
    case "updateData":
      return { ...state, data: [...payload] };
    case "updateCalendar":
      return { ...state, calendar: [...payload] };
    case "format":
      state.format = payload;
      return state;
    case "season":
      state.season = payload;
      return state;
    case "logout":
      return {
        ...state,
        watching: new Array(0),
        considering: new Array(0),
        currentUser: "",
        isOnline: false,
      };
    default:
      throw new Error();
  }
}
