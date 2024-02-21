function Square({ onSquareClick, value, playerTurn }) {
    let hoverClass = null;
    if (value == null && playerTurn != null) {
        hoverClass = `${playerTurn.toLowerCase()}-hover`;
    }
    
    return <button onClick={onSquareClick} className={`square ${hoverClass}`}>{value}</button> 
}

export default Square;