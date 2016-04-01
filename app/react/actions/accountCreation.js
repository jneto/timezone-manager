import request from 'superagent'

import { push } from 'react-router-redux'

export const ACCOUNT_CREATION_FETCH = 'ACCOUNT_CREATION_FETCH'

function accountCreationFetch() {
    return {
        type: ACCOUNT_CREATION_FETCH
    }
}

export const ACCOUNT_CREATION_SUCCESS = 'ACCOUNT_CREATION_SUCCESS'

function accountCreationSuccess(message) {
    return {
        type: ACCOUNT_CREATION_SUCCESS,
        message
    }
}

export const ACCOUNT_CREATION_FAILURE = 'ACCOUNT_CREATION_FAILURE'

function accountCreationFailure(message) {
    return {
        type: ACCOUNT_CREATION_FAILURE,
        message
    }
}

export default function accountCreation(username, password, confirmPassword) {
    return dispatch => {
        if (password !== confirmPassword) {
            dispatch(accountCreationFailure('Password and password confirmation must be equal.'))
        } else {
            dispatch(accountCreationFetch())
            request.post('/api/users')
                .send({username, password})
                .end((err, res) => {
                    if (err) {
                        dispatch(accountCreationFailure(err.status + ': ' + err.message))
                    } else if (!res.body.success) {
                        dispatch(accountCreationFailure(res.body.message))
                    } else {
                        dispatch(accountCreationSuccess(res.body.message))
                        dispatch(push('/login'))
                    }
                })
        }
    }
}
