import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import accountCreation from './accountCreation'
import login from './login'
import users from './users'

// export default function(state = {}, action) {
//     state.routing = routerReducer(state.routing, action)
//     return login(accountCreation(state, action), action)
// }

function authenticationCombinedReducer(state, action) {
    return login(accountCreation(state, action), action)
}

const reducers = combineReducers({
    authentication: authenticationCombinedReducer,
    users: users,
    routing: routerReducer
})

export default reducers
