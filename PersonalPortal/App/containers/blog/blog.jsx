import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Post from '../../components/post.jsx';
import TagsCloud from './components/tagCloud.jsx';
import { getPosts, getTags, deletePost } from './blogActions.jsx'
import "isomorphic-fetch";

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { query: location.search };
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        this.getPosts();
        this.props.getTags();
    }

    deletePost(postId) {
        let pageIndex; let tag;
        const parsed = queryString.parse(location.search);
        if (parsed) {
            pageIndex = parsed['pageIndex'];
            tag = parsed['tag'];
        }
        this.props.deletePost(postId, pageIndex, tag);
    }

    getPosts() {
        let pageIndex; let tag;
        const parsed = queryString.parse(location.search);
        if (parsed) {
            pageIndex = parsed['pageIndex'];
            tag = parsed['tag'];
        }
        this.props.getPosts(pageIndex, tag);
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.query != location.search) {
            this.setState({ query: location.search });
            this.getPosts();
        }
    }

    render() {
        const total = this.props.posts.totalPages;
        const pageSize = this.props.posts.pageSize;
        const pageNumbers = [];
        let params = queryString.parse(location.search);
        let queryTrailer = '';
        if (params.tag) {
            queryTrailer = "&tag=" + params.tag;
        }
        for (let i = 1; i <= Math.ceil(total / pageSize); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li key={number}>
                    <Link className="link" to={"/blog?pageIndex=" + (number - 1) + queryTrailer}>{number}</Link>
                </li>
            );
        });

        let posts = this.props.posts.records.map(item => {
            return (
                <Post key={item.postId} data={item} isFull={false} isLogged={this.props.isLogged} deletePost={this.deletePost} />
            );
        });

        return (
            <div id="blog">
                <div id="lenta">
                    {posts}
                    <div>
                        <ul className="pagingNumber">
                            {renderPageNumbers}
                        </ul>
                    </div>
                </div>
                <div id="cloud">
                    <TagsCloud data={this.props.tags} />
                </div>
            </div>
        );
    }
};

let mapProps = (state) => {
    return {
        posts: state.blog.data,
        tags: state.blog.tags,
        error: state.blog.error,
        isLogged: state.header.isLogged
    }
}

let mapDispatch = (dispatch) => {
    return {
        getPosts: bindActionCreators(getPosts, dispatch),
        getTags: bindActionCreators(getTags, dispatch),
        deletePost: bindActionCreators(deletePost, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(Blog) 
