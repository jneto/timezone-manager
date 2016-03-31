import { ACCOUNT_CREATION_FETCH, ACCOUNT_CREATION_SUCCESS, ACCOUNT_CREATION_FAILURE } from '../actions/accountCreation'

export default function(state={fetching: false}, action) {
    switch (action.type) {
        case ACCOUNT_CREATION_FETCH:
            return Object.assign({}, state, {
                fetching: true,
                message: undefined
            })
        case ACCOUNT_CREATION_SUCCESS:
            return Object.assign({}, state, {
                fetching: false,
                message: {content: action.message, success: true}
            })
        case ACCOUNT_CREATION_FAILURE:
            return Object.assign({}, state, {
                fetching: false,
                message: {content: action.message, success: false}
            })
        default:
            return state
    }
}
