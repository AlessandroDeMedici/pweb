

document.addEventListener('DOMContentLoaded', () => {

    // inizializzo la home
    printHome();

    // ottengo il game Container
    let gameContainer = document.getElementById('game-container');
    
    // nascondo il gioco
    gameContainer.style.display = 'none';
    
    // inizializzo il layout di gioco
    board = initLayout(gameContainer);
    
    // stampo la board
    tabellone = new Board(board);
    tabellone.printBoard();
    
    // stampo i dadi
    printDadi();

    // inizializzo scenario e tabellone
    initTabellone();

    // inizializzo l'array dei giocatori
    initGiocatori();

    // viene creato l'oggetto gioco
    let game = new Gioco();

    // viene avviato il gioco
    game.start();
})