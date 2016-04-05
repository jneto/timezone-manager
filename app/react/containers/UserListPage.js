import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeFilter, fetchUsers, showDeleteUserModal, hideDeleteUserModal, deleteUser } from '../actions/users'

import UserList from '../components/UserList'

class UserListPage extends Component {
    constructor(props) {
        super(props)
        this.onFilterChange = this.onFilterChange.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers())
    }

    onFilterChange(username, role) {
        this.props.dispatch(changeFilter(username, role))
    }

    showModal(id) {
        this.props.dispatch(showDeleteUserModal(id))
    }

    hideModal() {
        this.props.dispatch(hideDeleteUserModal())
    }

    deleteUser(id) {
        this.props.dispatch(deleteUser(id))
        this.props.dispatch(hideDeleteUserModal())
    }

    render() {
        const { message, users, filters, modalFlag, selectedUserId, loggedUserId } = this.props
        return (
            <UserList
                message={message}
                users={users}
                filters={filters}
                modalFlag={modalFlag}
                selectedUserId={selectedUserId}
                loggedUserId={loggedUserId}
                onFilterChange={this.onFilterChange}
                deleteUser={this.deleteUser}
                showModal={this.showModal}
                hideModal={this.hideModal}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        message: state.users.message,
        users: state.users.list,
        filters: state.users.filters,
        modalFlag: state.users.showModal,
        selectedUserId: state.users.selectedUserId,
        loggedUserId: state.authentication.user._id
    }
}

export default connect(mapStateToProps)(UserListPage)
