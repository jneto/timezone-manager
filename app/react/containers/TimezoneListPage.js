import React, { Component } from 'react'
import { connect } from 'react-redux'

import { changeTimezoneFilter, fetchTimezones, showDeleteTimezoneModal, hideDeleteTimezoneModal, deleteTimezone, tick } from '../actions/timezones'

import TimezoneList from '../components/TimezoneList'

class TimezoneListPage extends Component {
    constructor(props) {
        super(props)
        this.onFilterChange = this.onFilterChange.bind(this)
        this.deleteTimezone = this.deleteTimezone.bind(this)
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }


    componentDidMount() {
        this.props.dispatch(fetchTimezones())
        this.props.dispatch(tick())
        this.intervalID = setInterval(() => {
            this.props.dispatch(tick())
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID)
    }

    onFilterChange(name) {
        this.props.dispatch(changeTimezoneFilter(name))
    }

    showModal(id) {
        this.props.dispatch(showDeleteTimezoneModal(id))
    }

    hideModal() {
        this.props.dispatch(hideDeleteTimezoneModal())
    }

    deleteTimezone(id) {
        this.props.dispatch(deleteTimezone(id))
        this.props.dispatch(hideDeleteTimezoneModal())
    }

    render() {
        const { message, timezones, filter, currentTime, modalFlag, selectedTimezoneId } = this.props
        return (
            <TimezoneList
                message={message}
                timezones={timezones}
                filter={filter}
                currentTime={currentTime}
                modalFlag={modalFlag}
                selectedTimezoneId={selectedTimezoneId}
                onFilterChange={this.onFilterChange}
                deleteTimezone={this.deleteTimezone}
                showModal={this.showModal}
                hideModal={this.hideModal}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        message: state.timezones.message,
        timezones: state.timezones.list,
        filter: state.timezones.filter,
        currentTime: state.timezones.currentTime,
        modalFlag: state.timezones.showModal,
        selectedTimezoneId: state.timezones.selectedTimezoneId
    }
}

export default connect(mapStateToProps)(TimezoneListPage)
