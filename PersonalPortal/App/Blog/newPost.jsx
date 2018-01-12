import React from 'react';
import ReactDOM from 'react-dom';
import "isomorphic-fetch";

class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tags: null, body: null, header: null };
        this.onAdd = this.onAdd.bind(this);
    }

    onAdd() {
        if (this.state.header && this.state.body) {
            fetch(constants.post, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ header: this.state.header, body: this.state.body, tags: this.state.tags ? this.state.tags.split(',').map((tag) => tag.trim()) : null })
            }).then((response) => {
                if (response.ok) {
                    this.props.history.push('/');
                } else {
                    alert('Ошибка добавления комментария');
                }
            }).catch((ex) => {
                console.log('parsing failed', ex)
            });
        } else {
            alert('Необходимо заполнить заголовок и тело новой записи');
        }
    }

    render() {
        return (
            <div id="post">
                <h3>Новая запись</h3>
                <div className="newPost">
                    <div className="row">
                        Заголовок:
                        <input type="input" className="postHeader" value={this.state.header} onChange={(e) => this.setState({ header: e.target.value })} /></div>
                    <div className="row">
                        Тело:
                        <textarea className="commentArea" rows="15" value={this.state.body} onChange={(e) => this.setState({ body: e.target.value })} />
                    </div>
                    <div className="row">
                        Теги:
                        <input type="input" className="postTags" value={this.state.tags} onChange={(e) => this.setState({ tags: e.target.value })} />
                    </div>
                    <div className="row actionBlock">
                        <input type="button" className="postSubmit" value="Отправить" onClick={() => this.onAdd()} />
                    </div>
                </div>
            </div>
        );
    }
};

module.exports = NewPost;