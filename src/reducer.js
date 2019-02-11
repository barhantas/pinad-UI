import actionTypes from "./action-types";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token") || true,
  currentUser: undefined,
  authenticating: false,
  logging: false,
  loggedIn: false,
  loggingOut: false,
  dataLoading: false,
  data: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return { ...state, logging: true };
    case actionTypes.LOGGED_IN:
      return { ...state, logging: false };
    case actionTypes.AUTHENTICATE:
      return { ...state, authenticating: true };
    case actionTypes.AUTHENTICATED:
      return {
        ...state,
        authenticating: false,
        isAuthenticated: action.isAuthenticated,
        currentUser: action.currentUser
      };
    case actionTypes.LOGOUT:
      return { ...state, loggingOut: true };
    case actionTypes.LOGGED_OUT:
      return { ...state, loggingOut: false };
    default:
      return state;
  }
};
