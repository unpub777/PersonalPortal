import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import Post from './Components/post.jsx';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = { post: { tags: [] } };
        this.getPost = this.getPost.bind(this);
    }

    componentDidMount() {
        this.getPost();
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
        return (
            <div>
                <Post data={this.state.post} isFull={true} />
            </div>
        );
    }
};

module.exports = Comments;