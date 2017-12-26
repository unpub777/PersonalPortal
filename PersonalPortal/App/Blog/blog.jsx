import React from 'react';
import ReactDOM from 'react-dom';
import Post from './post.jsx';
import TagsCloud from './tagsCloud.jsx';

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: { currentPage: 0, totalPages: 0, pageSize: 0, records: [] } };
        this.getPosts = this.getPosts.bind(this);
    }

    componentDidMount() {
        this.getPosts(0);
    }
    
    getPosts(pageIndex) {
        fetch(constants.posts + "?pageIndex=" + pageIndex)
            .then((response) => {
                return response.json()
            }).then((json) => {
                this.setState({ data: json });
            }).catch((ex) => {
                console.log('parsing failed', ex)
            });
    }

    render() {
        let posts = this.state.data.records.map(item => {
            return (
                <Post key={item.postId} data={item} />
            );
        });

        return (
            <div id="blog">
                <div id="lenta">
                    {posts}
                </div>
                <div id="cloud">
                    <TagsCloud />
                </div>
            </div>
        );
    }
};

module.exports = Blog

ReactDOM.render(
    <Blog />,
    document.getElementById('content')
);