import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class TagCloud extends React.Component {

    render() {
        let tags = this.props.data.map(item => {
            return (
                <Link className="link" to={"/blog?tag=" + item} key={item}>#{item}</Link>
            );
        });

        return (
            <div className="tagCloud">
                <div className="header">Облако тегов</div>
                <div className="content">{tags}</div>
            </div>
        );
    }
};