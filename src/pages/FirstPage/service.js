import { put, call, takeEvery } from 'redux-saga/effects';
import { safeSaga } from '../../helpers/index.js';
import { message } from 'antd';
import { messagesLoaded, messageLoaded, messageSent } from './actions';
import actionTypes from './action-types';
import { Message } from '../../models';

export function* loadMessages(action) {
  const res = yield call(() =>
    Message.all()
      .then((response) => response)
      .catch((err) => {
        console.error(err);
        message.error(err.response.detail);
      })
  );
  yield put(messagesLoaded(res.response));
}

export function* loadMessage(action) {
  yield call(() =>
    Message.get({ id: action.id })
      .then((response) => response)
      .catch((err) => {
        console.error(err);
        message.error(err.response.detail);
      })
  );
  yield put(messageLoaded());
}

export function* sendMessage(action) {
  const messageInstance = new Message({ context: action.context });
  const res = yield call(() =>
    messageInstance
      .save({ model: messageInstance })
      .then((response) => response)
      .catch((err) => {
        console.error(err);
        message.error(err.response.detail);
      })
  );
  yield put(messageSent(res && res.response));
}

export default function* messageSaga() {
  yield takeEvery(actionTypes.LOAD_MESSAGES, safeSaga(loadMessages));
  yield takeEvery(actionTypes.LOAD_MESSAGE, safeSaga(loadMessage));
  yield takeEvery(actionTypes.SEND_MESSAGE, safeSaga(sendMessage));
}
