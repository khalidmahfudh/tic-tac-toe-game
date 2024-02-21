import Square from "./Square";
import { GameState } from "./GameState";

const PLAYER_X = "X";
const PLAYER_O = "O";

function Board({ squares, setPlayerTurn, playerTurn, gameState, setSquares}) {

    const handleSquareClick = (index) => {
        if (squares[index] || gameState !== GameState.inProgress) return;
        const newSquares = [...squares];
        newSquares[index] = playerTurn;
        setSquares(newSquares);

        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        } else {
            setPlayerTurn(PLAYER_X);
        }
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