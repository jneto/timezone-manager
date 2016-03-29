import React from 'react';

const CreateAccount = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-12 col-sm-4 col-sm-offset-4 login-box">
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="password"/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
)

export default CreateAccount