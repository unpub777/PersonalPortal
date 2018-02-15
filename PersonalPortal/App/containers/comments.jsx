import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Post from '../components/post.jsx';
import Comment from '../components/comment.jsx';
import NewCommentForm from '../components/newCommentForm.jsx';
import { changeAuthor, changeComment, getPost, addComment } from '../actions/commentsActions.jsx'

class Comments extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const parsed = queryString.parse(location.search);
        if (parsed) {
            this.props.getPost(parsed['postId']);
        }
    }

    render() {
        let comments = this.props.data.post.comments.map(item => {
            return (
                <Comment key={item.commentId} author={item.author} createDate={item.createDate} body={item.body} />
            );
        });

        return (
            <div id="post">
                <Post data={this.props.data.post} isFull={true} />
                <h3>Комментарии <span className="itemCount">{this.props.data.post.comments.length}</span></h3>
                <div className="commentsList">
                    {comments}
                </div>
                <h3>Написать комментарий</h3>
                <NewCommentForm
                    author={this.props.data.author}
                    comment={this.props.data.comment}
                    changeAuthor={this.props.changeAuthor}
                    changeComment={this.props.changeComment}
                    addComment={this.props.addComment} />
            </div>
        );
    }
};

let mapProps = (state) => {
    return {
        data: state.comments
    }
}

let mapDispatch = (dispatch) => {
    return {
        changeAuthor: bindActionCreators(changeAuthor, dispatch),
        changeComment: bindActionCreators(changeComment, dispatch),
        getPost: bindActionCreators(getPost, dispatch),
        addComment: bindActionCreators(addComment, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(Comments) 