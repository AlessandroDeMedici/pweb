let messaggio;
let gameContainer;
let boardContainer;
let menu;

// handler per gestire finestre troppo piccole per poter giocare
window.onresize = function ridimensionamento()
{
    let altezza = window.innerHeight;
    let larghezza = window.innerWidth;
    if (altezza < 800 && larghezza < 800){
        gameContainer.style.filter = 'blur(8px)';
        messaggio.style.visibility = 'visible';
    } else {
        gameContainer.style.filter = 'none';
        messaggio.style.visibility = 'hidden';
    }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded',() => {
    boardContainer = document.getElementById('board-container');
    gameContainer = document.getElementById('game-container');

    // messaggio informativo
    messaggio = document.createElement('div');
    messaggio.style.visibility = 'hidden';
    messaggio.appendChild(document.createTextNode('per continuare a giocare aumenta la dimensione della finestra...'));
    messaggio.id = "messaggio-informativo";
    document.body.appendChild(messaggio);
});