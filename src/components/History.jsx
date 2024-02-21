function History({moves}) {
    return <div className="history">
        <p>HISTORY</p>
        <div className="history-list">
            <ol>{moves}</ol>
        </div>
    </div>;
}

export default History;