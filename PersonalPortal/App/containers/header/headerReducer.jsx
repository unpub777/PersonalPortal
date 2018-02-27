import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, SHOW_LOGIN_FORM, INPUT_LOGIN, INPUT_PASSWORD } from './headerConstants.jsx'
import AuthHelper from '../../Utils/authHelper'

const initialState = {
    isLogged: AuthHelper.isLogged(),
    name: AuthHelper.getLogin(),
    password: '',
    error: '',
    isLoginFormShowed: false
}

export default function header(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, isLogged: true, isLoginFormShowed: false, name: action.payload, password: '', error: '' }

        case LOGIN_ERROR:
            return { ...state, error: action.payload }

        case LOGOUT:
            return { ...state, isLogged: false, name: '', password: '' }

        case SHOW_LOGIN_FORM:
            return {...state, isLoginFormShowed: action.payload }

        case INPUT_LOGIN:
            return {...state, name: action.payload }

        case INPUT_PASSWORD:
            return {...state, password: action.payload }

        default:
            return state;
    }
}