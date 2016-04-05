import moment from 'moment'

import React from 'react'
import { Link } from 'react-router'

const TimezoneIcons = ( { id, showModal }) => (
    <div className="table-icons">
        <Link to={'/timezones/view/' + id}><span className="glyphicon glyphicon-search table-icon"></span></Link>
        <Link to={'/timezones/edit/' + id}><span className="glyphicon glyphicon-edit table-icon"></span></Link>
        <span className="glyphicon glyphicon-trash table-icon" onClick={() => {showModal(id)}}></span>
    </div>
)

const TimezoneTableRow = ( { timezone, currentTime, showModal } ) => (
    <tr>
        <td>{timezone.name}</td>
        <td>{timezone.city}</td>
        <td>{timezone.diff}</td>
        <td>{moment(currentTime).add(timezone.diff, 'hours').format('hh:mm a')}</td>
        <td><TimezoneIcons id={timezone._id} showModal={showModal}/></td>
    </tr>
)

const TimezoneTable = ( { timezones, currentTime, filter, showModal } ) => {
    const rows = timezones
        .filter((timezone) => (!filter || (new RegExp(filter, 'i')).test(timezone.name)))
        .map((timezone, i) => (<TimezoneTableRow timezone={timezone} showModal={showModal} currentTime={currentTime} key={i}/>))

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
            <h5>Filter</h5>
            <div className="form-group">
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

const Modal = ( { timezone, hideModal, deleteTimezone } ) => (
    <div className="modal show" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" aria-label="Close" onClick={() => {hideModal()}}><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title">Delete timezone</h4>
                </div>
                <div className="modal-body">
                    <p>Are you sure you want to delete <i>{timezone.name}?</i></p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" onClick={() => {hideModal()}}>No</button>
                    <button type="button" className="btn btn-primary" onClick={() => {deleteTimezone(timezone._id)}}>Yes</button>
                </div>
            </div>
        </div>
    </div>
)

const TimezoneList = ( {
    message,
    timezones,
    filter,
    currentTime,
    modalFlag,
    selectedTimezoneId,
    onFilterChange,
    deleteTimezone,
    showModal,
    hideModal
} ) => {
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
        let timezone = timezones.find((timezone) => {return timezone._id === selectedTimezoneId})
        modal = (<Modal timezone={timezone} hideModal={hideModal} deleteTimezone={deleteTimezone}/>)
    }

    return (
        <div>
            {modal}
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
                            deleteTimezone={deleteTimezone}
                            showModal={showModal}/>
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
        </div>
    )
}

export default TimezoneList
