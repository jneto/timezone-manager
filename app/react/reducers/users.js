import { 
    CHANGE_FILTER,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    SAVE_USER_REQUEST,
    SAVE_USER_SUCCESS,
    SAVE_USER_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE
} from '../actions/users'

export default function users(state={
    list: [],
    filters: {
        username: '',
        role: ''
    }}, action) {
    switch (action.type) {
        case CHANGE_FILTER:
            return Object.assign({}, state, {
                filters: {
                    username: action.username,
                    role: action.role
                }
            })
        case FETCH_USERS_REQUEST:
            return Object.assign({}, state, {
                fetching: true,
                list: [],
                message: undefined
            })
        case FETCH_USERS_SUCCESS:
            return  Object.assign({}, state, {
                fetching: false,
                list: action.users,
                message: undefined
            })
        case FETCH_USERS_FAILURE:
            return  Object.assign({}, state, {
                fetching: false,
                list: [],
                message: { content: action.message, success: false }
            })
        case DELETE_USER_REQUEST:
        case SAVE_USER_REQUEST:
        case CREATE_USER_REQUEST:
            return  Object.assign({}, state, {
                fetching: true,
                message: undefined
            })
        case DELETE_USER_SUCCESS:
        case SAVE_USER_SUCCESS:
        case CREATE_USER_SUCCESS:
            return  Object.assign({}, state, {
                fetching: false,
                message: { content: action.message, success: true }
            })
        case DELETE_USER_FAILURE:
        case SAVE_USER_FAILURE:
        case CREATE_USER_FAILURE:
            return  Object.assign({}, state, {
                fetching: false,
                message: { content: action.message, success: false }
            })
        default:
            return state
    }
}
