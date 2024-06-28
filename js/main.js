

document.addEventListener('DOMContentLoaded', () => { 

    // ottengo lo username se presente dalla sessione
    let account = document.getElementById('account');
    username = account.dataset.username;

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

    // inizializzo il tabellone di gioco
    initTabellone();

    // inizializzo l'array dei giocatori
    giocatori.push(new Giocatore(username));
    giocatori.push(new Giocatore(npc[0]));
    giocatori.push(new Giocatore(npc[1]));
    giocatori.push(new Giocatore(npc[2]));
    giocatori.push(new Giocatore(npc[3]));

    // viene fatto partire il gioco
    let game = new Gioco();
})