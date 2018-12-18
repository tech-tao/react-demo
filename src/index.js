import React from 'react';
import ReactDOM from 'react-dom';
import Game from './demo1/game.jsx';

class Index extends React.Component {

    render() {
        return (
            <Game/>
        );
    }
}

// ========================================

ReactDOM.render(
    <Index />,
    document.getElementById('root')
);
