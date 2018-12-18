import React from 'react';
import './styles/index.css';
import Board from './board.jsx';
import { CalculateWinner } from './util.js';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                squareIndex: null,
                stepIndex:0,
            }],
            stepNumber: 0,
            xIsNext: true,
            sortToggled: false,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                squareIndex: i,
                stepIndex: history.length,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    calculateColRow(index) {
        const col = (index + 3) % 3 + 1;
        const row = Math.floor((index + 3) / 3);
        return '(Col:' + col + ', Row:' + row + ')';
    }

    selected(selected) {
        if (selected === this.state.stepNumber) {
            return 'selected';
        }
    }

    sortHistory() {
        this.setState({
            sortToggled: !this.state.sortToggled,
        });
    }

    reset() {
        this.setState({
            history: [{
                squares: Array(9).fill(null),
                squareIndex: null,
                stepIndex:0,
            }],
            stepNumber: 0,
            xIsNext: true,
            sortToggled: false,
        })
    }

    render() {
        const history = this.state.history;
        const current = this.state.history[this.state.stepNumber];
        const winner = CalculateWinner(current.squares) ? CalculateWinner(current.squares).winner : null;
        const sortedHistory = history.slice();
        if (this.state.sortToggled) {
            sortedHistory.sort((a, b) => b.stepIndex - a.stepIndex);
        } else {
            sortedHistory.sort((a, b) => a.stepIndex - b.stepIndex);
        }
        const moves = sortedHistory.map((step) => {
            const desc = step.stepIndex ?
                'Go to move #' + (step.stepIndex) + ', ' + this.calculateColRow(step.squareIndex):
                'Go to game start';
            return (
                <li key={step.stepIndex}>
                    <button className={this.selected(step.stepIndex)} onClick={() => this.jumpTo(step.stepIndex)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (this.state.stepNumber > 8) {
            status = 'Game is draw.'
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div><button onClick={() => this.sortHistory()}>Sort</button> <button onClick={() => this.reset()}>New Game</button></div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
