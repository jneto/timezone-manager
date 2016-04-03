import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeTimezoneFilter, fetchTimezones, deleteTimezone } from '../actions/timezones'

import TimezoneList from '../components/TimezoneList'

class TimezoneListPage extends Component {
    constructor(props) {
        super(props)
        this.onFilterChange = this.onFilterChange.bind(this)
        this.deleteTimezone = this.deleteTimezone.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(fetchTimezones())
    }

    onFilterChange(name) {
        this.props.dispatch(changeTimezoneFilter(name))
    }

    deleteTimezone(id) {
        this.props.dispatch(deleteTimezone(id))
    }

    render() {
        const { message, timezones, filter } = this.props
        return (
            <TimezoneList
                message={message}
                timezones={timezones}
                filter={filter}
                onFilterChange={this.onFilterChange}
                deleteTimezone={this.deleteTimezone}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        message: state.timezones.message,
        timezones: state.timezones.list,
        filter: state.timezones.filter
    }
}

export default connect(mapStateToProps)(TimezoneListPage)
