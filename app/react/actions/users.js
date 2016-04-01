import request from 'superagent'

export const CHANGE_FILTER = 'CHANGE_FILTER'

export function changeFilter(username, role) {
    return {
        type: CHANGE_FILTER,
        username,
        role
    }
}

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'

function fetchUsersRequest() {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'

function fetchUsersSuccess(users) {
    return {
        type: FETCH_USERS_SUCCESS,
        users
    }
}

export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

function fetchUsersFailure(message) {
    return {
        type: FETCH_USERS_FAILURE,
        message
    }
}

export function fetchUsers() {
    return (dispatch, getState) => {
        dispatch(fetchUsersRequest())
        let state = getState()
        request.get('/api/users')
            .set('x-access-token', state.authentication.token)
            .end((err, res) => {
                if (err) {
                    dispatch(fetchUsersFailure(err.status + ': ' + err.message))
                } else if (!res.body.success) {
                    dispatch(fetchUsersFailure(res.body.message))
                } else {
                    dispatch(fetchUsersSuccess(res.body.users))
                }
            })
    }
}

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST'

function deleteUserRequest() {
    return {
        type: DELETE_USER_REQUEST
    }
}

export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'

function deleteUserSuccess(message, id) {
    return {
        type: DELETE_USER_SUCCESS,
        message
    }
}

export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE'

function deleteUserFailure(message) {
    return {
        type: DELETE_USER_FAILURE,
        message
    }
}

export function deleteUser(id) {
    return (dispatch, getState) => {
        dispatch(deleteUserRequest())
        let state = getState()
        request.del('/api/users/' + id)
            .set('x-access-token', state.authentication.token)
            .end((err, res) => {
                if (err) {
                    dispatch(deleteUserFailure(err.status + ': ' + err.message))
                } else if (!res.body.success) {
                    dispatch(deleteUserFailure(res.body.message))
                } else {
                    dispatch(deleteUserSuccess(res.body.message))
                    dispatch(fetchUsers())
                }
            })
    }
}

export const SAVE_USER_REQUEST = 'SAVE_USER_REQUEST'

function saveUserRequest() {
    return {
        type: SAVE_USER_REQUEST
    }
}

export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'

function saveUserSuccess(message) {
    return {
        type: SAVE_USER_SUCCESS,
        message
    }
}

export const SAVE_USER_FAILURE = 'SAVE_USER_FAILURE'

function saveUserFailure(message) {
    return {
        type: SAVE_USER_FAILURE,
        message
    }
}

export function saveUser(id) {
    return (dispatch, getState) => {
        if (password !== confirmPassword) {
            dispatch(saveUserFailure('Password and password confirmation must be equal.'))
        } else {
            dispatch(saveUserRequest())
            let state = getState()
            request.put('/api/users/' + id)
                .set('x-access-token', state.authentication.token)
                .end((err, res) => {
                    if (err) {
                        dispatch(saveUserFailure(err.status + ': ' + err.message))
                    } else if (!res.body.success) {
                        dispatch(saveUserFailure(res.body.message))
                    } else {
                        dispatch(saveUserSuccess(res.body.message))
                        dispatch(fetchUsers())
                    }
                })
        }
    }
}

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'

function createUserRequest() {
    return {
        type: CREATE_USER_REQUEST
    }
}

export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'

function createUserSuccess(message) {
    return {
        type: CREATE_USER_SUCCESS,
        message
    }
}

export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'

function createUserFailure(message) {
    return {
        type: CREATE_USER_FAILURE,
        message
    }
}

export function createUser(username, role, password, confirmPassword) {
    return (dispatch, getState) => {
        if (password !== confirmPassword) {
            dispatch(createUserFailure('Password and password confirmation must be equal.'))
        } else {
            dispatch(createUserRequest())
            let state = getState()
            request.post('/api/users/')
                .set('x-access-token', state.authentication.token)
                .send(username, role, password, confirmPassword)
                .end((err, res) => {
                    if (err) {
                        dispatch(createUserFailure(err.status + ': ' + err.message))
                    } else if (!res.body.success) {
                        dispatch(createUserFailure(res.body.message))
                    } else {
                        dispatch(createUserSuccess(res.body.message))
                        dispatch(fetchUsers())
                    }
                })
        }
    }
}
