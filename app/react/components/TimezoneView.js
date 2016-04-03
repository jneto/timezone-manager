import moment from 'moment'

import React from 'react'
import { Link } from 'react-router'

const TimezoneView = ( { timezone, currentTime } ) => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-xs-12 col-sm-4 col-sm-offset-4">
                <div className="form-group">
                    <label>Name</label>
                    <p className="form-control-static">{timezone.name}</p>
                </div>
                <div className="form-group">
                    <label>City</label>
                    <p className="form-control-static">{timezone.city}</p>
                </div>
                <div className="form-group">
                    <label>Difference to GMT</label>
                    <p className="form-control-static">{timezone.diff}</p>
                </div>
                <div className="form-group">
                    <label>Current time</label>
                    <p className="form-control-static">{moment(currentTime).add(timezone.diff, 'hours').format('hh:mm a')}</p>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <Link to="/timezones"><button type="button" className="btn btn-default btn-block">Back</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default TimezoneView
