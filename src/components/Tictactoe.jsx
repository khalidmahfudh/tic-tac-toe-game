import { useState } from "react";

import Board from "./Board";
import GameOver from "./GameOver";
import History from "./History";
import Reset from "./Reset";

const PLAYER_X = "X";
const PLAYER_O = "O";

function Tictactoe() {

    const [squares, setSquares] = useState(Array(100).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);

    const handleSquareClick = (index) => {
        if (squares[index]) return;
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
        <div>
            <h1>Tic Tac Toe</h1>
            <div className="main">
                <Board onSquareClick={handleSquareClick} squares={ squares } />
                <History />
            </div>
            <div className="footer">
                <GameOver />
                <Reset />
            </div>
        </div>
    )
}

export default Tictactoe;