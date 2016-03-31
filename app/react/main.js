// import 'babel-polyfill'

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

import reducers from './reducers'

import LoginPage from './containers/LoginPage.js';
import CreateAccountPage from './containers/CreateAccountPage.js';

let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(browserHistory)
    )
)

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/login" component={LoginPage}/>
            <Route path="/createAccount" component={CreateAccountPage}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);
