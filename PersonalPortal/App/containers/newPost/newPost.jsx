import React from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPost, changeHeader, changeBody, changeTags } from './newPostActions.jsx'

class NewPost extends React.Component {

    render() {
        return (
            <div id="post">
                <h3>Новая запись</h3>
                <div className="newPost">
                    <div className="row">
                        Заголовок:
                        <input type="input" className="postHeader" value={this.props.data.header} onChange={(e) => this.props.changeHeader(e.target.value)} /></div>
                    <div className="row">
                        Тело:
                        <textarea className="commentArea" rows="15" value={this.props.data.body} onChange={(e) => this.props.changeBody(e.target.value)} />
                    </div>
                    <div className="row">
                        Теги:
                        <input type="input" className="postTags" value={this.props.data.tags} onChange={(e) => this.props.changeTags(e.target.value)} />
                    </div>
                    <div className="row actionBlock">
                        <input type="button" className="postSubmit" value="Отправить" onClick={() => this.props.addPost(this.props.data.header, this.props.data.body, this.props.data.tags, this.props.history)} />
                    </div>
                </div>
            </div>
        );
    }
};

let mapProps = (state) => {
    return {
        data: state.newPost
    }
}

let mapDispatch = (dispatch) => {
    return {
        addPost: bindActionCreators(addPost, dispatch),
        changeHeader: bindActionCreators(changeHeader, dispatch),
        changeBody: bindActionCreators(changeBody, dispatch),
        changeTags: bindActionCreators(changeTags, dispatch)
    }
}

export default connect(mapProps, mapDispatch)(NewPost)
