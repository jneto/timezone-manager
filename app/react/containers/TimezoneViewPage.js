import { connect } from 'react-redux'

import TimezoneView from '../components/TimezoneView'

const mapStateToProps = (state, ownProps) => {
    return {
        timezone: state.timezones.list.find((timezone) => {return timezone._id === ownProps.params.id})
    }
}

const TimezoneViewPage = connect(mapStateToProps)(TimezoneView)

export default TimezoneViewPage
