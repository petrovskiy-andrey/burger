import axios from 'axios';
import * as actionTypes from './action.types';
import { signUpUrl, signInUrl } from '../../config/firebase-urls';

const authStart = () => ({
  type: actionTypes.AUTH_START,
});

const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  token,
  userId,
});

const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return (dispatch, getState) => {
    const state = getState();
    state.order.orders = [];
    dispatch({ type: actionTypes.AUTH_LOGOUT });
  };
};

const checkAuthTimeout = (expiresIn) => {
  return (dispatch) => {
    setTimeout(() => dispatch(logout()), +expiresIn * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    const url = isSignUp ? signUpUrl : signInUrl;

    axios
      .post(url, authData)
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );

        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);

        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch((err) => dispatch(authFail(err.response.data.error)));
  };
};

export const setAuthRedirectPath = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(logout());
    }

    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    if (expirationDate > new Date()) {
      const userId = localStorage.getItem('userId');
      dispatch(authSuccess(token, userId));
      dispatch(checkAuthTimeout((expirationDate - new Date()) / 1000));
    } else {
      dispatch(logout());
    }
  };
};
