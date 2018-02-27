import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/loginForm.jsx';
import { login, logout, showLoginForm, inputLogin, inputPassword } from './headerActions.jsx'

class Header extends React.Component {
    render() {
        let newPostButton = this.props.header.isLogged ?
            <div className="menu">
                <ul>
                    <li>
                        <Link className="link" to="/blog/new">Новая запись</Link>
                    </li>
                    <li>
                        <a className="link" onClick={() => { if (confirm('Вы уверены что хотите выйти?')) this.props.logout()}}>Выход</a>
                    </li>
                </ul>
            </div>:
            '';
        let loginButton = this.props.header.isLogged ?
            <span className="nameLabel">Привет, {this.props.header.name}</span> :
            <a className="link" onClick={() => { this.props.showLoginForm(!this.props.header.isLoginFormShowed); }}>Логин</a>
        let loginForm = this.props.header.isLoginFormShowed ?
            <LoginForm onLogin={this.props.login} login={this.props.header.name} password={this.props.header.password} onChangeLogin={this.props.inputLogin} onChangePassword={this.props.inputPassword} /> :
            '';

        return (
            <header>
                <div id="photoTitle"></div>
                <div id="title">Personal Portal</div>
                <div className="rightMenu">
                    {newPostButton}
                    {loginButton}
                    {loginForm}
                </div>
                <menu className="menu">
                    <ul>
                        <li>
                            <Link to="/blog">Блог</Link>
                        </li>
                        <li>
                            <a href="https://github.com/unpub777">Github</a>
                        </li>
                        <li>
                            <Link to="/about">Обо мне</Link>
                        </li>
                    </ul>
                </menu>
            </header>
        );
    }
};

let mapProps = (state) => {
    return {
        header: state.header
    }
}

let mapDispatch = (dispatch) => {
    return {
        login: bindActionCreators(login, dispatch),
        logout: bindActionCreators(logout, dispatch),
        showLoginForm: bindActionCreators(showLoginForm, dispatch),
        inputLogin: bindActionCreators(inputLogin, dispatch),
        inputPassword: bindActionCreators(inputPassword, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(Header) 
