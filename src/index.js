import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={`square ${props.className}`} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        const winnerResult = calculateWinner(this.props.squares);
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

class Game extends React.Component {
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
        if (calculateWinner(squares) || squares[i]) {
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
        const winner = calculateWinner(current.squares) ? calculateWinner(current.squares).winner : null;
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


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {winner:squares[a], a:a, b:b, c:c};
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
