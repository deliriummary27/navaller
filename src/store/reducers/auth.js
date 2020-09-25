import * as actionTypes from '../actions/actionTypes'
import { updateState } from '../utility'

const initialState = {
    error: null,
    token: null,
    id: null,
    loading: false
}

const authStart = (state, action) => {
    return updateState(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state, action) => {
    return updateState(state, {
        error: null,
        loading: false,
        token: action.token,
        id: action.id
    })
}

const authFail = (state, action) => {
    return updateState(state, {
        loading: false,
        error: action.error
    })
}

const authLogout = (state, action) => {
    return updateState(state, {
        token: null,
        id: null
    })
}


const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action)
        default: return state
    }
}

export default reducer