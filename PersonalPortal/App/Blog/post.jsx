import React from 'react';
import ReactDOM from 'react-dom';

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="post">
                <div className="header"><a href="#">{this.props.data.header}</a></div>
                <div className="content">{this.props.data.body}
                    <div className="postFooter"><a href="#">Комментарии</a></div>
                </div>
            </div>
        );
    }
};

module.exports = Post