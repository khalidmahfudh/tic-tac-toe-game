import { useState, useEffect } from "react";
import { GameState } from "./GameState";
import Board from "./Board";
import GameOver from "./GameOver";
import History from "./History";
import Reset from "./Reset";
import gameOverSoundAsset from '../sounds/game_over.wav';
import clickSoundAsset from '../sounds/click.wav';
import resetSoundAsset from '../sounds/reset.wav';

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;
const resetSound = new Audio(resetSoundAsset);
resetSound.volume = 0.2;

const PLAYER_X = "X";
const PLAYER_O = "O";

function checkWinner(currentSquares, setGameState, setPlayerTurn) {

    const lines = [
        // horizontal
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
        [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
        [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
        [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
        [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
        [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
        [80, 81, 82, 83, 84, 85, 86, 87, 88, 89],
        [90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
        // vertical
        [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
        [1, 11, 21, 31, 41, 51, 61, 71, 81, 91],
        [2, 12, 22, 32, 42, 52, 62, 72, 82, 92],
        [3, 13, 23, 33, 43, 53, 63, 73, 83, 93],
        [4, 14, 24, 34, 44, 54, 64, 74, 84, 94],
        [5, 15, 25, 35, 45, 55, 65, 75, 85, 95],
        [6, 16, 26, 36, 46, 56, 66, 76, 86, 96],
        [7, 17, 27, 37, 47, 57, 67, 77, 87, 97],
        [8, 18, 28, 38, 48, 58, 68, 78, 88, 98],
        [9, 19, 29, 39, 49, 59, 69, 79, 89, 99],
        //diagonal a
        [4, 13, 22, 31, 40],
        [5, 14, 23, 32, 41, 50],
        [6, 15, 24, 33, 42, 51, 60],
        [7, 16, 25, 34, 43, 52, 61, 70],
        [8, 17, 26, 35, 44, 53, 62, 71, 80],
        [9, 18, 27, 36, 45, 54, 63, 72, 81, 90],
        [19, 28, 37, 46, 55, 64, 73, 82, 91],
        [29, 38, 47, 56, 65, 74, 83, 92],
        [39, 48, 57, 66, 75, 84, 93],
        [49, 58, 67, 76, 85, 94],
        [59, 68, 77, 86, 95],
        // diagonal b
        [5, 16, 27, 38, 49],
        [4, 15, 26, 37, 48, 59],
        [3, 14, 25, 36, 47, 58, 69],
        [2, 13, 24, 35, 46, 57, 68, 79],
        [1, 12, 23, 34, 45, 56, 67, 78, 89],
        [0, 11, 22, 33, 44, 55, 66, 77, 88, 99],
        [10, 21, 32, 43, 54, 65, 76, 87, 98],
        [20, 31, 42, 53, 64, 75, 86, 97],
        [30, 41, 52, 63, 74, 85, 96],
        [40, 51, 62, 73, 84, 95],
        [50, 61, 72, 83, 94]
    ];

    for (let i = 0; i < lines.length; i++) {
        let count_x = 0;
        let count_o = 0;
        const line = lines[i];

        for (let j = 0; j < line.length; j++) {

        if (currentSquares[line[j]] == 'X') {
            count_x++;
            count_o = 0;
        } else if (currentSquares[line[j]] == 'O') {
            count_o++;
            count_x = 0;
        } else {
            count_x = 0;
            count_o = 0;
        }
            if (count_x == 5) {
                setPlayerTurn(null);
                setGameState(GameState.playerXWins)
                return;
            } else if (count_o == 5) {
                setPlayerTurn(null);
                setGameState(GameState.playerOWins)
                return;
            }
        }
        const areAllSquaresFilledIn = currentSquares.every((square) => square !== null);
        if (areAllSquaresFilledIn) setGameState(GameState.draw);
    } 
}

function Tictactoe()
{
    const [history, setHistory] = useState([Array(100).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];

    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [gameState, setGameState] = useState(GameState.inProgress);

    function jumpTo(nextMove) {
        if (gameState != GameState.inProgress && nextMove == (history.length - 1) ) return;
        setCurrentMove(nextMove);
        setPlayerTurn(nextMove % 2 === 0 ? PLAYER_X : PLAYER_O);
        setGameState(GameState.inProgress);
    }

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

        if (playerTurn === PLAYER_X) { 
            setPlayerTurn(PLAYER_O); 
        } else { 
            setPlayerTurn(PLAYER_X); 
        } 

    }

    const moves = history.map((_, move) => {
        let description = '';
        if (move > 0) {
            description = `Go to move #${move}`;
        } else {
            description = "Go to game start";
        }

        return (
            <li key={move}>
                <button className={(move == 0) ? 'game-start-desc':''} onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    useEffect(() => { 
        checkWinner(currentSquares, setGameState, setPlayerTurn);
    }, [currentSquares]);

    useEffect(() => {
        if (currentSquares.some((square) => square !== null)) {
            clickSound.play();
        }
    }, [currentSquares]);

    useEffect(() => {
        if (gameState !== GameState.inProgress) {
            gameOverSound.play();
        }
    })

    return (
        <div className="container">
            <h1 className="title">Tic Tac Toe Game</h1>
            <div className="main">
                <Board onPlay={ handlePlay} squares={currentSquares} setPlayerTurn={setPlayerTurn} playerTurn={playerTurn} gameState={gameState} />
                <History moves={moves} />
            </div>
            <div className="footer">
                <GameOver gameState={gameState} />
                <Reset resetSound={resetSound} setPlayerTurn={setPlayerTurn} setGameState={setGameState} setHistory={setHistory} gameState={gameState} playerTurn={playerTurn} setCurrentMove={setCurrentMove} />
            </div>
        </div>
    )
}

export default Tictactoe;