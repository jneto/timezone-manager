import React from 'react';

const UserView = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                <div className="form-group">
                    <label>Username</label>
                    <p className="form-control-static">jneto</p>
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <p className="form-control-static">REGULAR</p>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <button type="button" className="btn btn-default btn-block">Back</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default UserView
