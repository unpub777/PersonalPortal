import React from 'react';
import ReactDOM from 'react-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: '', password: '' };
    }

    render() {
        return (
            <div className="loginForm">
                <div className="row">Логин: <input type="input" value={this.state.login} onChange={(e) => this.setState({ login: e.target.value })} className="input" /></div>
                <div className="row">Пароль: <input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} className="input" /></div>
                <div className="row"><input type="button" value="Войти" className="input" onClick={() => this.props.login(this.state.login, this.state.password)} /></div>
            </div>
        );
    }
};

module.exports = LoginForm