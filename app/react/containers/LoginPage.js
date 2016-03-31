import { connect } from 'react-redux'

import login from '../actions/login'

import Login from '../components/Login'

const mapStateToProps = state => {
    return state
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
