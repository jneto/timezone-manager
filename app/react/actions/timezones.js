import request from 'superagent'

import { push } from 'react-router-redux'

export const CHANGE_TIMEZONE_FILTER = 'CHANGE_TIMEZONE_FILTER'

export function changeTimezoneFilter(filter) {
    return {
        type: CHANGE_TIMEZONE_FILTER,
        filter
    }
}

export const FETCH_TIMEZONES_REQUEST = 'FETCH_TIMEZONES_REQUEST'

function fetchTimezonesRequest() {
    return {
        type: FETCH_TIMEZONES_REQUEST
    }
}

export const FETCH_TIMEZONES_SUCCESS = 'FETCH_TIMEZONES_SUCCESS'

function fetchTimezonesSuccess(timezones) {
    return {
        type: FETCH_TIMEZONES_SUCCESS,
        timezones
    }
}

export const FETCH_TIMEZONES_FAILURE = 'FETCH_TIMEZONES_FAILURE'

function fetchTimezonesFailure(message) {
    return {
        type: FETCH_TIMEZONES_FAILURE,
        message
    }
}

export function fetchTimezones() {
    return (dispatch, getState) => {
        dispatch(fetchTimezonesRequest())
        let state = getState()
        request.get('/api/timezones')
            .set('x-access-token', state.authentication.token)
            .end((err, res) => {
                if (err) {
                    dispatch(fetchTimezonesFailure(err.status + ': ' + err.message))
                } else if (!res.body.success) {
                    dispatch(fetchTimezonesFailure(res.body.message))
                } else {
                    dispatch(fetchTimezonesSuccess(res.body.timezones))
                }
            })
    }
}

export const SHOW_DELETE_TIMEZONE_MODAL = 'SHOW_DELETE_TIMEZONE_MODAL'

export function showDeleteTimezoneModal(id) {
    return {
        type: SHOW_DELETE_TIMEZONE_MODAL,
        id
    }
}

export const HIDE_DELETE_TIMEZONE_MODAL = 'HIDE_DELETE_TIMEZONE_MODAL'

export function hideDeleteTimezoneModal() {
    return {
        type: HIDE_DELETE_TIMEZONE_MODAL
    }
}

export const DELETE_TIMEZONE_REQUEST = 'DELETE_TIMEZONE_REQUEST'

function deleteTimezoneRequest() {
    return {
        type: DELETE_TIMEZONE_REQUEST
    }
}

export const DELETE_TIMEZONE_SUCCESS = 'DELETE_TIMEZONE_SUCCESS'

function deleteTimezoneSuccess(message, id) {
    return {
        type: DELETE_TIMEZONE_SUCCESS,
        message
    }
}

export const DELETE_TIMEZONE_FAILURE = 'DELETE_TIMEZONE_FAILURE'

function deleteTimezoneFailure(message) {
    return {
        type: DELETE_TIMEZONE_FAILURE,
        message
    }
}

export function deleteTimezone(id) {
    return (dispatch, getState) => {
        dispatch(deleteTimezoneRequest())
        let state = getState()
        request.del('/api/timezones/' + id)
            .set('x-access-token', state.authentication.token)
            .end((err, res) => {
                if (err) {
                    dispatch(deleteTimezoneFailure(err.status + ': ' + err.message))
                } else if (!res.body.success) {
                    dispatch(deleteTimezoneFailure(res.body.message))
                } else {
                    dispatch(deleteTimezoneSuccess(res.body.message))
                    dispatch(fetchTimezones())
                }
            })
    }
}

export const SAVE_TIMEZONE_REQUEST = 'SAVE_TIMEZONE_REQUEST'

function saveTimezoneRequest() {
    return {
        type: SAVE_TIMEZONE_REQUEST
    }
}

export const SAVE_TIMEZONE_SUCCESS = 'SAVE_TIMEZONE_SUCCESS'

function saveTimezoneSuccess(message) {
    return {
        type: SAVE_TIMEZONE_SUCCESS,
        message
    }
}

export const SAVE_TIMEZONE_FAILURE = 'SAVE_TIMEZONE_FAILURE'

function saveTimezoneFailure(message) {
    return {
        type: SAVE_TIMEZONE_FAILURE,
        message
    }
}

export function saveTimezone(name, city, diff, id) {
    return (dispatch, getState) => {
        diff = parseInt(diff)
        if (diff > 12 || diff < -12 || isNaN(diff)) {
            dispatch(saveTimezoneFailure('Difference to GMT must be between -12 and 12.'))
        } else {
            dispatch(saveTimezoneRequest())
            let state = getState()
            request.put('/api/timezones/' + id)
                .set('x-access-token', state.authentication.token)
                .send({ name, city, diff })
                .end((err, res) => {
                    if (err) {
                        dispatch(saveTimezoneFailure(err.status + ': ' + err.message))
                    } else if (!res.body.success) {
                        dispatch(saveTimezoneFailure(res.body.message))
                    } else {
                        dispatch(saveTimezoneSuccess(res.body.message))
                        dispatch(push('/timezones'))
                    }
                })
        }
    }
}

export const CREATE_TIMEZONE_REQUEST = 'CREATE_TIMEZONE_REQUEST'

function createTimezoneRequest() {
    return {
        type: CREATE_TIMEZONE_REQUEST
    }
}

export const CREATE_TIMEZONE_SUCCESS = 'CREATE_TIMEZONE_SUCCESS'

function createTimezoneSuccess(message) {
    return {
        type: CREATE_TIMEZONE_SUCCESS,
        message
    }
}

export const CREATE_TIMEZONE_FAILURE = 'CREATE_TIMEZONE_FAILURE'

function createTimezoneFailure(message) {
    return {
        type: CREATE_TIMEZONE_FAILURE,
        message
    }
}

export function createTimezone(name, city, diff) {
    return (dispatch, getState) => {
        diff = parseInt(diff)
        if (diff > 12 || diff < -12 || isNaN(diff)) {
            dispatch(saveTimezoneFailure('Difference to GMT must be between -12 and 12.'))
        } else {
            dispatch(createTimezoneRequest())
            let state = getState()
            request.post('/api/timezones/')
                .set('x-access-token', state.authentication.token)
                .send({ name, city, diff })
                .end((err, res) => {
                    if (err) {
                        dispatch(createTimezoneFailure(err.status + ': ' + err.message))
                    } else if (!res.body.success) {
                        dispatch(createTimezoneFailure(res.body.message))
                    } else {
                        dispatch(createTimezoneSuccess(res.body.message))
                        dispatch(push('/timezones'))
                    }
                })
        }
    }
}

export const TICK = 'TICK'

export function tick() {
    return {
        type: TICK
    }
}
