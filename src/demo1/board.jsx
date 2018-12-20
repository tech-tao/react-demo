import React from 'react';
import { Square } from './square.jsx';
import { CalculateWinner } from './util.js';
import './styles/index.css';

export default class Board extends React.Component {
    renderSquare(i) {
        const winnerResult = CalculateWinner(this.props.squares);
        let className = "";
        if (winnerResult) {
            if (i === winnerResult.a || i === winnerResult.b || i === winnerResult.c) {
                className = "highlight";
            }
        }
        return (
            <Square
                value={this.props.squares[i]}
                className = {className}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        let renderingBoard = [];

        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(this.renderSquare(3 * i + j))
            }
            renderingBoard.push(<div className={`board-row`}>{row}</div>);
        }

        return (
            <div>
                {renderingBoard}
            </div>
        );
    }
}