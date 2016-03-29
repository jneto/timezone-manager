import React from 'react';

const UserEdit = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                <form className="form">
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select className="form-control">
                            <option>ADMIN</option>
                            <option>REGULAR</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="password"/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="password"/>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">
                            <button type="button" className="btn btn-default btn-block">Cancel</button>
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

export default UserEdit
