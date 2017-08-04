import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// TODO: Add basic AI to play tic-tac-toe
// TODO: Add prediction to choose next-best move based on experience
// TODO: Extend to make Checkers
// TODO: Extend to make Go
// TODO: Extend ot make Chess
// TODO: Add real-time sync

// this replaces the above equivalent class since it contains only a render function!
function Square(props) {
  return (
	<button className="square" onClick={props.onClick}>
	  {props.value}
	</button>
  );
};

class Board extends React.Component {
  
  renderSquare(i,j) {
	const index = (3*(j-1)+(i-1));
    return (
	  <Square 
		value={this.props.squares[index]}
		onClick={() => this.props.onClick(index)}
	  />
	);
  }

  render() {
	// 0 = 3*(j-1) + (i-1) => 0 + 0 = 0
	// 1 =                 => 0 + 1 = 1
    // 2 =                 => 0 + 2 = 2
	// 3 =                 => 3 + 0 = 3
	// 4 =
	// 5 =
	// 6 =
	// 7 =
	// 8 =
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(1,1)} 
          {this.renderSquare(2,1)} 
          {this.renderSquare(3,1)}
        </div>
        <div className="board-row">
          {this.renderSquare(1,2)} 
          {this.renderSquare(2,2)}
          {this.renderSquare(3,2)}
        </div>
        <div className="board-row">
          {this.renderSquare(1,3)}
          {this.renderSquare(2,3)}
          {this.renderSquare(3,3)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
	super();
	this.state = {
	  history: [{
		squares: Array(9).fill(null),
	  }],
	  stepNumber: 0,
	  xIsNext: true,
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
	// set state of 'history' and 'xIsNext'
	this.setState({
	  history: history.concat([{
		squares: squares,
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

  render() {
	const history = this.state.history.slice(0, this.state.stepNumber + 1);
	const current = history[this.state.stepNumber]; // history[history.length - 1];
	const winner = calculateWinner(current.squares);
	
	// history.map returns a list... in this case, it returns a list of functions... components? yes, components.
	// specifically, it returns a list of list items... links specifically.
	const moves = history.map((step, move) => {
	  // in the list print either "Move #{move}" or "Game start" (the default option shown at the top of the list)
	  const desc = move ?
		'Move #' + move :
		'Game start';
	
	  // Question: Can state be returned in this component? How is that represented?
	  return (
		<li key={move}>
		  <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
		</li>
	  );
	});

	let status;
	if (winner) {
	  status = 'Winner: ' + winner;
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
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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
	  return squares[a];
	}
  };
  return null;
};
