import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actions from '../store/actions/auth'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Search from './Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

class Nav extends Component {

    state = {
        profiles: [],
        isOpen: false
    }

    componentDidMount() {
        axios.get('http://rallendalle.pythonanywhere.com/api/profiles/')
        .then(res => {
            this.setState({
                profiles: res.data
            })
        })
    }


    render() {
        const profile = this.state.profiles.filter(it => it.user === parseInt(this.props.id))
        const profPhoto = profile.map(it => {
            return <div className='nav-prof' style={it.username.length > 5 ? {width: `${it.username.length * 10 + 250}px`} : {width: '250px'}}>
                <img src={it.photo} key={it.id} alt='p' style={it.username.length > 5 ? {marginLeft: `${it.username.length * 10 + 190}px`} : {marginLeft: '190px'}}></img>
                <h5 className='display-5' key={it.id}>{it.username}</h5>
                <Link to={this.props.isAuthenticated ? '/profile' : '/login'} className='btn btn-outline-primary nav-prof-btn'>View profile</Link>
                </div>
        })
        const profPhotoSmall = profile.map(it => {
            return <div className='nav-profile-small' style={it.username.length > 5 ? {width: `${it.username.length * 8 + 70}px`} : {width: '70px'}}>
                <img style={it.username.length > 5 ? {marginLeft: `${it.username.length * 4 + 12}px`} : {marginLeft: '12px'}} src={it.photo} key={it.id} alt='p'></img>
                <a href='/profile' className='display-5' key={it.id}>{it.username}</a>
                </div>
        })
        return (
            <div className='navv-container'>
                <Link to='/'><h2 className='display-2'>Navaller</h2></Link>
                {profPhotoSmall}
                <button onClick={() => this.setState({isOpen: !this.state.isOpen})}><FontAwesomeIcon icon={faAlignRight}/></button>
                {this.state.isOpen ? <div className='nav-toggle'>
                    <a className='display-4' href='/'><strong>Home</strong></a>
                    <hr></hr>
                    <a className='display-4' href='/about'><strong>About</strong></a>
                    <hr></hr>
                    <a className='display-4' href='/articles'><strong>Articles</strong></a>
                    <hr></hr>
                    <a className='display-4' href='/membership'><strong>Membership</strong></a>
                    <hr></hr>
                    {this.props.isAuthenticated ? 
                    <div className='nav-toggle-special'>
                    <FontAwesomeIcon icon={faSignOutAlt} className='nav-toggle-logout'/>
                    {/*eslint-disable-next-line*/}
                    <a onClick={this.props.logout} className='display-4' ><strong>Logout</strong></a>
                    <hr></hr>
                    </div>
                    :
                    <div>
                    <a className='display-4' href='/login'><strong>Login</strong></a>
                    <hr></hr>
                    <a className='display-4' href='/signup'><strong>Signup</strong></a>
                    <hr></hr>
                    </div>
                    }
                    {/*<div className='small-screen-search'>
                        <Search />
                    </div>*/}
                    <hr></hr>
                </div> : <></>}
                {this.props.isAuthenticated ? 
                    <div className='nav-toggle-special'>
                    <FontAwesomeIcon icon={faSignOutAlt} className='nav-toggle-logout'/>
                    {/*eslint-disable-next-line*/}
                    <a onClick={this.props.logout} className='display-4' ><strong>Logout</strong></a>
                    <hr></hr>
                    </div>
                    :
                    <div>
                    <a className='display-4' href='/login'><strong>Login</strong></a>
                    <hr></hr>
                    <a className='display-4' href='/signup'><strong>Signup</strong></a>
                    <hr></hr>
                    </div>
                    }
                {profPhoto}
                <div className='big-screen-search'><Search /></div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        id: state.id,
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return  {
        logout: () => dispatch(actions.authLogout())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav)
