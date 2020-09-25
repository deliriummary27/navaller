import React from 'react'
import * as actions from '../store/actions/auth'
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons'

class SignUp extends React.Component {

  state = {
    isClicked: false
  }

  handleSubmit = event => {
    const username = event.target.elements.username.value
    const email = event.target.elements.email.value
    const password1 = event.target.elements.password1.value
    const password2 = event.target.elements.password2.value
    this.props.onAuth(username, email, password1, password2)
    this.props.history.push('/create/profile')
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
          <label for='email'>Email</label>
          <input id='email' name='email' className='form-control'></input>
        </div>
        <div>
          <label for='password1'>Password</label>
          <input id='password1' name='password1' type={this.state.isClicked ? 'text' : 'password'} className='form-control'></input><FontAwesomeIcon className='password-eye' onClick={this.handleClick} icon={this.state.isClicked ? faEye : faEyeSlash} />
        </div>
        <div>
          <label for='password2'>Confirm Your Password</label>
          <input id='password2' name='password2' type={this.state.isClicked ? 'text' : 'password'} className='form-control'></input><FontAwesomeIcon className='password-eye' onClick={this.handleClick} icon={this.state.isClicked ? faEye : faEyeSlash} />
        </div>
        <button className='btn btn-primary' type='submit'>Sign up</button>
        <p>or <a href='/login'>Login</a></p>
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
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
