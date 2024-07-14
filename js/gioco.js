// id del giocatore principale
let mainPlayer = 0;
let numPlayer = 5;
let npc = ['marco','giovanni','sandro','aldo','luca', 'silvia', 'giulia','eleonora','giacomo'];

class Giocatore{

    constructor(username){

        // sistemo la pedina
        this.pedina = document.createElement('img');
        this.pedina.className = 'giocatore';
        this.pedina.src = '/media/player/pedina_' + giocatori.length + '.svg';

        // do un id al giocatore
        this.id = 'giocatore-' + giocatori.length;
        this.numId = giocatori.length;

        // username casuale
        this.username = username;

        // saldo
        this.saldo = 1500;

        // campo significativo solo per gli npc
        if (this.numId){
            this.ai = new IA(this);
        }

    }

    // inizializzazione giocatore
    init(){
        // inseririsco il giocatore nella prima casella
        let casella = document.getElementById('contenitore-giocatori-0');
        casella.appendChild(this.pedina);

        // inizializzo posizione
        this.posizione = 0;

        // inizializzo saldo
        this.saldo = 1500;
        this.updateSaldo();

        // inizializzo proprieta
        this.proprieta = [];

        // prigione
        this.prigione = 0;

        // inizializzo le offerte
        this.offerte = [];

        this.bancarotta = 0;
    }

    // sposto il giocatore nella casella i caselle avanti e ritorniamo l'indice della casella
    muoviGiocatore(i){
        if (i > 12){
            console.log('movimento errato');
            return;
        }

        i = (i + this.posizione) % 40;
        let newdiv = document.getElementById('contenitore-giocatori-' + i);
        newdiv.appendChild(this.pedina);

        this.posizione = i;

        return i;
    }

    muoviGiocatoreAbs(i){
        if (i < 0 || i > 39){
            console.log('movimento errato');
            return;
        }

        let newdiv = document.getElementById('contenitore-giocatori-' + i);
        newdiv.appendChild(this.pedina);

        this.posizione = i;

        return i;
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
        this.prigione = 1;

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


    updateSaldo(){
        const saldo = document.getElementById('saldo-giocatore-' + this.numId);
        saldo.innerHTML = this.saldo;
    }


    dichiaraBancarotta(){
        console.log(this.username + ' ha dichiarato bancarotta');
        this.bancarotta = 1;
        const saldo = document.getElementById('saldo-giocatore-' + this.numId);
        saldo.innerHTML = "BANCAROTTA";


        // quando un giocatore dichiara bancarotta tutte le sue proprieta vengono liberate
        for (let p of this.proprieta)
            p.free();

        this.proprieta = [];
    }
}

// inizializzo l'array dei giocatori
giocatori = [];
function initGiocatori(){
    // inizializzo l'array dei giocatori
    giocatori.push(new Giocatore(username));
    giocatori.push(new Giocatore(npc[0]));
    giocatori.push(new Giocatore(npc[1]));
    giocatori.push(new Giocatore(npc[2]));
    giocatori.push(new Giocatore(npc[3]));
}

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
            let i = giocatore.muoviGiocatoreAbs(this.valore);

            // bisogna fare la mossa corrispondente alla nuova posizione
            let casella = scenario[i];
            console.log(this.valore);
            casella.move(giocatore.numId,Math.abs(this.valore));

        } else if (this.effetto == 'MOVE'){
            console.log(this.valore);
            let i = giocatore.muoviGiocatore(this.valore);

            // bisogna fare la mossa corrispondente alla nuova posizione
            let casella = scenario[i];
            casella.move(giocatore.numId,Math.abs(this.valore));

        } else if (this.effetto == 'PAY'){
            giocatore.paga(this.valore);
            giocatore.updateSaldo();
            return;
        } else if (this.effetto == 'PRISON'){
            giocatore.goToPrison();
        } else if (this.effetto == 'GIFT'){
            giocatore.ricevi(this.valore);
            giocatore.updateSaldo();
        } else if (this.effetto == 'MANTEINANCE'){
            giocatore.manutenzione(this.valore,this.valore2);
            giocatore.updateSaldo();
        } else if (this.effetto == 'GIVE'){
            giocatore.pagaGiocatori(this.valore);
            giocatore.updateSaldo();
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
imprevisti.push(new Carta('Imprevisti', 'Maturano i fondi sull\'assicurazione sulla vita: ritirate $50', 'GIFT', 50));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino a Viale dei Giardini', 'MOVE_ABSOLUTE',37));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino a Via Marco Polo, se passate dal via ritirate $200', 'MOVE_ABSOLUTE', 21));
imprevisti.push(new Carta('Imprevisti', 'Siete stati eletti amministratore di condominio, pagate a ciascun giocatore $50', 'GIVE', 50));
imprevisti.push(new Carta('Imprevisti', 'Eseguite lavori di manutenzione su tutte le vostre proprietà, per ogni casa pagate $25, per ogni albergo pagate $100', 'MAINTENANCE',25,100));
imprevisti.push(new Carta('Imprevisti', 'Avanzate fino al Via! Ritirate $200', 'MOVE_ABSOLUTE', 0));
imprevisti.push(new Carta('Imprevisti', 'Maturano i vostri investimenti, ritirate $150', 'GIFT', 150));
let indiceImprevisti = Math.floor(Math.random() * imprevisti.length);



let probabilita = [];
probabilita.push(new Carta('Probabilita','Ereditate delle proprietà da un lontano parente, ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Avanzate fino al Via! Ritirate $200', 'MOVE_ABSOLUTE', 0));
probabilita.push(new Carta('Probabilita','Avete vinto la lotteria! Ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Ricevete le parcelle della tintoria, pagate $100', 'PAY', 100));
probabilita.push(new Carta('Probabilita','La banca riconosce un errore nel vostro conto, ritirate $200', 'GIFT', 200));
probabilita.push(new Carta('Probabilita','Maturano dei vostri investimenti, ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Versate il rimanente delle rette universitarie dei vostri figli, pagate $200', 'PAY', 200));
probabilita.push(new Carta('Probabilita','Ricevete la parcella del dottore, pagate $50', 'PAY', 50));
probabilita.push(new Carta('Probabilita','Maturano gli interessi della vostra assicurazione sulla vita. Ritirate $100', 'GIFT', 100));
probabilita.push(new Carta('Probabilita','Andate in prigione senza passare dal via, non ritirate $200', 'PRISON'));
let indiceProbabilita = Math.floor(Math.random() * probabilita.length);



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
}


// funzione per inizializzare le finestre di view offer e make offer
// ed i relativi bottoni
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
            for (let prop of player.proprieta){
                let check = document.createElement('input');
                check.type = 'checkbox';
                check.name = 'proprieta-2-' + prop_id;
                check.id = 'checkbox-2-' + prop_id;
                check.value = prop.nome;


                let label = document.createElement('label');
                label.htmlFor = 'checkbox-2-' + prop_id++;
                label.innerHTML = prop.nome;

                checkList.appendChild(label);
                label.appendChild(check);
                checkList.appendChild(document.createElement('br'));
            }
        });

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

    {
        // aggiungo una riga verticale
        let div = document.createElement('div');
        container.appendChild(div);
        div.className = 'vertical-line';
    }


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
            check.value = p.nome;

            let label = document.createElement('label');
            label.htmlFor = 'checkbox-1-' + id++;
            label.appendChild(document.createTextNode(p.nome));

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


    // inizializzo il layout di viewoffer
    // titolo
    let titleViewOffer = document.createElement('h1');
    titleViewOffer.innerHTML = 'View Offer';
    viewOffer.appendChild(titleViewOffer);
    titleViewOffer.className = 'view-offer-title';

    let containerViewOffer = document.createElement('div');
    containerViewOffer.className = 'view-offer-container';
    viewOffer.appendChild(containerViewOffer);

    {
        // casella del giocatore 1
        let container = document.createElement('div');
        container.className = 'view-offer-player-container';

        // immagine che devo inizializzare quando premo il bottone view offer
        let img = document.createElement('img');
        container.appendChild(img);
        img.id = 'view-offer-img-1';

        // nome
        let name = document.createElement('h2');
        container.appendChild(name);
        name.id = 'view-offer-name-1';

        // lista delle proprieta
        let propContainer = document.createElement('div');
        propContainer.id = 'view-offer-properties-1';
        container.appendChild(propContainer);
        propContainer.className = 'view-offer-properties';

        // dollari
        let money = document.createElement('h2');
        money.id = 'view-offer-money-1';
        container.appendChild(money);
        money.className = 'view-offer-money';

        containerViewOffer.appendChild(container);
    }

    let vl = document.createElement('div');
    vl.className = 'vertical-line';
    containerViewOffer.appendChild(vl);

    {
        // casella del giocatore 2
        let container = document.createElement('div');
        container.className = 'view-offer-player-container';

        // immagine che devo inizializzare quando premo il bottone view offer
        let img = document.createElement('img');
        container.appendChild(img);
        img.id = 'view-offer-img-2';

        // nome
        let name = document.createElement('h2');
        container.appendChild(name);
        name.id = 'view-offer-name-2';

        // lista delle proprieta
        let propContainer = document.createElement('div');
        propContainer.id = 'view-offer-properties-2';
        container.appendChild(propContainer);
        propContainer.className = 'view-offer-properties';

        // dollari
        let money = document.createElement('h2');
        money.id = 'view-offer-money-2';
        container.appendChild(money);
        money.className = 'view-offer-money';

        containerViewOffer.appendChild(container);
    }

    // inserisco i bottoni in view offer che sono accetta e rifiuta
    {
        let buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        let button1 = document.createElement('button');
        buttonContainer.appendChild(button1);
        button1.innerHTML = 'Accetta';
        button1.id = 'accetta';
        button1.className = 'view-offer-button';
        button1.onclick = accettaOfferta;

        let button2 = document.createElement('button');
        buttonContainer.appendChild(button2);
        button2.innerHTML = 'Rifiuta';
        button2.id = 'rifiuta';
        button2.className = 'view-offer-button';
        button2.onclick = rifiutaOfferta;

        viewOffer.appendChild(buttonContainer);

    }

    // inizializzo il bottone
    let bottone2 = document.getElementById('nuova-offerta');
    bottone2.onclick = mostraMakeOffer;


    // inizializzo i bottoni per comprare/vendere proprieta/case
    {
        const compra = document.getElementById('compra');
        const vendi = document.getElementById('vendi');
        const compraC = document.getElementById('compra-casa');
        const vendiC = document.getElementById('vendi-casa');


        compra.onclick = compraProprieta;
        vendi.onclick = vendiProprieta;
        compraC.onclick = compraCasa;
        vendiC.onclick = vendiCasa;
    }



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

        for (let p of checkboxes1){
            proprieta1.push(getCasella(p.value));
        }

        proprieta2 = [];
        let checkboxes2 = document.querySelectorAll('input[type="checkbox"][name^="proprieta-2-"]:checked');

        for (let p of checkboxes2){
            proprieta2.push(getCasella(p.value));
        }

        soldi1 = document.querySelector('#slider-1');
        soldi1 = soldi1.value;

        soldi2 = document.querySelector('#slider-2');
        soldi2 = soldi2.value;
    }
    // altrimenti si tratta di una normale chiamata a funzione, in questo caso
    // un bot ha mandato un'offerta

    // DEBUG
    let stringa1 = '';
    for (let p of proprieta1){
        stringa1 += ' ' + p.nome;
    }

    let stringa2 = '';
    for (let p of proprieta2){
        stringa2 += ' ' + p.nome;
    }

    console.log(giocatori[id1].username + " sta inviando un'offerta a " + giocatori[id2].username + '; p1 = ' + stringa1 + '; p2 = ' + stringa2);

    let offerta = new Offerta(id1,id2,proprieta1,proprieta2,soldi1,soldi2);

    if (id1 == 0){
        giocatori[id2].offerte.push(offerta);
    }

}


// array delle offerte per tenere traccia
let offerte = [];

class Offerta{

    static id = 0;

    constructor(id1,id2,proprieta1,proprieta2,soldi1,soldi2){
        
        // controllo che l'offerta non venga fatta a se stessi
        if (id1 == id2)
            return;

        // controllo che non vengano fatte offerte duplicate
        for (let o in offerte){
            let offer = offerte[o];

            if (offer.id1 == id1 && offer.id2 == id2 && 
                offer.soldi1 == soldi1 && offer.soldi2 == soldi2
            ){
                if (!id1)
                    alert('E\' gia\' stata fatta un\'offerta identica');
                return;
            }

        }

        this.id1 = id1;
        this.id2 = id2;
        this.proprieta1 = proprieta1;
        this.proprieta2 = proprieta2;
        if (!proprieta1)
            proprieta1 = [];
        if (!proprieta2)
            proprieta2 = [];
        
        this.soldi1 = Number(soldi1);
        this.soldi2 = Number(soldi2);
        this.id = Offerta.id++;
        this.status = 1;                // lo status di un'offerta vale 1 se attiva 0 se non attiva

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
        button.onclick = mostraViewOffer;
        this.container.appendChild(button);
        button.innerHTML = 'View';
        button.dataset.id = this.id;

        offerDisplay.appendChild(this.container);
    }

    // bisogna aggiungere il controllo che a chiamare sia il player che deve accettare l'offerta
    acceptOffer(){
        // funzione per accettare l'offerta
        // controllo che l'offerta sia ancora attiva
        if (!this.status){
            if (this.id2 == 0)
                alert("Offerta gia' gestita, impossibile accettarla");
            return;
        }

        // a questo punto viene fatto il controllo della validita' dell'offerta
        // soldi e proprieta primo giocatore
        // soldi e proprieta secondo giocatore
        let player1 = giocatori[this.id1];
        let player2 = giocatori[this.id2];

        if (player1.saldo < this.soldi1 || player2.saldo < this.soldi2){
            if (!this.id1)
                alert("L'offerta non puo' essere accettata per saldo insufficiente...");
            this.status = 0;
            return;
        }

        // controllo che tutte le proprieta del primo giocatore siano presenti
        // e che non abbiano case o alberghi
        for (let p of this.proprieta1){
            if (!player1.proprieta.includes(p)){
                // se anche solo una proprieta non e' contenuta l'offerta cade
                if (!this.id1)
                    alert("L'offerta non puo' essere accettata per proprieta' mancanti...");
                this.status = 0;
                return;
            }
            if (p.case > 0 || p.albergo > 0){
                if (!this.id1)
                    alert("Non si possono vendere proprieta con case...");
                this.status = 0;
                return;
            }
        }

        // controllo che tutte le proprieta del secondo giocatore siano presenti
        for (let p of this.proprieta2){
            if (!player2.proprieta.includes(p)){
                // se anche solo una proprieta non e' contenuta l'offerta cade
                alert("L'offerta non puo' essere accettata per proprieta' mancanti...");
                this.status = 0;
                return;
            }
            if (p.case > 0 || p.albergo > 0){
                alert("Non si possono vendere proprieta con case...");
                this.status = 0;
                return;
            }
        }

        // allora rimuoviamo le proprieta ed i soldi
        player1.saldo -= Number(this.soldi1);
        player1.saldo += Number(this.soldi2);

        player2.saldo -= Number(this.soldi2);
        player2.saldo += Number(this.soldi1);

        // aggiorno a video il saldo dei giocatori
        const saldo1 = document.getElementById('saldo-giocatore-' + this.id1);
        const saldo2 = document.getElementById('saldo-giocatore-' + this.id2);
        saldo1.innerHTML = player1.saldo;
        saldo2.innerHTML = player2.saldo;

        // rimuovo al primo aggiungo al secondo
        for (let p of this.proprieta1){
            let indice = player1.proprieta.indexOf(p);
            if (indice < 0)
                continue;
            
            // rimuovo la proprieta dal primo giocatore
            player1.proprieta.splice(indice,1)[0];

            // la aggiungo al secondo giocatore
            player2.proprieta.push(p);
            p.owner = this.id2;
        }

        // rimuovo al secondo aggiungo al primo
        for (let p of this.proprieta2){
            let indice = player2.proprieta.indexOf(p);

            if (indice < 0)
                continue;

            // rimuovo la proprieta dal primo giocatore
            player2.proprieta.splice(indice,1)[0];

            // la aggiungo al secondo giocatore
            player1.proprieta.push(p);
            p.owner = this.id1;
        }

        // nel caso in cui sia coinvolto il giocatore 0 modifichiamo anche le proprieta che sono presenti sul tabellone
        if (this.id1 == 0){
            // allora devo eliminare le 1 ed aggiungere le 2
            for (let p of this.proprieta1){
                p.rimuoviProprieta();
            }

            for (let p of this.proprieta2){
                p.stampaProprieta();
            }
        } else if (this.id2 == 0){
            // allora devo eliminare le 2 ed aggiungere le 1
            for (let p of this.proprieta1){
                p.stampaProprieta();
            }

            for (let p of this.proprieta2){
                p.rimuoviProprieta();
            }
        }


        // disabilito i bottoni
        const accetta = document.getElementById('accetta');
        const rifiuta = document.getElementById('rifiuta');
        accetta.disabled = 1;
        rifiuta.disabled = 1;

        // aggiorno lo status
        this.status = 0;
    }

    // bisogna aggiungere il controllo che a chiamare sia il player che deve accettare l'offerta
    rifiutaOffer(){
        // disabilito i bottoni
        const accetta = document.getElementById('accetta');
        const rifiuta = document.getElementById('rifiuta');
        accetta.disabled = 1;
        rifiuta.disabled = 1;
        
        // aggiorno lo status
        this.status = 0;
    }
}

// funzione chiamata dal bottone per comprare una proprieta
function compraProprieta(e){
    e.preventDefault();
    
    let nome = e;

    let bottone = e.target;
    nome = bottone.dataset.nome;

    // ottengo un riferimento alla casella
    let casella = null;
    casella = getCasella(nome);

    if (!casella){
        console.log('compraProprieta - nesssuna casella con questo nome');
        return;
    }

    // ottengo un riferimento al giocatore
    let player = giocatori[0];

    // controllo che la casella sia acquistabile
    if (!casella.acquistabile){
        return;
    }

    // controllo che la casella non abbia owner
    if (casella.owner){
        return;
    }

    // controllo che il giocatore abbia abbastanza saldo
    if (player.saldo < casella.prezzo[0]){
        alert('Non hai abbastanza soldi per comprare questa casella');
        return;
    }

    // a questo punto il giocatore ha acquistato la proprieta
    player.proprieta.push(casella);

    casella.owner = player.numId;
    casella.case = 0;
    casella.alberghi = 0;
    
    // aggiorno il saldo ed aggiorno il saldo a video
    player.paga(casella.prezzo[0]);
    player.updateSaldo();
    casella.stampaProprieta();
}

// funzione chiamata per vendere una proprieta
function vendiProprieta(e){
    e.preventDefault();

    let nome = e.target.dataset.nome;

    let casella = null;
    casella = getCasella(nome);

    if (!casella){
        console.log('vendiProprieta - nessuna casella con questo nome');
        return;
    }


    // controllo che l'owner sia il giocatore
    if (casella.owner != 0){
        alert("Non possiedi questa casella!");
        return;
    }

    if (casella.case || casella.albergo){
        alert("Non puoi vendere proprieta con case");
        return;
    }

    // procedo a venderla

    if (!confirm("Sei sicuro di voler vendere la proprieta?")){
        return;
    }

    casella.owner = null;
    let player = giocatori[0];
    player.ricevi(casella.prezzo[0]);
    player.updateSaldo();

    // rimuovo la proprieta dall'array delle proprieta
    let indice = player.proprieta.indexOf(casella);
    player.proprieta.splice(indice,1);

    // rimuovo la proprieta a video
    casella.rimuoviProprieta();
}

// funzione chiamata per comprare una casa
function compraCasa(e){
    e.preventDefault();

    // ottengo riferimento alla proprieta
    let nome = e;
    let bottone = e.target;
    console.log(bottone.dataset.nome);
    nome = bottone.dataset.nome;

    // ottengo riferimento al giocatore
    let player = giocatori[0];

    let casella = getCasella(nome);

    if (!casella){
        console.log('compraCasa - nessuna casella con questo nome');
        return;
    }

    // controllo che l'owner sia il giocatore
    if (casella.owner != 0){
        alert("Non possiedi questa proprieta");
        return;
    }

    // controllo che il giocatore possieda l'intera serie
    for (let p of scenario){
        if (p.gruppo == casella.gruppo && p.owner != 0){
            alert("per comprare una casa devi prima possedere l'intera serie");
            return;
        }
    }

    // controllo che si possano acquistare case
    if (casella.case == 4 && casella.albergo == 0){
        // acquisto albergo

        // 1. controllo di avere il saldo disponibile per farlo
        if (player.saldo < casella.prezzo[2]){
            alert("non hai abbastanza soldi per acquistare una l'albergo");
            return;
        }

        // 2. aggiorno il saldo ed aggiungo l'albergo
        casella.case = 0;
        casella.albergo = 1;
        player.saldo -= casella.prezzo[2];

        casella.stampaCase();
        
    } else if (casella.case < 4){

        // 1. controllo saldo
        if (player.saldo < casella.prezzo[1]){
            alert("non hai abbastanza soldi per acquistare una casa");
            return;
        }

        // 2. aggiorno saldo ed aggiungo la casa
        casella.case++;
        player.saldo -= casella.prezzo[1];


    } else {
        alert("non puoi acquistare altre case per questa proprieta'");
        return;
    }

    // aggiorno il saldo a video
    const saldo = document.getElementById('saldo-giocatore-0');
    saldo.innerHTML = player.saldo;

    // aggiorno le case a video
    casella.stampaCase();
}

// funzione chiamata per vendere una casa
function vendiCasa(e){
    e.preventDefault();

    let casella = null;
    let nome = e.target.dataset.nome;
    casella = getCasella(nome);

    let player = giocatori[0];

    if (!casella){
        console.log('vendiCasa - nessuna casella con questo nome');
        return;
    }


    // controllo che il giocatore sia owner della casa
    if (casella.owner != 0){
        alert("non possiedi questa proprieta");
        return;
    }

    // controllo che la proprieta abbia delle case
    if (casella.case == 0 && casella.albergo == 0){
        alert("non possiedi case su questa proprieta");
        return;
    }

    // se vendo l'albergo viene rimpiazzato da 4 case
    if (casella.albergo){
        casella.albergo = 0;
        casella.case = 4;
        player.saldo += casella.prezzo[2];
    } else {
        casella.case--;
        player.saldo += casella.prezzo[1];
    }

    // aggiorno le case a video
    // aggiorno il saldo a video
    const saldo = document.getElementById('saldo-giocatore-0');
    saldo.innerHTML = player.saldo;
}


// funzione associata al bottone per accettare le offerte
function accettaOfferta(e){
    let id = e;
    if (e instanceof Event){
        // funzione chiamata premendo il bottone
        e.preventDefault();

        // dobbiamo recuperare l'id dell'offerta
        let bottone = e.target;
        id = Number(bottone.dataset.id);
    }

    let offerta = offerte[id];

    if (offerta){
        offerta.acceptOffer();
    } else {
        // situazione che non dovrebbe capitare
        console.log("L'utente ha tentato di accettare un'offerta inesistente")
    }
}

// funzione associata al bottone per rifiutare le offerte
function rifiutaOfferta(e){
    let id = e;
    if (e instanceof Event){
        // funzione chiamata premendo il bottone
        e.preventDefault();

        // dobbiamo recuperare l'id dell'offerta
        let bottone = e.target;
        id = Number(bottone.dataset.id);
    }
    
    let offerta = offerte[id];

    if (offerta){
        offerta.rifiutaOffer();
    } else {
        // situazione che non dovrebbe capitare
        console.log("L'utente ha tentato di accettare un'offerta inesistente")
    }
}

function mostraMakeOffer(e){
    e.preventDefault();

    let messageContainer = document.getElementById('message-container');
    let viewOffer = document.getElementById('view-offer');
    let makeOffer = document.getElementById('make-offer');

    messageContainer.style.display = 'none';
    viewOffer.style.display = 'none';
    makeOffer.style.display = 'block';

    // ogni volta che viene chiamato crea offerta mostra le mie proprieta aggiornate
    let c = document.getElementById('offer-checklist-1');
    c.innerHTML = '';
    let clean = document.getElementById('offer-checklist-2');
    clean.innerHTML = '';

    let player = giocatori[0];

    let id = 0;
    for (let p in player.proprieta){
        let a = player.proprieta[p];

        let check = document.createElement('input');
        check.type = 'checkbox';
        check.name = 'proprieta-1-' + id;
        check.id = 'checkbox-1-' + id;
        check.value = a.nome;

        let label = document.createElement('label');
        label.htmlFor = 'checkbox-1-' + id++;
        label.innerHTML = a.nome;

        c.appendChild(label);
        label.appendChild(check);
        c.appendChild(document.createElement('br'));
    }

    // mostro anche il saldo aggiornato
    let slider = document.getElementById('slider-1');
    slider.max = giocatori[0].saldo;

    let messageBox = document.getElementById('message-box');
    messageBox.style.visibility = 'visible';

}

// funzione per visualizzare un'offerta
function mostraViewOffer(e){
    e.preventDefault();

    let messageContainer = document.getElementById('message-container');
    let viewOffer = document.getElementById('view-offer');
    let makeOffer = document.getElementById('make-offer');

    messageContainer.style.display = 'none';
    viewOffer.style.display = 'block';
    makeOffer.style.display = 'none';

    let messageBox = document.getElementById('message-box');
    messageBox.style.visibility = 'visible';

    // ottengo id offerta
    let id = Number(e.target.dataset.id);

    // ottengo i dati dell'offerta
    let offerta = offerte[id];

    
    const accetta = document.getElementById('accetta');
    const rifiuta = document.getElementById('rifiuta');
    
    // inizializzo i bottoni
    accetta.dataset.id = id;
    rifiuta.dataset.id = id;

    // offerta rivolta al giocatore ed ancora attiva
    if (offerta.status && offerta.id2 == 0){
        // allora mostro i bottoni abilitati
        accetta.disabled = false;
        rifiuta.disabled = false;
    } else {
        // altrimenti mostro i bottoni disabilitati
        accetta.disabled = true;
        rifiuta.disabled = true;
    }

    // inizializzo i campi di view offer
    let player1 = giocatori[offerta.id1];
    let player2 = giocatori[offerta.id2];

    {
        // inizializzo i campi del primo player
        //immagine
        let img = document.getElementById('view-offer-img-1');
        img.src = player1.pedina.src;

        let name = document.getElementById('view-offer-name-1');
        name.innerHTML = player1.username;

        //proprieta
        let prop = document.getElementById('view-offer-properties-1');
        prop.innerHTML = '';
        for (let p in offerta.proprieta1){
            let proprieta = offerta.proprieta1[p];
            
            let c = document.createElement('p');
            c.innerHTML = proprieta.nome;

            prop.appendChild(c);
        }

        // soldi
        let soldi = document.getElementById('view-offer-money-1');
        soldi.innerHTML = '$' + offerta.soldi1;
    }

    {
        // inizializzo i campi del secondo player
        //immagine
        let img = document.getElementById('view-offer-img-2');
        img.src = player2.pedina.src;

        let name = document.getElementById('view-offer-name-2');
        name.innerHTML = player2.username;

        //proprieta
        let prop = document.getElementById('view-offer-properties-2');
        prop.innerHTML = '';
        for (let p in offerta.proprieta2){
            let proprieta = offerta.proprieta2[p];
            
            let c = document.createElement('p');
            c.innerHTML = proprieta.nome;

            prop.appendChild(c);
        }

        // soldi
        let soldi = document.getElementById('view-offer-money-2');
        soldi.innerHTML = '$' + offerta.soldi2;
    }

}


// funzione per attendere che il giocatore avvii la partita
function waitStart(){
    return new Promise((resolve) => {
        const roll = document.getElementById('roll');
        roll.innerHTML = 'Avvia il Gioco!';
        roll.disabled = false;
        roll.addEventListener('click',() => { roll.disabled = true; roll.innerHTML = 'Lancia i dadi!'; resolve(); }, {once: true});
    });
}

// funzione per attendere che un player prema i dadi
function waitForDice(){
    return new Promise((resolve) => {
        const roll = document.getElementById('roll');
        roll.disabled = false;
        roll.addEventListener('click', () => { roll.disabled = true; resolve(randomDice());}, {once: true});
    })
}

function waitForEndTurn(){
    return new Promise((resolve) => {
        const roll = document.getElementById('roll');
        roll.disabled = false;
        roll.innerHTML = 'Passa il turno!';
        roll.addEventListener('click', () => { 
            // se il saldo e' negativo non posso terminare il turno
            if (giocatori[0].saldo < 0){
                resolve(false);
            } else {
                roll.disabled = true;
                roll.innerHTML = 'Lancia i dadi!';
                resolve(true);
            }
        }, {once: true} );
    });
}


function waitASec(a){
    return new Promise((resolve) => {
        setTimeout( () => { resolve(); }, a );
    })
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
        // 1. inizializzo il menu
        initChat();

        // 2. inizializzo il layout della finestra
        initMessageBox();

        this.turno = 0;
    }

    abilitaBottoni(){
        const bancarotta = document.getElementById('bancarotta');
        const nuovaOfferta = document.getElementById('nuova-offerta');

        bancarotta.disabled = 0;
        nuovaOfferta.disabled = 0;
        bancarotta.innerHTML = 'Dichiara bancarotta';
        bancarotta.onclick = () => {
            if (confirm("Sei sicuro di voler dichiarare bancarotta?"))
                giocatori[0].bancarotta = 1;
        }
    }

    disabilitaBottoni(){
        const bancarotta = document.getElementById('bancarotta');
        const nuovaOfferta = document.getElementById('nuova-offerta');
        nuovaOfferta.disabled = 1;

        bancarotta.disabled = 0;
        bancarotta.innerHTML = 'Torna alla homepage';
        bancarotta.onclick = showHome;
    }

    // inizializzazione del gioco
    init(){

        // disabilito i bottoni
        this.disabilitaBottoni();

        this.turno = 0;

        // inizializzo nomi
        npc = shuffleArray(npc);
        for (let i = 1; i < numPlayer; i++){
            const name = document.getElementById('player-name-' + i);
            name.innerHTML = npc[i];
        }

        // inizializzo i giocatori
        for (let p of giocatori)
            p.init();


        // inizializzo le caselle
        for (let c of scenario){
            c.rimuoviProprieta();
            c.init();
        }

        // inizializzo le offerte
        // rimuovo le offerte a video
        Offerta.id = 0;
        offerte = [];
        let offerContainers = document.querySelectorAll('.offer-container');
        const offerDisplay = document.getElementById('offer-display');
        for (let o of offerContainers){
            offerDisplay.removeChild(o);
        }



    }

    winCondition(){
        // devo controllare che tutti i giocatori siano in bancarotta tranne il player
        if (giocatori[1].bancarotta && giocatori[2].bancarotta && giocatori[3].bancarotta && giocatori[4].bancarotta)
            return true;
        
        return false;
    }

    async start(){

        // codice di verifica
        let v;
        
        while (1){
            // inizializzo il gioco
            this.init();
    
            // mi metto in attesa che il giocatore prema su avvia gioco
            await waitStart();
            console.log('started');
    
            // ottengo il codice del gioco
            v = await verificationCode();


            // abilito i bottoni
            this.abilitaBottoni();

            while (1){
    
                // controllo che il giocatore abbia vinto o che abbia dichiarato bancarotta
                if (giocatori[0].bancarotta || this.winCondition()){
                    break;
                }
    
                // ottengo un riferimento al player che deve giocare
                let id = this.turno%numPlayer;
                console.log("turno " + this.turno + ' tocca a ' + giocatori[id].username);
                
                let player = giocatori[id];
    
                // controllo se il giocatore e' in bancarotta
                if (player.bancarotta){
                    this.turno++;
                    continue;
                }
    
                // controllo se il giocatore principale ha perso
                if (id == 0 && player.bancarotta){
                    // allora fai in modo che possa salvare la partita, per il momento non lo consideriamo
                }
    
                let dice1, dice2;
    
                let oldPosition = player.posizione;
    
                // 0. lancio dei dadi
                if (id == 0){
                    [dice1, dice2] = await waitForDice();
                } else {
                    await waitASec(Math.floor(Math.random() * 200));
                    [dice1, dice2] = randomDice();
                }
    
                dice1 = Number(dice1);
                dice2 = Number(dice2);
    
                // 0. controllo che il giocatore non sia in prigione
                if (player.prigione){
                    // se il giocatore ha fatto doppio esce normalmente
                    if (dice1 == dice2){
                        player.prigione = 0;
                        if (id == 0){
                            alert("Hai fatto doppio e sei uscito di prigione!");
                        }
                    } else {
                        // se il giocatore non ha fatto doppio allora salta il turno
                        player.prigione++;
    
                        // se ha gia' saltato 3 turni allora paga 50 ed esci
                        if (player.prigione == 4){
                            player.paga(50);
                            player.prigione = 0;
                        } else {
                            this.turno++;
                        }
    
                        if (id){
                            await waitASec(1000);
                            continue;
                        } else {
                            await waitForEndTurn();
                            continue;
                        }
                    }
                }
    
                // 1. spostamento della casella
                player.muoviGiocatore(dice1 + dice2);
    
                // 2. controllo se sono passato dal via
                let newPosition = player.posizione;
    
                if (newPosition < oldPosition){
                    player.ricevi(200);
                    player.updateSaldo();
                }
    
    
                // 3. controllo su che casella mi trovo
                let casella = scenario[newPosition];
                let ritorno = casella.move(id);
    
    
                // 4. se si tratta di un npc gli diamo la possibilita di fare altre mosse come acquistare case, vendere case, fare offerte ed accettare offerta
                if (id){
                    player.ai.compraCasa();
                    player.ai.faiOfferta(this.turno);
                    player.ai.accettaOfferta();
                }
    
                // il turno non puo' terminare se il saldo e' negativo
                if (!id){
                    while (1){
                        let bool = await waitForEndTurn();
                        if (bool)
                            break;
                        alert("Non puoi terminare il turno con saldo negativo");
                    }
                } else {
                    // neanche il turno degl npc puo' terminare con saldo negativo
                    if (player.saldo < 0){
                        // provo a vendere qualcosa
                        let a = player.ai.sell(Math.abs(player.saldo));
                        // se non riesce a vendere niente allora dichiara bancarotta
                        if (a == -1)
                            player.dichiaraBancarotta();
                    }
                    await waitASec(1000);
                }
    
    
                // se il giocatore ha fatto doppio allora ripeti il turno
                if (dice1 != dice2)
                    this.turno++;
                else
                    console.log(player.username + ' ha fatto doppio quindi lancia di nuovo');
    
    
                // alla fine del turno controllo se il player e' andato in bancarotta
                if (giocatori[0].bancarotta)
                    break;
            }

            // disabilito i bottoni
            this.disabilitaBottoni();

    
            let win = ''
            // il gioco e' finito, dobbiamo verificare se il giocatore ha vinto oppure no
            if (giocatori[0].bancarotta){
                win = 'Hai perso';
            } else {
                win = 'Hai vinto';

                // se il giocatore ha vinto allora dobbiamo aggiornare il suo punteggio
                let punteggio = calcolaValore();

                // adesso inviamo il punteggio
                inviaPunteggio(punteggio,v);
            }

            // chiediamo al giocatore se vuole tornare alla homepage
            if (confirm(win + " vuoi tornare alla homepage?")){
                showHome();
            } else {
                ;   // lascia che il giocatore giochi una nuova partita
            }


        }
    }
}


function calcolaValore(){
    // calcolo il valore accumulato dal giocatore
    let valore = giocatori[0].saldo;

    for (let p of giocatori[0].proprieta)
        valore += Number(p.prezzo[0]);

    return valore;
}


// funzione per avviare un gioco e ricevere un verification code
async function verificationCode(){

    return new Promise((resolve) => {

        const data = 'username=' + giocatori[0].username;
        console.log(data);

        let request = new XMLHttpRequest();
        
        request.open("post", "../php/game.php");
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.onload = () => {
            const response = JSON.parse(request.response);
            resolve(response['id']);
        }
        request.onerror = (error) => console.log(error);
        request.send(data);
    });


}

// funzione per inviare il punteggio
function inviaPunteggio(p,id){

    // caricamento del punteggio
    const data = 'punteggio=' + p + '&id=' + id;
    
    let request = new XMLHttpRequest();
    
    request.open("post", "../php/punteggio.php");
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
    request.onload = () => {
        console.log(request.response);
        const response = JSON.parse(request.response);
        console.log(response);
    };

    request.onerror = (event) => console.log(event);
    request.send(data);
}

