import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routing from '../routes/route.jsx';
import Header from './header/header.jsx';

export default class App extends React.Component {

    render() {
        return (
            <Router basename="PersonalPortal">
                <div>
                    <Header />
                    <Routing />
                </div>
            </Router>
        );
    }
};
