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

// messaggio informativo
let messaggio;

// menu di gioco
let chat;
let bottone;
let roll;


// handler per gestire finestre troppo piccole per poter giocare
window.onresize = () =>{
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

function initMenu(){
    chat = document.createElement('div');
    chat.id = 'chat';
    chat.className = 'element';
    menu.appendChild(chat);

    // bottone per lanciare i dadi
    roll = document.createElement('button');
    roll.id = 'roll';
    roll.className = 'bottone element';
    let text = document.createTextNode('Lancia i dadi!');
    roll.appendChild(text);
    roll.addEventListener('click',randomDice);              // devo aggiungere dopo l'handler
    menu.appendChild(roll);

    // bottone laterale
    bottone = document.createElement('button');
    bottone.id = 'tasto-funzione';
    bottone.className = 'bottone element';
    menu.appendChild(bottone);
}


function initLayout(){
    // layout principale

    boardContainer = document.createElement('div');
    boardContainer.id = 'board-container';
    boardContainer.className = 'sub-container';

    propertyContainer = document.createElement('div');
    propertyContainer.id = 'property-container';
    propertyContainer.className = 'sub-container';

    menuContainer = document.createElement('div');
    menuContainer.id = 'menu-container';
    menuContainer.className = 'sub-container';
    
    gameContainer.appendChild(propertyContainer);
    gameContainer.appendChild(boardContainer);
    gameContainer.appendChild(menuContainer);

    // layout singole colonne
    //board
    board = document.createElement('div');
    board.id = 'board';
    board.className = 'element';
    boardHeader = document.createElement('div');
    boardHeader.id = 'board-header';
    boardHeader.className = 'header';
    let img = document.createElement('img');
    img.style.width = '400px';
    img.src = '/media/logo.svg';
    boardHeader.appendChild(img);

    boardContainer.appendChild(boardHeader);
    boardContainer.appendChild(board);

    //menu
    menu = document.createElement('div');
    menu.id = 'menu';
    menu.className = 'sub-sub-container';
    menuHeader = document.createElement('div');
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
    propertyHeader = document.createElement('div');
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
    initMenu();
}