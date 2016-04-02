import React from 'react'
import { Link } from 'react-router'

const Login = ( { fetching, message, token, onSubmit } ) => {
    let username
    let password

    if (fetching) {
        return <h1>Logging In...</h1>
    } else if (token) {
        return <h1>{token}</h1>
    }

    let errorMessage = null
    if (message) {
        errorMessage = <p className="text-danger">{message}</p>
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12 col-sm-4 col-sm-offset-4 login-box">
                    {errorMessage}
                    <form onSubmit={e => {
                        e.preventDefault()
                        if (!username.value.trim() || !password.value.trim()) {
                            return
                        }
                        onSubmit(username.value, password.value)
                        username.value = ''
                        password.value = ''
                    }}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="username" ref={node => {
                                username = node
                            }}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="password" ref={node => {
                                password = node
                            }}/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                    </form>
                </div>
                <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                    <Link to="/createAccount">Creat account</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
