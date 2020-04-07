import {applyMiddleware, createStore} from "redux";
import reducer from "./reducers";
import thunkMiddleWare from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunkMiddleWare)));

export default store;

