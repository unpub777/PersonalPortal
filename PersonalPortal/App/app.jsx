import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Blog from './Blog/blog.jsx';
import About from './about.jsx';
import Comments from './Blog/comments.jsx';
import NewPost from './Blog/newPost.jsx';

class App extends React.Component {
    render() {
        return (
            <Router basename="PersonalPortal">
            <div>
                <header>
                    <div id="photoTitle"></div>
                    <div id="title">Sergey Tseplukhin</div>
                    <div className="newPostButton"><Link to="/blog/new">Новая запись</Link></div>
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