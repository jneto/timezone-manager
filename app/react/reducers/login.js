import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/login'

export default function login(state={fetching: false}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                fetching: true,
                message: undefined,
                token: undefined
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                message: undefined,
                token: action.token
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                message: { content: action.message, success: false },
                token: undefined
            })
        case LOGOUT:
            return Object.assign({}, state, {
                fetching: false,
                message: undefined,
                token: undefined
            })
        default:
            return state
    }
}
