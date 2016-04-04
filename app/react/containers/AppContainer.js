import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { logout } from '../actions/login'

import App from '../components/App'

const mapStateToProps = state => {
    return {
        user: state.authentication.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => {
            dispatch(logout())
            dispatch(push('/login'))
        }
    }
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppContainer
