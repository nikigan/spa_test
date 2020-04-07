import React from 'react';
import ReactDOM from 'react-dom';
import 'element-theme-default';
import 'bootstrap/scss/bootstrap.scss';
import {Provider} from "react-redux";
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history'
import store from "./store";
import App from "./components/App";

export const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
        <App/>
      </Router>
  </Provider>,
  document.getElementById('root'));
