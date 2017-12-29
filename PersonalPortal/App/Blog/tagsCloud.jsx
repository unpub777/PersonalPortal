import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class TagCloud extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tags = this.props.data.map(item => {
            return (
                <Link className="tag" to={"/blog?tag=" + item} key={item}>#{item}</Link>
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

module.exports = TagCloud