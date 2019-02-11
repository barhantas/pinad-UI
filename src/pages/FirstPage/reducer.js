import actionTypes from './action-types';

const initialState = {
  messages: [],
  messagesLoading: false,
  message: {},
  messageLoading: false,
  messageSending: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_MESSAGES:
      return { ...state, messagesLoading: true };
    case actionTypes.MESSAGES_LOADED:
      return { ...state, messages: action.messages, messagesLoading: false };
    case actionTypes.LOAD_MESSAGE:
      return { ...state, messageLoading: true };
    case actionTypes.MESSAGE_LOADED:
      return { ...state, messages: action.message, messageLoading: false };
    case actionTypes.SEND_MESSAGE:
      return { ...state, messageSending: true };
    case actionTypes.MESSAGE_SENT:
      return { ...state, messageSending: false };
    case actionTypes.CAPTURE_MESSAGE:
      return { ...state, messages: [action.message, ...state.messages] };
    default:
      return state;
  }
};
