import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

export default class Post extends React.Component {

    render() {
        let tags = this.props.data.tags.map(item => {
            return (
                <Link className="link" to={"/blog?tag=" + item.tagName} key={item.tagName}>#{item.tagName}</Link>
            );
        });

        let commentBlock;
        if (!this.props.isFull) {
            commentBlock =
                <Link className="link" to={"/blog/post?postId=" + this.props.data.postId}>Комментарии {this.props.data.commentCount}</Link>;
        }

        let deleteBlock;
        if (this.props.isLogged) {
            deleteBlock =
                <a className="link" onClick={() => {
                    if (confirm('Вы уверены что хотите удалить запись?')) {
                        this.props.deletePost(this.props.data.postId);
                    }
                }}>Удалить запись</a>;
        }

        return (
            <div className="post">
                <div className="header">
                    <Link className="link" to={"/blog/post?postId=" + this.props.data.postId}>{this.props.data.header}</Link>
                </div>
                <div className="content">
                    <div>
                        {this.props.data.body}
                    </div>
                    <div className="footer">
                        <div className="tagsBlock">{tags}</div>
                        <div className="actionBlock">
                            <div className="deleteBlock">
                                {deleteBlock}
                            </div>
                            <div className="commentsBlock">
                                {commentBlock}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};