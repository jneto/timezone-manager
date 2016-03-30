import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actions'

export default function login(state={logginIn: false}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                loggingIn: true,
                message: '',
                token: undefined
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                loggingIn: false,
                message: '',
                token: action.token
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                loggingIn: false,
                message: action.message,
                token: undefined
            })
        default:
            return state
    }
}
