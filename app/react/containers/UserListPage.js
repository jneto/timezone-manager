import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeFilter, fetchUsers, deleteUser } from '../actions/users'

import UserList from '../components/UserList'

class UserListPage extends Component {
    constructor(props) {
        super(props)
        this.onFilterChange = this.onFilterChange.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchUsers())
    }

    onFilterChange(username, role) {
        this.props.dispatch(changeFilter(username, role))
    }

    deleteUser(id) {
        this.props.dispatch(deleteUser(id))
    }

    render() {
        const { message, users, filters } = this.props
        return (
            <UserList
                message={message}
                users={users}
                filters={filters}
                onFilterChange={this.onFilterChange}
                deleteUser={this.deleteUser}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        message: state.users.message,
        users: state.users.list,
        filters: state.users.filters
    }
}

export default connect(mapStateToProps)(UserListPage)
