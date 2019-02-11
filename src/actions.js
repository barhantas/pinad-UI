import actionTypes from './action-types';

export const login = (userData) => {
  return { type: actionTypes.LOGIN, userData };
};

export const loggedIn = () => {
  return { type: actionTypes.LOGGED_IN };
};

export const authenticate = () => {
  return { type: actionTypes.AUTHENTICATE };
};

export const authenticated = (isAuthenticated, currentUser) => {
  return {
    type: actionTypes.AUTHENTICATED,
    isAuthenticated,
    currentUser,
  };
};

export const logout = () => {
  return { type: actionTypes.LOGOUT };
};

export const loggedOUt = () => {
  return { type: actionTypes.AUTHENTICATE };
};
