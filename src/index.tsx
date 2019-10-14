import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import {createStore, compose, applyMiddleware, combineReducers} from 'redux';
import  { Provider } from 'react-redux';
import reducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';

import thunk from 'redux-thunk';

import createSagaMiddleware from 'redux-saga';
import {watchAuth, watchBurgerBuilder, watchOrder} from './store/sagas';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
      __REDUX_DEVTOOLS_EXTENSION__?: typeof compose
    }
  }
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  burgerBuilder: reducer,
  order: orderReducer
})

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk, sagaMiddleware)
    ));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrder)

const app = (
    <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
