import React from 'react';

const UserList = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-12">
                <form className="form-inline">
                    <div className="form-group">
                        <label className="filter-group-label">Username</label>
                        <input type="text" className="form-control" placeholder="username"/>
                    </div>
                    <div className="form-group">
                        <label className="filter-group-label">Role</label>
                        <select className="form-control">
                            <option>ADMIN</option>
                            <option>REGULAR</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr><th>Username</th><th>Role</th><th></th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>jneto</td>
                            <td>REGULAR</td>
                            <td>
                                <span className="glyphicon glyphicon-search table-icon"></span>
                                <span className="glyphicon glyphicon-edit table-icon"></span>
                                <span className="glyphicon glyphicon-trash table-icon"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>tclaro</td>
                            <td>ADMIN</td>
                            <td>
                                <span className="glyphicon glyphicon-search table-icon"></span>
                                <span className="glyphicon glyphicon-edit table-icon"></span>
                                <span className="glyphicon glyphicon-trash table-icon"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>nbosque</td>
                            <td>REGULAR</td>
                            <td>
                                <span className="glyphicon glyphicon-search table-icon"></span>
                                <span className="glyphicon glyphicon-edit table-icon"></span>
                                <span className="glyphicon glyphicon-trash table-icon"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-sm-3">
                <button className="btn btn-success btn-block"><span className="glyphicon glyphicon-plus-sign table-icon"></span>Create User</button>
            </div>
        </div>
    </div>
)

export default UserList