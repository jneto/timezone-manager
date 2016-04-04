
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import createLogger from 'redux-logger'
import {persistStore, autoRehydrate} from 'redux-persist'

import reducers from './reducers'

import AppContainer from './containers/AppContainer'
import LoginPage from './containers/LoginPage'
import CreateAccountPage from './containers/CreateAccountPage'
import UserListPage from './containers/UserListPage'
import UserEditPage from './containers/UserEditPage'
import UserViewPage from './containers/UserViewPage'
import TimezoneListPage from './containers/TimezoneListPage'
import TimezoneEditPage from './containers/TimezoneEditPage'
import TimezoneViewPage from './containers/TimezoneViewPage'

let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        routerMiddleware(browserHistory),
        createLogger()
    ),
    autoRehydrate()
)
persistStore(store)

const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/login" component={LoginPage} onEnter={(nextState, replace) => {
                const state = store.getState()
                if (state.authentication.token) {
                    replace('/timezones')
                }
            }}/>
            <Route path="/createAccount" component={CreateAccountPage} onEnter={(nextState, replace) => {
                const state = store.getState()
                if (state.authentication.token) {
                    replace('/timezones')
                }
            }}/>
            <Route path="/" component={AppContainer} onEnter={(nextState, replace) => {
                const state = store.getState()
                if (!state.authentication.token) {
                    replace('/login')
                }
            }}>
                <IndexRedirect to="/timezones"/>
                <Route path="/users" component={UserListPage}/>
                <Route path="/users/edit(/:id)" component={UserEditPage}/>
                <Route path="/users/view/:id" component={UserViewPage}/>
                <Route path="/timezones" component={TimezoneListPage}/>
                <Route path="/timezones/edit(/:id)" component={TimezoneEditPage}/>
                <Route path="/timezones/view/:id" component={TimezoneViewPage}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)

