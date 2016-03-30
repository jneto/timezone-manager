// import 'babel-polyfill'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers'

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'

import LoginPage from './containers/LoginPage.js';

let store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
)

render(
    <Provider store={store}>
        <LoginPage/>
    </Provider>,
    document.getElementById('app')
);
