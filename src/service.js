import { put, call, takeEvery } from 'redux-saga/effects';
import { settings } from 'rest-in-model';
import { message } from 'antd';
import { loggedIn, loggedOUt, authenticated, authenticate } from './actions';
import actionTypes from './action-types';
import { Auth } from './models';

export function* login(action) {
  const loginInstance = new Auth(action.userData);
  yield call(() =>
    loginInstance
      .save({ model: loginInstance })
      .then((response) => {
        response = response.response;
        if (response.key) {
          localStorage.setItem('token', response.key);
          settings.setHeader('Authorization', 'Token ' + response.key);
        }
      })
      .catch((err) => {
        console.error(err);
        message.error(err.response.non_field_errors);
      })
  );
  yield put(loggedIn());
  yield put(authenticate());
}

export function* doAuthentication(action) {
  let isAuthenticated = false;
  let currentUser = undefined;
  yield call(() =>
    Auth.all({ path: 'authUser' })
      .then((response) => {
        response = response.response;
        currentUser = response;
        isAuthenticated = true;
      })
      .catch((err) => {
        console.error(err);
        message.error(err.response.detail);
      })
  );
  yield put(authenticated(true || isAuthenticated, currentUser));
}

export function* logout(action) {
  const logoutInstance = new Auth({ key: localStorage.getItem('token') });
  Auth.save({ model: logoutInstance, path: 'logout' })
    .then((response) => {
      response = response.response;
      return response;
    })
    .catch((err) => {
      console.error(err);
      message.error(err.response.non_field_errors);
    });
  localStorage.clear();
  yield put(loggedOUt());
}

export default function* rootSaga() {
  yield takeEvery(actionTypes.LOGIN, login);
  yield takeEvery(actionTypes.AUTHENTICATE, doAuthentication);
  yield takeEvery(actionTypes.LOGOUT, logout);
}
