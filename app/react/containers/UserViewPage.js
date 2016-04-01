import { connect } from 'react-redux'

import UserView from '../components/UserView'

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.users.list.find((user) => {return user._id === ownProps.params.id})
    }
}

const UserViewPage = connect(mapStateToProps)(UserView)

export default UserViewPage
