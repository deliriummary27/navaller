import React from 'react'
import * as actions from '../store/actions/auth'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons'

class Login extends React.Component {

  state = {
    isClicked: false
  }

  handleSubmit = event => {
    const username = event.target.elements.username.value
    const password = event.target.elements.password.value
    this.props.onAuth(username, password)
    this.props.history.push('/')
  }

  handleClick = () => {
    return this.setState({
      isClicked: !this.state.isClicked
    })
  }

  render() {
    return (
      <form className='create-form form-group' onSubmit={this.handleSubmit}>
        <div>
          <label for='username'>Username</label>
          <input id='username' name='username' className='form-control'></input>
        </div>
        <div>
          <label for='password'>Password</label>
          <input id='password' name='password' type={this.state.isClicked ? 'text' : 'password'} className='form-control'></input><FontAwesomeIcon className='password-eye' onClick={this.handleClick} icon={this.state.isClicked ? faEye : faEyeSlash} />
        </div>
        <button className='btn btn-primary' type='submit'>Login</button>
        <p>or <a href='/signup'>Signup</a></p>
      </form>
    )
  }
}




const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
