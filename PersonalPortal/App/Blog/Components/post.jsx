import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tags = this.props.data.tags.map(item => {
            return (
                <Link className="link" to={"/blog?tag=" + item.tagName} key={item.tagName}>#{item.tagName}</Link>
            );
        });

        let commentBlock;
        if (!this.props.isFull) {
            commentBlock = <Link className="link" to={"/blog/post?postId=" + this.props.data.postId}>Комментарии {this.props.data.commentCount}</Link>
        }

        return (
            <div className="post">
                <div className="header"><Link className="link" to={"/blog/post?postId=" + this.props.data.postId}>{this.props.data.header}</Link></div>
                <div className="content">
                    <div>
                        {this.props.data.body}
                    </div>
                    <div className="footer">
                        <div className="tagsBlock">{tags}</div>
                        <div className="commentsBlock">{commentBlock}</div>
                    </div>
                </div>
            </div>
        );
    }
};

module.exports = Post