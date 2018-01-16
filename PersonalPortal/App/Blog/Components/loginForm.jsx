import React from 'react';
import ReactDOM from 'react-dom';
import AuthHelper from '../../Utils/authHelper'

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: '', password: '', isShowLoginForm: false };
        this.login = this.login.bind(this);
    }

    login(userName, password) {
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
                    alert('Ошибка авторизации');
                }
            }).then((data) => {
                if (data) {
                    AuthHelper.saveAuth(data.username, data.access_token);
                    this.setState({ isShowLoginForm: false });
                }
            }).catch((ex) => {
                console.log('parsing failed', ex)
            });
        } else {
            alert('Необходимо ввести имя пользователя и пароль');
        }
    }

    render() {
        let login = AuthHelper.getLogin();
        let loginButton = login ?
            <span className="nameLabel">Привет, {login}</span> :
            <a className="link" onClick={() => { var tmp = this.state.isShowLoginForm; this.setState({ isShowLoginForm: !tmp }); }}>Логин</a>

        var loginForm = this.state.isShowLoginForm ?
            <div className="loginForm">
                <div className="row">Логин: <input type="input" value={this.state.login} onChange={(e) => this.setState({ login: e.target.value })} className="input" /></div>
                <div className="row">Пароль: <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} className="input" /></div>
                <div className="row"><input type="button" value="Войти" className="input" onClick={() => this.login(this.state.login, this.state.password)} /></div>
            </div> : '';

        return (
            <span>
                {loginButton}
                {loginForm}
            </span>
        );
    }
};