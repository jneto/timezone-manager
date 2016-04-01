import React, { Component } from 'react'
import { connect } from 'react-redux'

import { saveUser, createUser } from '../actions/users'

import UserEdit from '../components/UserEdit'

class UserEditPage extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount() {
        const { users, params } = this.props
        this.user = users.find((user) => {return user._id === params.id})
        if (!this.user) {
            this.user = {
                username: '',
                role: 'REGULAR'
            }
        }
        console.log(this.user)
    }

    onSubmit(role, password, confirmPassword, username) {
        if (this.user._id) {
            this.props.dispatch(saveUser(role, password, confirmPassword, this.user._id))
        } else {
            this.props.dispatch(createUser(role, password, confirmPassword, username))
        }
    }

    render() {
        return (<UserEdit user={this.user} onSubmit={this.onSubmit} message={this.props.message}/>)
    }
}

const mapStateToProps = state => {
    return {
        users: state.users.list,
        message: state.users.message
    }
}

export default connect(mapStateToProps)(UserEditPage)
