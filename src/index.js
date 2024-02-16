import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import "bulma/css/bulma.css";
//import "./index.css";


import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from '../src/Reducers';
import thunk from 'redux-thunk';
//import axios from "axios";
import { CookiesProvider } from 'react-cookie';

const store = createStore(reducers, applyMiddleware(thunk));
//axios.defaults.withCredentials = true


ReactDOM.render(
  <CookiesProvider>
	  <Provider store={store}>
		<App />
	  </Provider>
  </CookiesProvider>,
  document.getElementById('root')
);