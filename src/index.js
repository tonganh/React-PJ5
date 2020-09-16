import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';

// function Square(props) {
//     console.log(props);
//     return (
//     <button  className="square" onClick={props.onClick}>
//       {props.value}
//     </button>
//   );
// }


function Square(props) {
  let color = 'transparent'
  if (props.value === 'X') {
    color = 'red'
  } else if (props.value === 'O') {
    color = 'blue'
  }
  return (
    <button className="square" style={{color}} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {


    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props)
  {
    super(props);
    this.state={
      history:[
        {
          squares:Array(9).fill(null),
          // history have an array with 9 elements. 
        }
      ],
      stepNumber:0,
      xIsNext:true,
    };
  }
  handleClick(i) {
    const history=this.state.history.slice(0,this.state.stepNumber+1);
    //  nó còn có nhiệm vụ trong việ truy hồi các hành động đã xảy ra. nên lấy step+1.-thừa 1 vị trí cho phần tử chèn tiếp theo chăng?.
    const current=history[history.length-1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    // This set the value display in board.
    this.setState({
      history:history.concat([{      squares: squares,
        //SAme with decalre new in this.state.
      }]),
      stepNumber:history.length,
      xIsNext: !this.state.xIsNext,
      // Set State after you clikc/action in board.
      // Sate of parent.
    });
  }
  jumpTo(step)
  {
    this.setState({
      stepNumber:step,
      xIsNext:(step%2)===0,
    })
  }
  render() {
    const history=this.state.history;
    const current = history[this.state.stepNumber];
    const winner=calculateWinner(current.squares);

    const move=history.map((step,move)=>
    {
      const desc= move ? `Go to move # ${move}` : `Go to game start`;
      return (
        <li key={move}>
          <button onClick={()=>this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status=`Winner: ${winner}`;
    } else {
      status=`Next player: ${this.state.xIsNext ? 'X'  : 'O'}`
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
        squares={current.squares}
        // Bring the location now and update value in the squares.
        onClick={(i)=> this.handleClick(i)}
        //get the next action.
         />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{move}</ol>
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
  }
  return null;
}
