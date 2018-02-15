import React from 'react';
import ReactDOM from 'react-dom';

export default class LoginForm extends React.Component {
    render() {
        return (
            <div className="loginForm">
                <div className="row">Логин: <input type="input" value={this.props.login} onChange={(e) => this.props.onChangeLogin(e.target.value)} className="input" /></div>
                <div className="row">Пароль: <input type="password" value={this.props.password} onChange={(e) => this.props.onChangePassword(e.target.value)} className="input" /></div>
                <div className="row"><input type="button" value="Войти" className="input" onClick={() => this.props.onLogin(this.props.login, this.props.password)} /></div>
            </div>
        );
    }
};