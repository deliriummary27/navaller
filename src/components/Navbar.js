import React, { Component } from 'react'
import * as actions from '../store/actions/auth'
import {connect} from 'react-redux'


class Navbar extends Component {
    render() {
        return (
            <div className='nav-container'>
                <h5 className='display-4'>
                    <a href='/'>Home </a>
                    \
                    <a className='ml-2' href='/about'>About </a>
                    \
                    <a className='ml-2' href='/articles'>Articles </a>
                    \
                    <a className='ml-2' href='/membership'>Membership </a>
                    {this.props.isAuthenticated ? 
                    <button onClick={this.props.logout} className='float-right mr-3'><h5 style={{marginLeft: '-8px'}} className='display-4'>Logout</h5></button>
                    : <a className='float-right mr-3' href='/login'>Login</a>
                    }
                    {this.props.isAuthenticated ? 
                    <a className='float-right mr-3' href='/signup' style={{display: 'none'}}>Signup \</a>
                    : <a className='float-right mr-3' href='/signup'>Signup \</a>}
                    </h5>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Navbar)
