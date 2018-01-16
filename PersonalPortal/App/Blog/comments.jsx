import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import Post from './Components/post.jsx';
import "isomorphic-fetch";

export default class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { post: { tags: [], comments: [] }, newComment: '', newCommentAuthorName: '' };
        this.getPost = this.getPost.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    componentDidMount() {
        this.getPost();
    }

    onAdd() {
        fetch(constants.addComment, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author: this.state.newCommentAuthorName, comment: this.state.newComment, postId: this.state.post.postId })
        }).then((response) => {
            if (response.ok) {
                this.setState({ newComment: '', newCommentAuthorName: '' });
                this.getPost();
            } else {
                alert('Ошибка добавления комментария');
            }
        }).catch((ex) => {
            console.log('parsing failed', ex)
        });
    }

    getPost() {
        const parsed = queryString.parse(location.search);
        var params = Object.keys(parsed)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(parsed[key]))
            .join("&");

        fetch(constants.post + "?" + params)
            .then((response) => {
                return response.json()
            }).then((json) => {
                this.setState({ post: json });
            }).catch((ex) => {
                console.log('parsing failed', ex)
            });
    }

    render() {
        let comments = this.state.post.comments.map(item => {
            return (
                <div className="commentLayout" key={item.commentId}>
                    <div className="header">
                        <div className="inline-block"><span className="bold">{item.author}</span></div>
                        <div className="rightFloat">{item.createDate}</div>
                    </div>
                    <div className="content">
                        <div>
                            {item.body}
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div id="post">
                <Post data={this.state.post} isFull={true} />
                <h3>Комментарии <span className="itemCount">{this.state.post.comments.length}</span></h3>
                <div className="commentsList">
                    {comments}
                </div>
                <h3>Написать комментарий</h3>
                <div className="writeCommentBlock">
                    <div className="row">Имя: <input type="input" value={this.state.newCommentAuthorName} onChange={(e) => this.setState({ newCommentAuthorName: e.target.value })} /></div>
                    <div className="commentInput">
                        <textarea className="commentArea" rows="7" value={this.state.newComment} onChange={(e) => this.setState({ newComment: e.target.value })} />
                        <div className="actionBlock"><input type="button" value="Отправить" onClick={() => this.onAdd()} /></div>
                    </div>
                </div>
            </div>
        );
    }
};