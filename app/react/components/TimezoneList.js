import moment from 'moment'

import React from 'react'
import { Link } from 'react-router'

const TimezoneIcons = ( { id, deleteTimezone }) => (
    <div>
        <Link to={'/timezones/view/' + id}><span className="glyphicon glyphicon-search table-icon"></span></Link>
        <Link to={'/timezones/edit/' + id}><span className="glyphicon glyphicon-edit table-icon"></span></Link>
        <span className="glyphicon glyphicon-trash table-icon" onClick={() => {deleteTimezone(id)}}></span>
    </div>
)

const TimezoneTableRow = ( { timezone, currentTime, deleteTimezone } ) => (
    <tr>
        <td>{timezone.name}</td>
        <td>{timezone.city}</td>
        <td>{timezone.diff}</td>
        <td>{moment(currentTime).add(timezone.diff, 'hours').format('hh:mm a')}</td>
        <td><TimezoneIcons id={timezone._id} deleteTimezone={deleteTimezone}/></td>
    </tr>
)

const TimezoneTable = ( { timezones, currentTime, filter, deleteTimezone } ) => {
    const rows = timezones
        .filter((timezone) => (!filter || (new RegExp(filter, 'i')).test(timezone.name)))
        .map((timezone, i) => (<TimezoneTableRow timezone={timezone} deleteTimezone={deleteTimezone} currentTime={currentTime} key={i}/>))

    return (
        <table className="table table-striped table-hover">
            <thead><tr><th>Name</th><th>City</th><th>Difference to GMT</th><th>Current time</th><th></th></tr></thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

const Filter = ( { onChange } ) => {
    let name

    return (
        <div className="form-inline">
            <div className="form-group">
                <label className="filter-group-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="name"
                    ref={(node) => {name = node}}
                    onChange={() => {onChange(name.value)}}/>
            </div>
        </div>
    )
}

const TimezoneList = ( { message, timezones, filter, currentTime, onFilterChange, deleteTimezone } ) => {
    let successMessage
    let failureMessage
    if (message) {
        if (message.success) {
            successMessage = <p className="text-success">{message.content}</p>
        } else {
            failureMessage = <p className="text-danger">{message.content}</p>
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xs-12">
                    {successMessage}
                    {failureMessage}
                    <Filter onChange={onFilterChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <TimezoneTable
                        timezones={timezones}
                        filter={filter}
                        currentTime={currentTime}
                        deleteTimezone={deleteTimezone}/>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-3">
                    <Link to="/timezones/edit">
                        <button className="btn btn-success btn-block"><span className="glyphicon glyphicon-plus-sign table-icon"></span>Create Timezone</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TimezoneList
