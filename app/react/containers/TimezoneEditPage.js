import { connect } from 'react-redux'

import { saveTimezone, createTimezone } from '../actions/timezones'

import TimezoneEdit from '../components/TimezoneEdit'

const mapStateToProps = (state, ownProps) => {
    let timezone = state.timezones.list.find((timezone) => {return timezone._id === ownProps.params.id})
    if (!timezone) {
        timezone = {
            name: '',
            city: '',
            diff: ''
        }
    }
    return {
        timezone: timezone,
        message: state.timezones.message
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSubmit: (name, city, diff) => {
            if (ownProps.params && ownProps.params.id) {
                dispatch(saveTimezone(name, city, diff, ownProps.params.id))
            } else {
                dispatch(createTimezone(name, city, diff))
            }
        }
    }
}

const TimezoneEditPage = connect(mapStateToProps, mapDispatchToProps)(TimezoneEdit)

export default TimezoneEditPage
