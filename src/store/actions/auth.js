import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        id: id
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart())
        axios({
            method: 'post', 
            url: 'http://rallendalle.pythonanywhere.com/rest-auth/login/',
            data: {
                username: username,
                password: password
            },
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            }
          })
        .then(res => {
            const token = res.data.key
            const id = res.data.user.id
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
            dispatch(authSuccess(token, id))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, email, password1, password2) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://rallendalle.pythonanywhere.com/rest-auth/registration/', {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            const token = res.data.key
            const id = res.data.user.id
            localStorage.setItem('token', token)
            localStorage.setItem('id', id)
            dispatch(authSuccess(token, id))
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheck = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        if (token === undefined) {
            dispatch(authLogout())
        } else {
            dispatch(authSuccess(token, id))
        }
    }
}
