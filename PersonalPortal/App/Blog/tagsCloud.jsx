import React from 'react';
import ReactDOM from 'react-dom';

class TagCloud extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tagCloud">
                <div className="header">Облако тегов</div>
                <div className="content">Облако тегов</div>
            </div>
        );
    }
};

module.exports = TagCloud