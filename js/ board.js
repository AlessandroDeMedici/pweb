
let board;
let boardDIM = 11;                      // elementi per riga
let pieces = (boardDIM - 2) * 4 + 4 + 1     // elementi totali nella tavola

function printBoard(){
    for (let i = 0; i < pieces; i++){
        let div = document.createElement("div");

        

        if (i == pieces - 1)
            // sono arrivato all'ultimo pezzo centrale
            div.id = "main";

        div.className = "board-item " + i;
        let text = document.createTextNode(i);
        div.appendChild(text);
        board.appendChild(div);
    }
}

function main(){
    board = document.getElementById("board");
    printBoard();
}