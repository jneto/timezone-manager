import React from 'react';
import { Link } from 'react-router'

const UserIcons = ( { id, deleteUser } ) => (
    <div>
        <Link to={'/users/view/' + id}><span className="glyphicon glyphicon-search table-icon"></span></Link>
        <Link to={'/users/edit/' + id}><span className="glyphicon glyphicon-edit table-icon"></span></Link>
        <span className="glyphicon glyphicon-trash table-icon" onClick={() => {deleteUser(id)}}></span>
    </div>
)

const UserTableRow = ( { user, deleteUser } ) => (
    <tr>
        <td>{user.username}</td>
        <td>{user.role}</td>
        <td><UserIcons id={user._id} deleteUser={deleteUser}/></td>
    </tr>
)

const UserTable = ( { users, filters, deleteUser } ) => {
    const rows = users.filter((user) => {
        const roleMatch = !filters.role || filters.role === user.role
        const usernameMatch = !filters.username || (new RegExp(filters.username, 'i')).test(user.username)
        return usernameMatch && roleMatch
    }).map((user, i) => (<UserTableRow user={user} deleteUser={deleteUser} key={i}/>))

    return (
        <table className="table table-striped table-hover">
            <thead><tr><th>Username</th><th>Role</th><th></th></tr></thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

const Filters = ( { onChange } ) => {
    let usernameInput
    let roleInput

    return (
        <div className="form-inline">
            <div className="form-group">
                <label className="filter-group-label">Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    ref={(node) => {usernameInput = node}}
                    onChange={() => {onChange(usernameInput.value, roleInput.value)}}/>
            </div>
            <div className="form-group">
                <label className="filter-group-label">Role</label>
                <select
                    className="form-control"
                    ref={(node) => {roleInput = node}}
                    onChange={() => {onChange(usernameInput.value, roleInput.value)}}>
                    <option></option>
                    <option>ADMIN</option>
                    <option>REGULAR</option>
                </select>
            </div>
        </div>
    )
}

const UserList = ( { message, users, filters, onFilterChange, deleteUser } ) => {
    let successMessage
    let failureMessage
    if (message) {
        if (message.success) {
            successMessage = <p className="text-success">message.content</p>
        } else {
            failureMessage = <p className="text-danger">message.content</p>
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12">
                    {successMessage}
                    {failureMessage}
                    <Filters onChange={onFilterChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <UserTable users={users} filters={filters} deleteUser={deleteUser}/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-3">
                    <Link to="/users/edit">
                        <button className="btn btn-success btn-block"><span className="glyphicon glyphicon-plus-sign table-icon"></span>Create User</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default UserList