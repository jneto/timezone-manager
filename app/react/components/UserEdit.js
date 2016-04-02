import React from 'react'
import { Link } from 'react-router'

const UserEdit = ( { user, message, onSubmit } ) => {
    console.log(user)
    let username
    let role
    let password
    let confirmPassword

    let usernameField
    if (user._id) {
        usernameField = (
            <div className="form-group">
                <label>Username</label>
                <p className="form-static-control">{user.username}</p>
            </div>
        )
    } else {
        usernameField = (
            <div className="form-group">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="username"
                    defaultValue={user.username}
                    ref={(node) => {username = node}}/>
            </div>
        )
    }

    let errorMessage
    if (message && !message.success) {
        errorMessage = <p className="text-danger">{message.content}</p>
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                    {errorMessage}
                    <form className="form" onSubmit={(e) => {
                        e.preventDefault()
                        let usernameValue
                        if (username) {
                            usernameValue = username.value.trim()
                        } else {
                            usernameValue = false
                        }
                        if (!usernameValue && !role.value.trim() && (!password.value.trim() != !confirmPassword.value.trim())) {
                            return
                        }
                        onSubmit(role.value.trim(), password.value.trim(), confirmPassword.value.trim(), usernameValue)
                    }}>
                        {usernameField}
                        <div className="form-group">
                            <label>Role</label>
                            <select className="form-control" defaultValue={user.role} ref={(node) => {role = node}}>
                                <option value="ADMIN">ADMIN</option>
                                <option value="REGULAR">REGULAR</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                ref={(node) => {password = node}}/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                ref={(node) => {confirmPassword = node}}/>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <Link to="/users"><button type="button" className="btn btn-default btn-block">Cancel</button></Link>
                            </div>
                            <div className="col-xs-6">
                                <button type="submit" className="btn btn-primary btn-block">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserEdit
