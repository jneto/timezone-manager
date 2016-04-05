import { connect } from 'react-redux'

import accountCreation from '../actions/accountCreation'

import CreateAccount from '../components/CreateAccount'

const mapStateToProps = state => {
    return {
        fetching: state.authentication.fetching,
        message: state.authentication.message
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSubmit: (username, password, confirmPassword) => {
            dispatch(accountCreation(username, password, confirmPassword))
        }
    }
}

const CreateAccountPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAccount)

export default CreateAccountPage
