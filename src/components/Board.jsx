import Square from "./Square";

function Board() {
    return ( 
        <div className="board">
            {new Array(100).fill(null).map((_, index) => (
                <Square key={index} />
            ))}
        </div>
    );
}

export default Board;