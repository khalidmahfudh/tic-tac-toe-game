import Square from "./Square";

function Board({onSquareClick, squares, playerTurn}) {
    return ( 
        <div className="board">
            {squares.map((value, index) => (
                <Square key={index} onClick={() => onSquareClick(index)} value={ value} playerTurn={ playerTurn}/>
            ))}
        </div>
    );
}

export default Board;