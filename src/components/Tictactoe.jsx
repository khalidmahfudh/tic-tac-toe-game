import Board from "./Board";
import GameOver from "./GameOver";
import History from "./History";
import Reset from "./Reset";

function Tictactoe() {
    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <div className="main">
                <Board />
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