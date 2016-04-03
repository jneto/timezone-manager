import React from 'react'
import { Link } from 'react-router'

const TimezoneEdit = ( { timezone, message, onSubmit } ) => {
    let name
    let city
    let diff

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
                        if (!name.value.trim() && !city.value.trim() && !diff.value.trim()) {
                            return
                        }
                        onSubmit(name.value, city.value, diff.value)
                    }}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="name"
                                defaultValue={timezone.name}
                                ref={(node) => {name = node}}/>
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="city"
                                defaultValue={timezone.city}
                                ref={(node) => {city = node}}/>
                        </div>
                        <div className="form-group">
                            <label>Difference to GMT</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="number between -12 and 12"
                                defaultValue={timezone.diff}
                                ref={(node) => {diff = node}}/>
                        </div>
                        <div className="row">
                            <div className="col-xs-6">
                                <Link to="/timezones"><button type="button" className="btn btn-default btn-block">Cancel</button></Link>
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

export default TimezoneEdit
