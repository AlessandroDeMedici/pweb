// inizializzazione del layout di gioco
let gameContainer;
let boardContainer;
let propertyContainer;
let menuContainer;
let boardHeader;
let board;
let propertyHeader;
let property;
let menuHeader;
let menu;

// display delle offerte e della lista dei giocatori
let playerDisplay;
let offerDisplay;

// messaggio informativo
let messaggio;

// menu di gioco
let chat;
let bottone;

// dimensione troppo piccola della finestra non si puo' continuare a giocare
window.onresize = resize;

// handler per gestire finestre troppo piccole per poter giocare
function resize(e){
    e.preventDefault();
    let gameContainer = document.getElementById('game-container')
    let altezza = window.innerHeight;
    let larghezza = window.innerWidth;
    let messaggio = document.getElementById('messaggio-informativo')
    if (altezza < 800 && larghezza < 800){
        gameContainer.style.filter = 'blur(8px)';
        messaggio.style.visibility = 'visible';
        window.onclick = (e) => {
            e.preventDefault();
        }
    } else {
        gameContainer.style.filter = 'none';
        messaggio.style.visibility = 'hidden';
        window.onclick = null;
    }
}


// funzione per inizializzare il menu
function initMenu(menu){
    let chat = document.createElement('div');
    chat.id = 'chat';
    chat.className = 'element';
    menu.appendChild(chat);

    // menu interno all'elemento chat

    // lista dei giocatori
    playerDisplay = document.createElement('div');
    playerDisplay.id = 'player-display';

    // lista delle offerte
    offerDisplay = document.createElement('div');
    offerDisplay.id = 'offer-display';

    chat.appendChild(playerDisplay);
    chat.appendChild(offerDisplay);

    // bottone laterale
    let bottone = document.createElement('button');
    bottone.id = 'gestisci-case';
    bottone.className = 'bottone element';
    menu.appendChild(bottone);
    bottone.innerHTML = 'Gestisci le tue case';
    bottone.disabled = 1;

    // bottone laterale
    let bottone1 = document.createElement('button');
    bottone1.id = 'nuova-offerta';
    bottone1.className = 'bottone element';
    menu.appendChild(bottone1);
    bottone1.innerHTML = 'Fai un\'offerta';
    bottone1.disabled = 1;
}


// funzione per inizializzare il layout principale
function initLayout(gameContainer){

    // layout principale
    let boardContainer = document.createElement('div');
    boardContainer.id = 'board-container';
    boardContainer.className = 'sub-container';

    let propertyContainer = document.createElement('div');
    propertyContainer.id = 'property-container';
    propertyContainer.className = 'sub-container';

    let menuContainer = document.createElement('div');
    menuContainer.id = 'menu-container';
    menuContainer.className = 'sub-container';
    
    gameContainer.appendChild(propertyContainer);
    gameContainer.appendChild(boardContainer);
    gameContainer.appendChild(menuContainer);

    // layout singole colonne
    //board
    let board = document.createElement('div');
    board.id = 'board';
    board.className = 'element';
    let boardHeader = document.createElement('div');
    boardHeader.id = 'board-header';
    boardHeader.className = 'header';
    let img = document.createElement('img');
    img.style.width = '400px';
    img.src = '/media/logo.svg';
    boardHeader.appendChild(img);

    boardContainer.appendChild(boardHeader);
    boardContainer.appendChild(board);

    //menu
    let menu = document.createElement('div');
    menu.id = 'menu';
    menu.className = 'sub-sub-container';
    let menuHeader = document.createElement('div');
    menuHeader.id = 'menu-header';
    menuHeader.className = 'header';
    img = document.createElement('img');
    img.src = '/media/menu.svg';
    img.style.width = '200px';
    menuHeader.appendChild(img);

    menuContainer.appendChild(menuHeader);
    menuContainer.appendChild(menu);

    //property
    property = document.createElement('div');
    property.id = 'property';
    property.className = 'element sub-sub-container';
    let propertyHeader = document.createElement('div');
    propertyHeader.id = 'property-header';
    propertyHeader.className = 'header';
    img = document.createElement('img');
    img.style.width = '200px';
    img.src = '/media/proprieta.svg';
    propertyHeader.appendChild(img);

    propertyContainer.appendChild(propertyHeader);
    propertyContainer.appendChild(property);

    // messaggio informativo
    messaggio = document.createElement('div');
    messaggio.style.visibility = 'hidden';
    messaggio.appendChild(document.createTextNode('per continuare a giocare aumenta la dimensione della finestra...'));
    messaggio.id = "messaggio-informativo";
    document.body.appendChild(messaggio);

    // menu laterale
    initMenu(menu);

    return board;
}


