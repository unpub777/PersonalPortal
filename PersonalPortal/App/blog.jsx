import React from 'react';
import ReactDOM from 'react-dom';

class Blog extends React.Component {
    render() {
        return (
            <div>Блог</div>
        );
    }
};

module.exports = Blog

ReactDOM.render(
    <Blog />,
    document.getElementById('content')
);;