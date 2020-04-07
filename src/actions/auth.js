import {onFavoriteLoaded} from "./favorite";
import {Message} from "element-react";
import AuthService from "../services/authService";
import {history} from "../index";

const authService = new AuthService();

const onUserLogInError = (error) => {
  return {
    type: 'USER_LOG_IN_ERROR',
    payload: error
  }
};

const onUserLogIn = (login, password) => dispatch => {

  dispatch({
    type: 'USER_LOG_IN'
  });

  authService.loginUser(login, password)
    .then(user => {
      history.push('/');
      dispatch(onUserLoggedIn(user));
      Message({
        message: 'Успешная авторизация! Здравствуйте, ' + user.login,
        type: 'success'
      });
    })
    .catch(error => {
      dispatch(onUserLogInError(error));
      Message({
        message: 'Ошибка авторизации! Неверный логин или пароль!',
        type: 'error'
      });
    });
};

const onUserLoggedIn = user => dispatch => {
  localStorage.setItem('userToken', user.userToken);

  dispatch({
    type: 'USER_LOGGED_IN',
    payload: user
  });
  dispatch(onFavoriteLoaded());
};

const onUserLoggedOut = () => {
  localStorage.removeItem('userToken');

  return {
    type: 'USER_LOGGED_OUT'
  }
};

const onTokenLoaded = () => (dispatch) => {

  const userToken = localStorage.getItem('userToken');

  authService.getUserInfo(userToken)
    .then(user => {
      if (user) {
        dispatch(onUserLoggedIn(user));
      }
    });
};


export {
  onUserLoggedIn,
  onUserLoggedOut,
  onUserLogIn,
  onUserLogInError,
  onTokenLoaded
}