import Square from "./Square";
import { GameState } from "./GameState";

const PLAYER_X = "X";
const PLAYER_O = "O";

function Board({ onPlay, squares, playerTurn, gameState}) {

    const handleSquareClick = (index) => {
        if (squares[index] || gameState !== GameState.inProgress) return;
        const nextSquares = [...squares];
        nextSquares[index] = playerTurn;

        onPlay(nextSquares)
    }

    return (
        <div className="board">
            {squares.map((value, index) => (
                <Square key={index} onSquareClick={() => handleSquareClick(index)} value={value} playerTurn={ playerTurn} />
            ))}
        </div>
    )
}

export default Board;