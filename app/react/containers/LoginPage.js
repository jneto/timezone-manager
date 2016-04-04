import { connect } from 'react-redux'

import login from '../actions/login'

import Login from '../components/Login'

const mapStateToProps = state => {
    return {
        fetching: state.authentication.fetching,
        message: state.authentication.message,
        token: state.authentication.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (username, password) => {
            dispatch(login(username, password))
        }
    }
}

const LoginPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

export default LoginPage
