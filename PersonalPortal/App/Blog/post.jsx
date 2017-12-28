import React from 'react';
import ReactDOM from 'react-dom';

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tags = this.props.data.tags.map(item => {
            return (
                <a href="#" className="tag" key={item.tagId}>#{item.tagName}</a>
            );
        });

        return (
            <div className="post">
                <div className="header"><a href="#">{this.props.data.header}</a></div>
                <div className="content">{this.props.data.body}
                    <div className="footer">
                        <div className="tagsBlock">{tags}</div>
                        <div className="commentsBlock"><a href="#">Комментарии</a></div>
                    </div>
                </div>
            </div>
        );
    }
};

module.exports = Post