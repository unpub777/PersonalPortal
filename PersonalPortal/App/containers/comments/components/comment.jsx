import React from 'react';
import ReactDOM from 'react-dom';

export default class Comment extends React.Component {

	render() {

		let deleteBlock;
		if (this.props.isLogged) {
			deleteBlock =
				<div className="action rightFloat">&nbsp;&nbsp;&nbsp;<a className="link" onClick={() => {
					if (confirm('Вы уверены что хотите удалить запись?')) {
						this.props.deleteComment(this.props.data.commentId);
					}
			}}>x</a></div>;
		}

        return (
            <div className="commentLayout">
                <div className="header">
					<div className="inline-block"><span className="bold">{this.props.data.author}</span></div>
					{deleteBlock}
					<div className="rightFloat">{this.props.data.createDate}</div>
                </div>
                <div className="content">
                    <div>
						{this.props.data.body}
                    </div>
                </div>
            </div>
        );
    }
};