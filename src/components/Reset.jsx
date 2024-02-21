import { GameState } from "./GameState";

const PLAYER_X = "X";
const PLAYER_O = "O";

function Reset({ setGameState, gameState, setHistory, setPlayerTurn, setCurrentMove, resetSound}) {

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setHistory([Array(100).fill(null)]);
        setPlayerTurn(PLAYER_X);
        setCurrentMove(0);
        resetSound.play();
    }

    if (gameState == GameState.inProgress) return;

    return <button className="reset-button" onClick={handleReset}>Reset</button>;
}

export default Reset;