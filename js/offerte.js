// file che implementa l'oggetto offerta 
// ed una lista globale di offerte
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
                // offerta duplicata
                // segnalo soltanto al giocatore
                // in caso di npc e' ammissibile che venga generata, semplicemente non creo l'offerta

                if (!id1)
                    alert('E\' gia\' stata fatta un\'offerta identica');
                return;
            }

        }

        // stampo messaggio relativo all'offerta
        printMessage(giocatori[id1].username + " sta inviando un'offerta a " + giocatori[id2].username);

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

        // aggiungo all'array delle offerte del giocatore
        giocatori[id2].offerte.push(this);

        // mostra a video l'offerta
        let offerDisplay = document.getElementById('offer-display');

        // il layout dell'offerta nella lista delle offerte e' formato soltanto da due immagini ed un bottone
        this.container = document.createElement('div');
        this.container.className = 'offer-container';

        let img1 = document.createElement('img');
        this.container.appendChild(img1);
        img1.src = giocatori[id1].pedina.src;
        img1.alt = 'player-1';

        let p1 = document.createElement('p');
        p1.innerHTML = giocatori[id1].username;
        this.container.appendChild(p1);

        let p = document.createElement('p');
        this.container.appendChild(p);
        p.innerHTML = '==>';
        p.style.fontWeight = 'bold';

        let img2 = document.createElement('img');
        this.container.appendChild(img2);
        img2.src = giocatori[id2].pedina.src;
        img2.alt = 'player-2';

        let p2 = document.createElement('p');
        p2.innerHTML = giocatori[id2].username;
        this.container.appendChild(p2);

        // infine un bottone per vedere i dettagli dell'offerta
        let button = document.createElement('button');
        button.onclick = mostraViewOffer;
        this.container.appendChild(button);
        button.innerHTML = 'View';
        button.dataset.id = this.id;

        offerDisplay.appendChild(this.container);
        offerDisplay.scrollTop = offerDisplay.scrollHeight;
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
        if (this.proprieta1){
            for (let p of this.proprieta1){
                if (!player1.proprieta.includes(p)){
                    // se anche solo una proprieta non e' contenuta l'offerta cade
                    if (this.id2 == 0)
                        alert("L'offerta non puo' essere accettata per proprieta' mancanti...");
                    this.status = 0;
                    return;
                }
                if (p.case > 0 || p.albergo > 0){
                    if (this.id2 == 0)
                        alert("Non si possono vendere proprieta con case...");
                    this.status = 0;
                    return;
                }
            }
        }

        if (this.proprieta2){
            // controllo che tutte le proprieta del secondo giocatore siano presenti
            for (let p of this.proprieta2){
                if (!player2.proprieta.includes(p)){
                    // se anche solo una proprieta non e' contenuta l'offerta cade
                    if (this.id == 0)
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

        if (checkboxes1){
            for (let p of checkboxes1){
                if (getCasella(p.value)){
                    proprieta1.push(getCasella(p.value));
                }
            }
        }

        proprieta2 = [];
        let checkboxes2 = document.querySelectorAll('input[type="checkbox"][name^="proprieta-2-"]:checked');

        if (checkboxes2){
            for (let p of checkboxes2){
                if (getCasella(p.value)){
                    proprieta2.push(getCasella(p.value));
                }
            }
        }

        soldi1 = document.querySelector('#slider-1');
        soldi1 = soldi1.value;

        soldi2 = document.querySelector('#slider-2');
        soldi2 = soldi2.value;
    }
    // altrimenti si tratta di una normale chiamata a funzione, in questo caso
    // un bot ha mandato un'offerta

    let offerta = new Offerta(id1,id2,proprieta1,proprieta2,soldi1,soldi2);
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
    }
}