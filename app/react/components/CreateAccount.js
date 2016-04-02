import React from 'react'

const CreateAccount = ( { fetching, message, onSubmit } ) => {
    let username
    let password
    let confirmPassword

    let errorMessage
    if (message) {
        errorMessage = <p className="text-danger">{message}</p>
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12 col-sm-4 col-sm-offset-4 login-box">
                    {errorMessage}
                    <form onSubmit={e => {
                        e.preventDefault()
                        if (!username.value.trim() || !password.value.trim() || !confirmPassword.value.trim()) {
                            return
                        }
                        onSubmit(username.value, password.value, confirmPassword.value)
                    }}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="username" ref={node => {username = node}}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="password" ref={node => {password = node}}/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control" placeholder="password" ref={node => {confirmPassword = node}}/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAccount