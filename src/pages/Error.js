import React, { Component } from 'react'

export default class Error extends Component {
    render() {
        return (
            <div className='error-page'>
                <h1>404 Not Found</h1>
                <button className='btn btn-primary' onClick={() => this.props.history.push('/')}>Return to the home page</button>
            </div>
        )
    }
}
