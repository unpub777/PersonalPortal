import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Blog from './Blog/blog.jsx';
import About from './about.jsx';
import Comments from './Blog/comments.jsx';
import NewPost from './Blog/newPost.jsx';
import LoginForm from './Blog/Components/loginForm.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isShowLoginForm: false };
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
                    this.props.history.push('/');
                } else {
                    alert('Ошибка авторизации');
                }
            }).catch((ex) => {
                console.log('parsing failed', ex)
            });
        } else {
            alert('Необходимо ввести имя пользователя и пароль');
        }
    }

    render() {
        var loginForm = this.state.isShowLoginForm ? <LoginForm login={this.login} /> : '';

        return (
            <Router basename="PersonalPortal">
            <div>
                <header>
                    <div id="photoTitle"></div>
                    <div id="title">Sergey Tseplukhin</div>
                    <div className="rightMenu">
                        <Link className="link" to="/blog/new">Новая запись</Link>
                       <a className="link" onClick={() => { var tmp = this.state.isShowLoginForm; this.setState({ isShowLoginForm: !tmp }); }}>Логин</a>
                       {loginForm}
                    </div>
                    <menu>
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
                <main>
                    <Switch>
                        <Route path="/about" component={About} />
                        <Route path="/blog/new" component={NewPost} />
                        <Route path="/blog/post" component={Comments} />
                        <Route path="/blog" component={Blog} />
                        <Route exact path="/" render={() => (<Redirect to="/blog" />)} />
                    </Switch>
                </main>
            </div>
            </Router>
        );
    }
};

module.exports = App

ReactDOM.render(
    <App />,
    document.getElementById('content')
);