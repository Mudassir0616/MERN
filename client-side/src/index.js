import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import {applyMiddleware, compose, legacy_createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers';


const store = legacy_createStore(reducers, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
  
);


