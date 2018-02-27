import React from 'react';
import ReactDOM from 'react-dom';

export default class Comment extends React.Component {

    render() {
        return (
            <div className="commentLayout">
                <div className="header">
                    <div className="inline-block"><span className="bold">{this.props.author}</span></div>
                    <div className="rightFloat">{this.props.createDate}</div>
                </div>
                <div className="content">
                    <div>
                        {this.props.body}
                    </div>
                </div>
            </div>
        );
    }
};