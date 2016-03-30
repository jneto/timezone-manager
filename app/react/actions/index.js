import request from 'superagent'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'

function loginRequest() {
    return {
        type: LOGIN_REQUEST,
        loggingIn: true
    }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

function loginSuccess(token) {
    return {
        type: LOGIN_SUCCESS,
        token
    }
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function loginFailure(message) {
    return {
        type: LOGIN_FAILURE,
        message
    }
}

export default function login(username, password) {
    return dispatch => {
        dispatch(loginRequest())
        return request.post('/api/auth')
            .send({username, password})
            .end((err, res) => {
                if (err) {
                    dispatch(loginFailure(err.status + ': ' + err.message))
                } else if (!res.body.success) {
                    console.log(res.body)
                    dispatch(loginFailure(res.body.message))
                } else {
                    console.log(res.body)
                    dispatch(loginSuccess(res.body.token))
                }
            })
    }
}
