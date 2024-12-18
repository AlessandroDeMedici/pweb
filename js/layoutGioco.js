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


// menu di gioco
let chat;
let bottone;


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
    bottone.id = 'bancarotta';
    bottone.className = 'bottone element';
    menu.appendChild(bottone);
    bottone.innerHTML = 'Dichiara bancarotta';
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
    let board = document.createElement('table');
    board.id = 'board';
    board.className = 'element';
    let boardHeader = document.createElement('div');
    boardHeader.id = 'board-header';
    boardHeader.className = 'header';
    let img = document.createElement('img');
    img.style.width = '400px';
    img.src = '../media/logo.svg';
    img.alt = 'logo';
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
    img.src = '../media/menu.svg';
    img.style.width = '200px';
    img.alt = 'menu';
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
    img.src = '../media/proprieta.svg';
    img.alt = 'proprieta';
    propertyHeader.appendChild(img);

    propertyContainer.appendChild(propertyHeader);
    propertyContainer.appendChild(property);

    // menu laterale
    initMenu(menu);

    return board;
}

// funzione per inizializzare player e offer display
function initChat(){

    let playerDisplay = document.getElementById('player-display');

    // inizializzazione di playerDisplay
    {
        let element = document.createElement('div');
        element.className = 'player-list';
        let name = document.createElement('div');
        name.className = 'player-list-name';
        name.innerHTML = "Giocatori:";
        element.appendChild(name);
        let saldo = document.createElement('div');
        saldo.className = 'saldo';
        saldo.innerHTML = 'Saldo:';
        element.appendChild(saldo);
        playerDisplay.appendChild(element);
    }

    for (let ind in giocatori){
        let player = giocatori[ind];

        let element = document.createElement('div');
        element.className = 'player-list';

        let img = document.createElement('img');
        img.src = player.pedina.src;
        img.className = 'player-list-image';
        img.alt = 'player-image';
        element.appendChild(img);

        let name = document.createElement('div');
        name.className = 'player-list-name';
        name.id = 'player-name-' + ind;

        if (player.id == 'giocatore-0'){
            name.innerHTML = 'You';
        } else {
            name.innerHTML = player.username;
        }
        element.appendChild(name);

        let saldo = document.createElement('div');
        saldo.id = 'saldo-' + player.id;
        saldo.classname = 'saldo';
        saldo.innerHTML = player.saldo;
        element.appendChild(saldo);

        playerDisplay.appendChild(element);
    }

    playerDisplay.appendChild(document.createElement('hr'));



    // inizializzazione offer display
    const offerDisplay = document.getElementById('offer-display');
    const titleOfferDisplay = document.createElement('div');
    titleOfferDisplay.innerHTML = 'Offerte:';
    titleOfferDisplay.className = 'titolo-offer-display';
    offerDisplay.appendChild(titleOfferDisplay);
}

