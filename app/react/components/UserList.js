import React from 'react'
import { Link } from 'react-router'

const UserIcons = ( { id, loggedUserId, showModal } ) => {
    let deleteIcon
    if (id !== loggedUserId) {
        deleteIcon = (<span className="glyphicon glyphicon-trash table-icon" onClick={() => {showModal(id)}}></span>)
    }

    return (
        <div>
            <Link to={'/users/view/' + id}><span className="glyphicon glyphicon-search table-icon"></span></Link>
            <Link to={'/users/edit/' + id}><span className="glyphicon glyphicon-edit table-icon"></span></Link>
            {deleteIcon}
        </div>
    )
}

const UserTableRow = ( { user, loggedUserId, showModal } ) => (
    <tr>
        <td>{user.username}</td>
        <td>{user.role}</td>
        <td><UserIcons id={user._id} loggedUserId={loggedUserId} showModal={showModal}/></td>
    </tr>
)

const UserTable = ( { users, filters, loggedUserId, showModal } ) => {
    const rows = users.filter((user) => {
        const roleMatch = !filters.role || filters.role === user.role
        const usernameMatch = !filters.username || (new RegExp(filters.username, 'i')).test(user.username)
        return usernameMatch && roleMatch
    }).map((user, i) => (<UserTableRow user={user} loggedUserId={loggedUserId} showModal={showModal} key={i}/>))

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

const Modal = ( { user, hideModal, deleteUser } ) => (
    <div className="modal show" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" aria-label="Close" onClick={() => {hideModal()}}><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Delete user</h4>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete <i>{user.username}?</i></p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={() => {hideModal()}}>No</button>
                    <button type="button" className="btn btn-primary" onClick={() => {deleteUser(user._id)}}>Yes</button>
                </div>
            </div>
        </div>
    </div>
)

const UserList = ( { message, users, filters, modalFlag, selectedUserId, loggedUserId, onFilterChange, deleteUser, showModal, hideModal } ) => {
    let successMessage
    let failureMessage
    if (message) {
        if (message.success) {
            successMessage = <p className="text-success">{message.content}</p>
        } else {
            failureMessage = <p className="text-danger">{message.content}</p>
        }
    }

    let modal
    if (modalFlag) {
        let user = users.find((user) => {return user._id === selectedUserId})
        modal = (<Modal user={user} hideModal={hideModal} deleteUser={deleteUser}/>)
    }

    return (
        <div>
            {modal}
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
                        <UserTable users={users} filters={filters} loggedUserId={loggedUserId} showModal={showModal}/>
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
        </div>
    )
}

export default UserList