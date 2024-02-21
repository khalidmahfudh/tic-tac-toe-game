import { GameState } from "./GameState";

const PLAYER_X = "X";
const PLAYER_O = "O";

function Reset({ setGameState, gameState, setSquares, setPlayerTurn}) {

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setSquares(Array(100).fill(null));
        setPlayerTurn(PLAYER_X);
    }

    if (gameState == GameState.inProgress) return;

    return <button className="reset-button" onClick={handleReset}>Reset</button>;
}

export default Reset;