import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Post from './Components/post.jsx';
import TagsCloud from './Components/tagsCloud.jsx';
import "isomorphic-fetch";

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: { currentPage: 0, totalPages: 0, pageSize: 0, records: [] }, tags: [] };
        this.getPosts = this.getPosts.bind(this);
        this.getTags = this.getTags.bind(this);
    }

    componentDidMount() {
        this.getPosts();
        this.getTags();
    }

    componentWillReceiveProps(nextProps) {
        this.getPosts();
    }
    
    getPosts() {
        const parsed = queryString.parse(location.search);
        var params = Object.keys(parsed)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(parsed[key]))
            .join("&");

        fetch(constants.page + "?" + params)
            .then((response) => {
                return response.json()
            }).then((json) => {
                this.setState({ data: json });
            }).catch((ex) => {
                console.log('parsing failed', ex)
            });
    }

    getTags() {
        fetch(constants.tags)
            .then((response) => {
                return response.json()
            }).then((json) => {
                this.setState({ tags: json });
            }).catch((ex) => {
                console.log('parsing failed', ex)
            });
    }

    render() {
        const currentIndex = this.state.data.currentPage;
        const total = this.state.data.totalPages;
        const pageSize = this.state.data.pageSize;
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

        let posts = this.state.data.records.map(item => {
            return (
                <Post key={item.postId} data={item} isFull={false} />
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
                    <TagsCloud data={this.state.tags} refresh={this.getPosts} />
                </div>
            </div>
        );
    }
};

module.exports = Blog
