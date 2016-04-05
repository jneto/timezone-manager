import { connect } from 'react-redux'

import { saveUser, createUser } from '../actions/users'

import UserEdit from '../components/UserEdit'

const mapStateToProps = (state, ownProps) => {
    let user = state.users.list.find((user) => {return user._id === ownProps.params.id})
    if (!user) {
        user = {
            username: '',
            role: 'REGULAR'
        }
    }
    return {
        user: user,
        message: state.users.message
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (role, password, confirmPassword, username) => {
            if (ownProps.params && ownProps.params.id) {
                dispatch(saveUser(role, password, confirmPassword, ownProps.params.id))
            } else {
                dispatch(createUser(role, password, confirmPassword, username))
            }
        }
    }
}

const UserEditPage = connect(mapStateToProps, mapDispatchToProps)(UserEdit)

export default UserEditPage
