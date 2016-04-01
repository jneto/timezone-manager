import React from 'react';
import { Link } from 'react-router'

const UserView = ( { user } ) => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                <div className="form-group">
                    <label>Username</label>
                    <p className="form-control-static">{user.username}</p>
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <p className="form-control-static">{user.role}</p>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <Link to="/users"><button type="button" className="btn btn-default btn-block">Back</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default UserView
