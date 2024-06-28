// id del giocatore principale
let mainPlayer = 0;
let numPlayer = 5;
let npc = ['marco','giovanni','sandro','aldo'];

class Giocatore{

    constructor(username){

        // sistemo la pedina
        this.pedina = document.createElement('img');
        this.pedina.className = 'giocatore';
        this.pedina.src = '/media/player/pedina.svg';

        // do un id al giocatore
        this.id = 'giocatore-' + giocatori.length;

        // inseririsco il giocatore nella prima casella
        let casella = document.getElementById('contenitore-giocatori-0');
        casella.appendChild(this.pedina);

        // tengo traccia della posizione
        this.posizione = 0;

        // saldo del giocatore
        this.saldo = 1500;

        // caselle possedute dal giocatore
        this.proprieta = [];

        // tengo traccia se il giocatore si trova in prigione
        this.prigione = 0;

        // username casuale
        this.username = username;
    }

    // sposto il giocatore nella casella i-esima
    muoviGiocatore(i){
        if (i >= 40 || i < 0){
            console.log('movimento errato');
            return;
        }

        let newdiv = document.getElementById('contenitore-giocatori-' + i);
        newdiv.appendChild(this.pedina);

        this.posizione = i;
    }

    // funzione per pagare alla banca
    paga(i){
        this.saldo -= i;
    }

    // funzione per ricevere dalla banca
    ricevi(i){
        this.saldo += i;
    }

    // funzione per pagare un altro giocatore
    pagaGiocatore(giocatore,i){
        this.paga(i);
        giocatore.ricevi(i);
    }

    // funzione per ricevere soldi da tutti i giocatori
    riceviGiocatori(valore){
        for (let i in giocatori){
            if (giocatori[i] == this)
                continue;
            giocatori[i].pagaGiocatore(this,valore);
        }
    }

    // funzione per pagare i soldi a tutti gli altri giocatori
    pagaGiocatori(valore){
        for (let i in giocatori){
            if (giocatori[i] == this)
                continue;
            this.pagaGiocatore(giocatori[i],valore);
        }
    }

    goToPrison(){

        // turni passati in prigione
        let div = document.getElementById('prigione');
        div.appendChild(this.pedina);
        this.posizione = 'prigione';

        this.turni = 0;
    }

    // funzione per pagare la manutenzione sugli alberghi e sulle case possedute
    // in base al costo per casa e per albergo
    manutenzione(costoCasa,costoAlbergo){
        let numeroCase = 0;
        let numeroAlberghi = 0;
        for (let i in this.caselle){
            numeroCase += this.caselle[i].case();
            numeroAlberghi += this.caselle[i].alberghi();
        }

        this.paga(numeroCase * costoCasa + numeroAlberghi * costoAlbergo);
    }
}

// inizializzo l'array dei giocatori
giocatori = [];


class Carta{
    constructor(nome,descrizione,effetto,valore, valore2 = null){

        this.nome = nome;
        this.descrizione = descrizione;
        this.effetto = effetto;
        this.valore = valore;
        this.valore2 = valore2;
    }

    pesca(giocatore){
        // controllo sugli input
        if (!giocatore){
            console.log('giocatore non valido');
            return;
        }

        // controllo sull'effetto della carta
        if (!this.effetto || this.effetto == ''){
            console.log('effetto della carta non valido');
            return;
        }
        
        if (this.effetto == 'MOVE_ABSOLUTE'){
            giocatore.muoviGiocatore(this.valore);
            return;
        } else if (this.effetto == 'MOVE_RELATIVE'){
            giocatore.muoviGiocatore(giocatore.posizione + this.valore);
        } else if (this.effetto == 'PAY'){
            giocatore.paga(this.valore);
            return;
        } else if (this.effetto == 'PRISON'){
            giocatore.goToPrison();
        } else if (this.effetto == 'JOLLY'){
            // conferisci al giocatore la carta jolly
        } else if (this.effetto == 'GIFT'){
            giocatore.ricevi(this.valore);
        } else if (this.effetto == 'MANTEINANCE'){
            giocatore.manutenzione(this.valore,this.valore2);
        } else if (this.effetto == 'TAKE'){
            giocatore.riceviGiocatori(this.valore);
        } else if (this.effetto == 'GIVE'){
            giocatore.pagaGiocatori(this.valore);
        } else {
            ;
        }
    }
}

// dichiaro mazzo di imprevisti e probabilita
let imprevisti = [];
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino alla Stazione Sud, se passate dal via ritirate $200', 'MOVE_ABSOLUTE', 5));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino fino a Via Marco Polo, se passate dal via ritirate $200', 'MOVE_ABSOLUTE', 21));
imprevisti.push(new Carta('Imprevisti', 'Arretrate di 3 caselle', 'MOVE', -3));
imprevisti.push(new Carta('Imprevisti', 'Avete preso una multa per eccesso di velocità, pagate $15', 'PAY', 15));
imprevisti.push(new Carta('Imprevisti', 'Andate in prigione e senza passare dal via, non ritirate $200', 'PRISON'));
imprevisti.push(new Carta('Imprevisti', 'Uscite ora di prigione. Questa carta può essere conservata quando ne avrete bisogno, oppure può essere scambiata o venduta', 'JOLLY'));
imprevisti.push(new Carta('Imprevisti', 'Maturano i fondi sull\'assicurazione sulla vita: ritirate $50', 'GIFT', 50));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino a Viale dei Giardini', 'MOVE'));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino a Via Marco Polo, se passate dal via ritirate $200', 'MOVE', 200));
imprevisti.push(new Carta('Imprevisti', 'Siete stati eletti amministratore di condominio, pagate a ciascun giocatore $50', 'GIVE', 50));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino alla prossima stazione. Se è ancora libera potete comprarla dalla banca. Se è già stata acquistata pagate il biglietto al proprietario il doppio che gli spetterebbe normalmente', 'NEXT_STATION'));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino alla prossima stazione. Se è ancora libera potete comprarla dalla banca. Se è già stata acquistata pagate il biglietto al proprietario il doppio che gli spetterebbe normalmente', 'NEXT_STATION'));
imprevisti.push(new Carta('Imprevisti', 'Eseguite lavori di manutenzione su tutte le vostre proprietà, per ogni casa pagate $25, per ogni albergo pagate $100', 'MAINTENANCE'));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino alla società più vicina. Se è già acquistata lanciate i dadi e pagate al proprietario 10 volte il numero uscito', 'MOVE'));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino al Via! Ritirate $200', 'MOVE', 200));
imprevisti.push(new Carta('Imprevisti', 'Matura il vostro investimento sulla chiavetta delle macchinette, ritirate $150 di resto non restituito', 'GIFT', 150));

let probabilita = [];
probabilita.push(new Carta('Probabilita','Uscite ora di prigione. Questa carta può essere conservata quando ne avrete bisogno, oppure può essere scambiata o venduta', 'JOLLY'));
probabilita.push(new Carta('Probabilita','Ereditate delle proprietà da un lontano parente, ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Avanzate fino al Via! Ritirate $200', 'MOVE_ABSOLUTE', 0)); // Assuming 0 is the position for 'Go'
probabilita.push(new Carta('Probabilita','Avete vinto la lotteria! Ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Ricevete le parcelle della tintoria, pagate $100', 'PAY', 100));
probabilita.push(new Carta('Probabilita','La banca riconosce un errore nel vostro conto, ritirate $200', 'GIFT', 200));
probabilita.push(new Carta('Probabilita','Maturano dei vostri investimenti, ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Versate il rimanente delle rette universitarie dei vostri figli, pagate $200', 'PAY', 200));
probabilita.push(new Carta('Probabilita','Ricevete la parcella del dottore, pagate $50', 'PAY', 50));
probabilita.push(new Carta('Probabilita','Maturano gli interessi della vostra assicurazione sulla vita. Ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Andate in prigione senza passare dal via, non ritirate $200', 'PRISON'));


// classe per le offerte
class Offer{
    static id = 0;
    static offerte = new Array();
    
    constructor(player1,player2,properties1,money1,properties2,money2){
        if (player1 == player2)
            return;
        // player1 -> giocatore che fa l'offerta
        // player2 -> giocatore che riceve l'offerta
        // properties1, money1 -> soldi e proprieta che il giocatore 1 offre
        // properties2, money2 -> soldi e proprieta che il giocatore 2 offre
        this.player1 = player1;
        this.player2 = player2;
        this.properties1 = properties1;
        this.properties2 = properties2;
        this.id = Offer.id++;

        this.element;

        // aggiungo l'offerta all'array delle offerte
        Offer.offerte.push(this);

        // aggiungo l'offerta a video
        this.createListElement();
    }

    // funzione per aggiugnere l'offerta alla lista delle offerte
    createListElement(){
        let div = document.createElement('div');
        div.id = 'offerta-' + this.id;
        div.className = 'offer';
        
        let offerDisplay = document.getElementById('offer-display');
        offerDisplay.appendChild(div);

        let img1 = document.createElement('img');
        img1.className = 'offer-image';
        img1.src = this.player1.pedina.src;
        div.appendChild(img1);

        let img2 = document.createElement('img');
        img2.className = 'offer-image';
        img2.src = this.player2.pedina.src;
        div.appendChild(img2);

        // bottone per visualizzare l'immagine
        let bottone = document.createElement('button');
        bottone.className = 'offer-button';
        bottone.innerHTML = 'VIEW';
        bottone.onclick = visualizzaOfferta;
        bottone.dataset.id = this.id;
        div.appendChild()
    }
}

// funzione per visualizzare l'offerta corrente nella finestra view offer
function visualizzaOfferta(e){
    e.preventDefault();

    // ottengo l'id dell'offerta
    let bottone = e.target;

    let id = Number(bottone.dataset.id);

    // ottengo i dati relativi all'offerta
    let offerta = Offer.offerte[id];
}


// funzione per inizializzare player e offer display
// di fatto soltanto player display
function initChat(){
    let playerDisplay = document.getElementById('player-display');

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
        element.appendChild(img);

        let name = document.createElement('div');
        name.className = 'player-list-name';

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
}


// funzione per inizializzare le finestre di view offer e make offer
function initMessageBox(){
    let messageBox = document.getElementById('message-box');
    let makeOffer = document.createElement('form');
    let viewOffer = document.createElement('form');
    messageBox.appendChild(makeOffer);
    messageBox.appendChild(viewOffer);

    makeOffer.style.display = 'none';
    viewOffer.style.display = 'none';

    makeOffer.id = 'make-offer';
    viewOffer.id = 'view-offer';

    //DEBUG
    let messageContainer = document.getElementById('message-container');
    messageContainer.style.display = 'none';
    makeOffer.style.display = 'block';
    

    // layout di make offer
    let titleMakeOffer = document.createElement('h3');
    titleMakeOffer.className = 'message-box-title';
    titleMakeOffer.innerHTML = 'Make Offer';
    makeOffer.appendChild(titleMakeOffer);

    let playerList = document.createElement('p');
    playerList.className = 'player-list-offer';
    makeOffer.appendChild(playerList);

    

    // aggiungo tutti i giocatori alla lista
    for (let giocatore in giocatori){
        let player = giocatori[giocatore];

        // tutti i player tranne il main player
        if (player.id == 'giocatore-0')
            continue;

        let container = document.createElement('div');
        container.className = 'radio-container';

        let radio = document.createElement('input');
        radio.type = 'radio'
        radio.id = 'radio-' + player.id;
        radio.name = 'giocatore';
        radio.value = player.id;

        radio.addEventListener('input',(e)=>{
            e.preventDefault();

            // aggiorno la lista
            let radio_id = e.target.id.split('-');
            let id = Number(radio_id[2]);

            let player = giocatori[id];

            let checkList = document.getElementById('offer-checklist-2');
            checkList.innerHTML = '';

            let prop_id = 0;
            for (let prop in player.proprieta){
                let p = player.proprieta[prop];

                let check = document.createElement('input');
                check.type = 'checkbox';
                check.name = 'proprieta-2-' + prop_id;
                check.id = 'checkbox-2-' + prop_id;
                check.value = p;

                let label = document.createElement('label');
                label.htmlFor = 'checkbox-2-' + prop_id++;
                label.appendChild(document.createTextNode(p));

                checkList.appendChild(check);
                checkList.appendChild(label);
                checkList.appendChild(document.createElement('br'));
            }

        })

        if (player.id == 'giocatore-1')
            radio.checked = 1;

        let label = document.createElement('label');
        label.htmlFor = 'radio-' + player.id;

        let img = document.createElement('img');
        img.src = player.pedina.src;
        label.appendChild(img);

        label.appendChild(document.createTextNode(player.username))

        container.appendChild(label);
        container.appendChild(radio);

        playerList.appendChild(container);
    }

    // ho bisogno di inserire 2 finestre con proprieta e soldi da scegliere
    let container = document.createElement('div');
    container.className = 'container-make-offer';
    makeOffer.appendChild(container);

    {
        // primo giocatore
        let firstPlayer = document.createElement('div');
        container.appendChild(firstPlayer);
        firstPlayer.className = 'make-offer-player';

        // creo la checklist
        let checkList = document.createElement('p');
        firstPlayer.appendChild(checkList);
        checkList.id = 'offer-checklist-1';
        checkList.className = 'make-offer-checklist';

        // soltanto per debug ci aggiungo delle proprieta' casuali
        let proprieta1 = ['via luigia','via contessa matilde','ole ole','ola ola','ma che ma che','ole osi','ola ola','ma che ma che','ole osi'];
        let id = 0;
        for (let prop in proprieta1){
            let p = proprieta1[prop];

            let check = document.createElement('input');
            check.type = 'checkbox';
            check.name = 'proprieta-1-' + id;
            check.id = 'checkbox-1-' + id;
            check.value = p;

            let label = document.createElement('label');
            label.htmlFor = 'checkbox-1-' + id++;
            label.appendChild(document.createTextNode(p));

            checkList.appendChild(check);
            checkList.appendChild(label);
            checkList.appendChild(document.createElement('br'));
        }

        let sliderContainer = document.createElement('p');

        let slider = document.createElement('input');
        slider.type = 'range';
        slider.id = 'slider-1';
        slider.max = giocatori[0].saldo;

        let label = document.createElement('label');
        sliderContainer.appendChild(label);
        sliderContainer.appendChild(document.createElement('br'));
        sliderContainer.appendChild(slider);
        label.innerHTML = slider.value;

        label.htmlFor = 'slider-1';
        label.id = 'label-slider-1';
        slider.addEventListener('input',(e)=>{
            e.preventDefault();
            let label = document.getElementById('label-slider-1');
            label.innerHTML = e.target.value;
        })
        firstPlayer.appendChild(sliderContainer);
    }


    // aggiungo una riga verticale
    let div = document.createElement('div');
    container.appendChild(div);
    div.className = 'vertical-line';


    {
        // secondo giocatore
        let player = document.createElement('div');
        container.appendChild(player);
        player.className = 'make-offer-player';

        // creo la checklist
        let checkList = document.createElement('p');
        player.appendChild(checkList);
        checkList.id = 'offer-checklist-2';
        checkList.className = 'make-offer-checklist';

        // prima inizializzazione ma poi deve cambiare
        let id = 0;
        for (let prop in giocatori[1].proprieta){
            let p = giocatori[1].proprieta[prop];

            let check = document.createElement('input');
            check.type = 'checkbox';
            check.name = 'proprieta-2-' + id;
            check.id = 'checkbox-1-' + id;
            check.value = p;

            let label = document.createElement('label');
            label.htmlFor = 'checkbox-1-' + id++;
            label.appendChild(document.createTextNode(p));

            checkList.appendChild(check);
            checkList.appendChild(label);
            checkList.appendChild(document.createElement('br'));
        }

        let sliderContainer = document.createElement('p');

        let slider = document.createElement('input');
        slider.type = 'range';
        slider.id = 'slider-2';
        slider.max = giocatori[0].saldo;

        let label = document.createElement('label');
        sliderContainer.appendChild(label);
        sliderContainer.appendChild(document.createElement('br'));
        sliderContainer.appendChild(slider);
        label.innerHTML = slider.value;

        label.htmlFor = 'slider-2';
        label.id = 'label-slider-2';
        slider.addEventListener('input',(e)=>{
            e.preventDefault();
            let label = document.getElementById('label-slider-2');
            label.innerHTML = e.target.value;
        })
        player.appendChild(sliderContainer);
    }

    // aggiugno un paio di bottoni
    let sendOffer = document.createElement('button');
    sendOffer.id = 'send-offer';
    sendOffer.onclick = inviaOfferta;
    sendOffer.innerHTML = 'Invia';
    makeOffer.appendChild(sendOffer);
}

// funzione che manda un offerta da un giocatore ad un altro giocatore
function inviaOfferta(id1, id2, proprieta1, proprieta2, soldi1, soldi2){
    if (id1 instanceof Event){
        // funzione chiamata perché il giocatore ha premuto il pulsante sendOffer
        id1.preventDefault();

        // ottengo i dati del form
        id1 = 0;
        let makeOffer = document.getElementById('make-offer');

        let player = document.querySelector('input[type="radio"][name="giocatore"]:checked');
        id2 = player.value.split('-')[1];
        
        proprieta1 = [];
        let checkboxes1 = document.querySelectorAll('input[type="checkbox"][name^="proprieta-1-"]:checked');

        for (let p in checkboxes1){
            if (checkboxes1[p].value)
                proprieta1.push(checkboxes1[p].value)
        }

        proprieta2 = [];
        let checkboxes2 = document.querySelectorAll('input[type="checkbox"][name^="proprieta-2-"]:checked');

        for (let p in checkboxes2){
            if (checkboxes2[p].value)
                proprieta2.push(checkboxes2[p].value)
        }

        soldi1 = document.querySelector('#slider-1');
        soldi1 = soldi1.value;

        soldi2 = document.querySelector('#slider-2');
        soldi2 = soldi2.value;
    }
    // altrimenti si tratta di una normale chiamata a funzione, in questo caso
    // un bot ha mandato un'offerta

    new Offerta(id1,id2,proprieta1,proprieta2,soldi1,soldi2);

}


// array delle offerte per tenere traccia
let offerte = [];
class Offerta{

    static id = 0;

    constructor(id1,id2,proprieta1,proprieta2,soldi1,soldi2){
        this.id1 = id1;
        this.id2 = id2;
        this.proprieta1 = proprieta1;
        this.proprieta2 = proprieta2;
        this.soldi1 = soldi1;
        this.soldi2 = soldi2;
        this.id = Offerta.id++;

        // aggiungo all'array delle offerte
        offerte.push(this);

        // mostra a video l'offerta
        let offerDisplay = document.getElementById('offer-display');

        // il layout dell'offerta nella lista delle offerte e' formato soltanto da due immagini ed un bottone
        this.container = document.createElement('div');
        this.container.className = 'offer-container';

        let img1 = document.createElement('img');
        this.container.appendChild(img1);
        img1.src = giocatori[id1].pedina.src;

        let img2 = document.createElement('img');
        this.container.appendChild(img2);
        img2.src = giocatori[id2].pedina.src;

        // infine un bottone per vedere i dettagli dell'offerta
        let button = document.createElement('button');
        button.onclick = mostraOfferta;
        this.container.appendChild(button);
        button.innerHTML = 'View';
        button.dataset.id = this.id;

        offerDisplay.appendChild(this.container);
    }
}

function creaOfferta(e){
    e.preventDefault();

    let messageContainer = document.getElementById('message-container');
    let viewOffer = document.getElementById('view-offer');
    let makeOffer = document.getElementById('make-offer');

    messageContainer.style.display = 'none';
    viewOffer.style.display = 'none';
    makeOffer.style.display = 'block';

    // ogni volta che viene chiamato crea offerta mostra le mie proprieta aggiornate

}


function mostraOfferta(e){
    e.preventDefault();

    let messageContainer = document.getElementById('message-container');
    let viewOffer = document.getElementById('view-offer');
    let makeOffer = document.getElementById('make-offer');

    messageContainer.style.display = 'none';
    viewOffer.style.display = 'block';
    makeOffer.style.display = 'none';

    // mostra i dettagli dell'offerta
    // se e' un'offerta gia' conclusa allora mostra il bottone disabilitato
    // se e' un'offerta di altri giocatori allora mostra il bottone disabilitato
    // se e' un'offerta che posso accettare allora mostra il bottone abilitato

}



class Gioco{

    static quanti = 0;

    constructor(){

        // massimo 1 gioco contemporaneamente
        if (Gioco.quanti > 0)
            return;
        Gioco.quanti++;

        this.round = 0;

        // inizializzo il gioco
        // 1. inizializzo playerdisplay
        initChat()

        // 2. inizializzo il layout della finestra
        initMessageBox()
    }

    // facciamo un turno del giocatore
}

