import actionTypes from "./action-types";

export const loadMessages = () => {
  return { type: actionTypes.LOAD_MESSAGES };
};

export const messagesLoaded = messages => {
  return { type: actionTypes.MESSAGES_LOADED, messages };
};

export const loadMessage = id => {
  return { type: actionTypes.LOAD_MESSAGE, id };
};

export const messageLoaded = message => {
  return { type: actionTypes.MESSAGE_LOADED, message };
};

export const sendMessage = context => {
  return { type: actionTypes.SEND_MESSAGE, context };
};

export const messageSent = () => {
  return { type: actionTypes.MESSAGE_SENT };
};
