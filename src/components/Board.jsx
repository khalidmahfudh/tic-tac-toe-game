import Square from "./Square";

function Board({onSquareClick, squares}) {
    return ( 
        <div className="board">
            {squares.map((value, index) => (
                <Square key={index} onClick={() => onSquareClick(index)} value={ value} />
            ))}
        </div>
    );
}

export default Board;