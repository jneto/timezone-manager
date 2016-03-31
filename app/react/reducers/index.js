import { routerReducer } from 'react-router-redux'

import accountCreation from './accountCreation'
import login from './login'

export default function(state = {}, action) {
    state.routing = routerReducer(state.routing, action)
    return login(accountCreation(state, action), action)
}
