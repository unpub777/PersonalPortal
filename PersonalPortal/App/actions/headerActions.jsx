import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, SHOW_LOGIN_FORM, INPUT_LOGIN, INPUT_PASSWORD } from '../constants/headerConstants.jsx'
import AuthHelper from '../Utils/authHelper'
import "isomorphic-fetch"

export function showLoginForm(show) {
    return {
        type: SHOW_LOGIN_FORM,
        payload: show
    }
}

export function inputLogin(name) {
    return {
        type: INPUT_LOGIN,
        payload: name
    }
}

export function inputPassword(password) {
    return {
        type: INPUT_PASSWORD,
        payload: password
    }
}

export function logout() {
    AuthHelper.clearAuth();
    return {
        type: LOGOUT
    }
}

export function login(userName, password) {
    return (dispatch) => {
        if (userName && password) {
            var loginData = {
                username: userName,
                password: password
            };

            const searchParams = Object.keys(loginData).map((key) => {
                return encodeURIComponent(key) + '=' + encodeURIComponent(loginData[key]);
            }).join('&');

            fetch(constants.token, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: searchParams
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    dispatch({ type: LOGIN_ERROR, payload: 'Ошибка авторизации' });
                    throw 'Ошибка авторизации';
                }
            }).then((data) => {
                AuthHelper.saveAuth(data.username, data.access_token);
                dispatch({ type: LOGIN_SUCCESS, payload: data.username });
            }).catch((ex) => {
                alert(ex);
                dispatch({ type: LOGIN_ERROR, payload: ex });
            });
        } else {
            alert('Необходимо ввести имя пользователя и пароль');
            dispatch({ type: LOGIN_ERROR, payload: 'Необходимо ввести имя пользователя и пароль' });
        }
    }
}
