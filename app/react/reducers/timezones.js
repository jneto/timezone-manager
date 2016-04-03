import { 
    CHANGE_TIMEZONE_FILTER,
    FETCH_TIMEZONES_REQUEST,
    FETCH_TIMEZONES_SUCCESS,
    FETCH_TIMEZONES_FAILURE,
    DELETE_TIMEZONE_REQUEST,
    DELETE_TIMEZONE_SUCCESS,
    DELETE_TIMEZONE_FAILURE,
    SAVE_TIMEZONE_REQUEST,
    SAVE_TIMEZONE_SUCCESS,
    SAVE_TIMEZONE_FAILURE,
    CREATE_TIMEZONE_REQUEST,
    CREATE_TIMEZONE_SUCCESS,
    CREATE_TIMEZONE_FAILURE
} from '../actions/timezones'

export default function timezones(state={
    list: [],
    filters: ''}, action) {
    switch (action.type) {
        case CHANGE_TIMEZONE_FILTER:
            return Object.assign({}, state, {
                filter: action.filter
            })
        case FETCH_TIMEZONES_REQUEST:
            return Object.assign({}, state, {
                fetching: true,
                list: []
            })
        case FETCH_TIMEZONES_SUCCESS:
            return  Object.assign({}, state, {
                fetching: false,
                list: action.timezones
            })
        case FETCH_TIMEZONES_FAILURE:
            return  Object.assign({}, state, {
                fetching: false,
                list: [],
                message: { content: action.message, success: false }
            })
        case DELETE_TIMEZONE_REQUEST:
        case SAVE_TIMEZONE_REQUEST:
        case CREATE_TIMEZONE_REQUEST:
            return  Object.assign({}, state, {
                fetching: true,
                message: undefined
            })
        case DELETE_TIMEZONE_SUCCESS:
        case SAVE_TIMEZONE_SUCCESS:
        case CREATE_TIMEZONE_SUCCESS:
            return  Object.assign({}, state, {
                fetching: false,
                message: { content: action.message, success: true }
            })
        case DELETE_TIMEZONE_FAILURE:
        case SAVE_TIMEZONE_FAILURE:
        case CREATE_TIMEZONE_FAILURE:
            return  Object.assign({}, state, {
                fetching: false,
                message: { content: action.message, success: false }
            })
        default:
            return state
    }
}
