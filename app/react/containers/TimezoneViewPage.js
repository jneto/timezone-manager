import React, { Component } from 'react'
import { connect } from 'react-redux'

import { tick } from '../actions/timezones'

import TimezoneView from '../components/TimezoneView'

class TimezoneViewPage extends Component {
    componentDidMount() {
        this.props.dispatch(tick())
        this.intervalID = setInterval(() => {
            this.props.dispatch(tick())
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    render() {
        const { timezone, currentTime } = this.props
        return (
            <TimezoneView timezone={timezone} currentTime={currentTime}/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        timezone: state.timezones.list.find((timezone) => {return timezone._id === ownProps.params.id}),
        currentTime: state.timezones.currentTime
    }
}

export default connect(mapStateToProps)(TimezoneViewPage)
