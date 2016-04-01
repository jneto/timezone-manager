// import 'babel-polyfill'

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger';

import reducers from './reducers'

import LoginPage from './containers/LoginPage';
import CreateAccountPage from './containers/CreateAccountPage';
import UserListPage from './containers/UserListPage'
import UserEditPage from './containers/UserEditPage'

let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(browserHistory),
        createLogger()
    )
)

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/login" component={LoginPage}/>
            <Route path="/createAccount" component={CreateAccountPage}/>
            <Route path="/users" component={UserListPage}/>
            <Route path="/users/edit(/:id)" component={UserEditPage}/>
        </Router>
    </Provider>,
    document.getElementById('app')
);

            // <Route path="/users/view/:id" component={UserViewPage}/>
